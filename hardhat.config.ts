import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

import "hardhat-circom";

import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
    solidity: "0.7.3",
};

export default config;


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  circom: {
    inputBasePath: "./circuits",
    ptau: "pot15_final.ptau",
    circuits: [
      {
        name: "attest",
        protocol: "groth16"
      }
    ],
  },
};
