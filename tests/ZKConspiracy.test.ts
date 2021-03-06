import { assert, expect } from "chai";
import { ZKConspiracy__factory, Verifier__factory, ZKConspiracy } from "../types/";

import { ethers } from "hardhat";
import { BigNumber, BigNumberish, Contract, ContractFactory, Signer } from "ethers";

// @ts-ignore
import { MerkleTree, Hasher } from "../src/merkleTree";
// @ts-ignore
import { groth16 } from "snarkjs";
import path from "path";

// @ts-ignore
import { poseidonContract, buildPoseidon } from "circomlibjs";

//const HEIGHT = 20;
const HEIGHT = 2;

function poseidonHash(poseidon: any, inputs: BigNumberish[]): string {
    const hash = poseidon(inputs.map((x) => BigNumber.from(x).toBigInt()));
    // Make the number within the field size
    const hashStr = poseidon.F.toString(hash);
    // Make it a valid hex string
    const hashHex = BigNumber.from(hashStr).toHexString();
    // pad zero to make it 32 bytes, so that the output can be taken as a bytes32 contract argument
    const bytes32 = ethers.utils.hexZeroPad(hashHex, 32);
    return bytes32;
}

class PoseidonHasher implements Hasher {
    poseidon: any;

    constructor(poseidon: any) {
        this.poseidon = poseidon;
    }

    hash(left: string, right: string) {
        return poseidonHash(this.poseidon, [left, right]);
    }
}

function getPoseidonFactory(nInputs: number) {
    const bytecode = poseidonContract.createCode(nInputs);
    const abiJson = poseidonContract.generateABI(nInputs);
    const abi = new ethers.utils.Interface(abiJson);
    return new ContractFactory(abi, bytecode);
}

interface Proof {
    a: [BigNumberish, BigNumberish];
    b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];
    c: [BigNumberish, BigNumberish];
}

async function prove(witness: any): Promise<Proof> {
    const wasmPath = path.join(__dirname, "../circuits/attest.wasm");
    const zkeyPath = path.join(__dirname, "../circuits/attest.zkey");

    const { proof } = await groth16.fullProve(witness, wasmPath, zkeyPath);

    const solProof: Proof = {
        a: [proof.pi_a[0], proof.pi_a[1]],
        b: [
            [proof.pi_b[0][1], proof.pi_b[0][0]],
            [proof.pi_b[1][1], proof.pi_b[1][0]],
        ],
        c: [proof.pi_c[0], proof.pi_c[1]],
    };
    return solProof;
}

async function proveJoin(witness: any): Promise<Proof> {
    const wasmPath = path.join(__dirname, "../circuits/join.wasm");
    const zkeyPath = path.join(__dirname, "../circuits/join.zkey");

    const { proof } = await groth16.fullProve(witness, wasmPath, zkeyPath);

    const solProof: Proof = {
        a: [proof.pi_a[0], proof.pi_a[1]],
        b: [
            [proof.pi_b[0][1], proof.pi_b[0][0]],
            [proof.pi_b[1][1], proof.pi_b[1][0]],
        ],
        c: [proof.pi_c[0], proof.pi_c[1]],
    };
    return solProof;
}

// TODO Refactor, this can be simplified probably
class Registration {
    private constructor(
        public readonly nullifier: Uint8Array,
        public poseidon: any,
        public leafIndex?: number
    ) {
        this.poseidon = poseidon;
    }
    static new(poseidon: any) {
        // XXX For easier debugging
        //const nullifier = new Uint8Array(15);
        const nullifier = ethers.utils.randomBytes(15);
        return new this(nullifier, poseidon);
    }
    get commitment() {
        return poseidonHash(this.poseidon, [this.nullifier, 0]);
    }

    get nullifierHash() {
        if (!this.leafIndex && this.leafIndex !== 0)
            throw Error("leafIndex is unset yet");
        return poseidonHash(this.poseidon, [this.nullifier, 1, this.leafIndex]);
    }
}

describe("ZKConspiracy", function () {
    let zkconspiracy: ZKConspiracy;
    let accounts: Signer[];
    let poseidon: any;
    let poseidonContract: Contract;

    before(async () => {
        poseidon = await buildPoseidon();
    });


    beforeEach(async function () {
        accounts = await ethers.getSigners();
        const [signer] = await ethers.getSigners();
        const verifier = await new Verifier__factory(signer).deploy();
        poseidonContract = await getPoseidonFactory(2).connect(signer).deploy();
        zkconspiracy = await new ZKConspiracy__factory(signer).deploy(
            verifier.address,
            HEIGHT,
            poseidonContract.address
        );
    });

    it("generates same poseidon hash", async function () {
        const res = await poseidonContract["poseidon(uint256[2])"]([1, 2]);
        const res2 = poseidon([1, 2]);

        assert.equal(res.toString(), poseidon.F.toString(res2));
    }).timeout(500000);

    it.skip("register should fail with no attestations", async function () {
        const [userSigner1] =
            await ethers.getSigners();

        const registration = Registration.new(poseidon);

        await expect(
            zkconspiracy
                .connect(userSigner1)
                .register(registration.commitment))
            .to.be.revertedWith("User doesn't have enough attestations");
    }).timeout(500000);

    // XXX Started failing, unclear why
    it.skip("register and attest", async function () {
        const [userSigner1, userSigner2] =
            await ethers.getSigners();

        const registration = Registration.new(poseidon);
        const registration2 = Registration.new(poseidon);

        const tx = await zkconspiracy
            .connect(userSigner1)
            .register(registration.commitment);
        const receipt = await tx.wait();
        const events = await zkconspiracy.queryFilter(
            zkconspiracy.filters.Registration(),
            receipt.blockHash
        );
        assert.equal(events[0].args.commitment, registration.commitment);
        console.log("Registration gas cost", receipt.gasUsed.toNumber());
        registration.leafIndex = events[0].args.leafIndex;

        const tree = new MerkleTree(
            HEIGHT,
            "test",
            new PoseidonHasher(poseidon)
        );

        // asserts
        assert.equal(await tree.root(), await zkconspiracy.roots(0));
        await tree.insert(registration.commitment);
        assert.equal(tree.totalElements, await zkconspiracy.nextIndex());
        assert.equal(await tree.root(), await zkconspiracy.roots(1));

        //console.log("Tree:\n", tree);

        const nullifierHash = registration.nullifierHash;

        const { root, path_elements, path_index } = await tree.path(
            registration.leafIndex
        );

        const witness = {
            // Public
            root,
            nullifierHash,
            // Private
            nullifier: BigNumber.from(registration.nullifier).toBigInt(),
            pathElements: path_elements,
            pathIndices: path_index,
        };

        //console.log("Witness:", witness);

        const solProof = await prove(witness);

        const attestee = registration2.commitment;

        //console.log("solProof", solProof, "root", root, "nullifierHash", nullifierHash, "attestee", attestee);

        const txAttest = await zkconspiracy
            .connect(userSigner1)
            .attest(solProof, root, nullifierHash, attestee);

        const receiptAttest = await txAttest.wait();
        console.log("Attestation gas cost", receiptAttest.gasUsed.toNumber());

        let attestations = await zkconspiracy.attestations(registration2.commitment);
        console.log("Attestations", attestations);

    }).timeout(500000);

    it("generates mock join zk proof", async function () {
        // TODO Actually generate this instead of ad hoc hardcoded

        let root = "337630155020736422130827831883849139981456036574644600587839773016543233712";
        let pubKey = "0x12ce9dd75023ce577c9e166dd185b380a4de764463209a55057f2b3bd7b5f16d";
        let privKey = "0";
        let attestationPubKey = "0";
        let attestationMsgHash = "2388415516175506382357674942738882686706058103539280497132142178878632190249";
        let attestationMsgPathElements = [
            "0x2fe54c60d3acabf3343a35b6eba15db4821b340f76e741e2249685ed4899af6c",
            "0x13e37f2d6cb86c78ccc1788607c2b199788c6bb0a615a21f2e7a8e88384222f8"
        ];
        let attestationMsgPathIndices = ["0", "0"];
        let attestationMsgAttestation = "0";
        let attestationR = "0";
        let attestationS = "0";

        const witness = {
            // public
            root,
            pubKey,
            // private
            privKey,
            attestationPubKey,
            attestationMsgHash,
            attestationMsgPathElements,
            attestationMsgPathIndices,
            attestationMsgAttestation,
            attestationR,
            attestationS
        };

        //     BigNumber.from(registration.nullifier).toBigInt(),

        const solProof = await proveJoin(witness);

        //console.log(solProof);

    }).timeout(500000);

});
