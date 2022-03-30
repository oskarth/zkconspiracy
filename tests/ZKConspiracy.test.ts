import { assert, expect } from "chai";
import { Verifier__factory } from "../types/";

import { ethers } from "hardhat";
import { BigNumber, BigNumberish, Contract, ContractFactory, Signer } from "ethers";

// @ts-ignore
import { poseidonContract, buildPoseidon } from "circomlibjs";

function getPoseidonFactory(nInputs: number) {
    const bytecode = poseidonContract.createCode(nInputs);
    const abiJson = poseidonContract.generateABI(nInputs);
    const abi = new ethers.utils.Interface(abiJson);
    return new ContractFactory(abi, bytecode);
}

describe("ZKConspiracy", function () {
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
    });

    it("should do something right", async function () {
        // Do something with the accounts
    });

    it("generates same poseidon hash", async function () {
        const res = await poseidonContract["poseidon(uint256[2])"]([1, 2]);
        const res2 = poseidon([1, 2]);

        assert.equal(res.toString(), poseidon.F.toString(res2));
    }).timeout(500000);

});
