import { assert, expect } from "chai";
import { ZKConspiracy__factory, Verifier__factory, ZKConspiracy } from "../types/";

import { ethers } from "hardhat";
import { BigNumber, BigNumberish, Contract, ContractFactory, Signer } from "ethers";

// @ts-ignore
import { MerkleTree, Hasher } from "../src/merkleTree";
// @ts-ignore
import { groth16 } from "snarkjs";

// @ts-ignore
import { poseidonContract, buildPoseidon } from "circomlibjs";

const HEIGHT = 20;

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

    it("should do something right", async function () {
        // Do something with the accounts
    });

    it("generates same poseidon hash", async function () {
        const res = await poseidonContract["poseidon(uint256[2])"]([1, 2]);
        const res2 = poseidon([1, 2]);

        assert.equal(res.toString(), poseidon.F.toString(res2));
    }).timeout(500000);

    // TODO WIP - register and prove membership?
    it("register and attest", async function () {
        const [userOldSigner, relayerSigner, userNewSigner] =
            await ethers.getSigners();
        const registration = Registration.new(poseidon);
        const registration2 = Registration.new(poseidon);

        const tx = await zkconspiracy
            .connect(userOldSigner)
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
        assert.equal(await tree.root(), await zkconspiracy.roots(0));
        await tree.insert(registration.commitment);
        assert.equal(tree.totalElements, await zkconspiracy.nextIndex());
        assert.equal(await tree.root(), await zkconspiracy.roots(1));

        const nullifierHash = registration.nullifierHash;
        const recipient = await userNewSigner.getAddress();
        const relayer = await relayerSigner.getAddress();
        const fee = 0;

        const { root, path_elements, path_index } = await tree.path(
            registration.leafIndex
        );

        console.log("root", root, "path_elements", path_elements, "path_index", path_index);

        // TODO Add test here

        // TODO Adapt ZK proof here

        // const witness = {
        //     // Public
        //     root,
        //     nullifierHash,
        //     recipient,
        //     relayer,
        //     fee,
        //     // Private
        //     nullifier: BigNumber.from(deposit.nullifier).toBigInt(),
        //     pathElements: path_elements,
        //     pathIndices: path_index,
        // };

        // const solProof = await prove(witness);

        // const txWithdraw = await tornado
        //     .connect(relayerSigner)
        //     .withdraw(solProof, root, nullifierHash, recipient, relayer, fee);
        // const receiptWithdraw = await txWithdraw.wait();
        // console.log("Withdraw gas cost", receiptWithdraw.gasUsed.toNumber());

        // XXX Connect with original signer?
        // TODO Add proof, root etc
        //
        const txAttest = await zkconspiracy
            .connect(userOldSigner)
            .attest(registration2.commitment);
        const receiptAttest = await txAttest.wait();
        console.log("receiptAttest", receiptAttest);
        console.log("Attestation gas cost", receiptAttest.gasUsed.toNumber());

        // TODO How check contract state...?
        let attestations = await zkconspiracy.attestations(registration2.commitment);
        console.log("Attestations", attestations);

    }).timeout(500000);



});
