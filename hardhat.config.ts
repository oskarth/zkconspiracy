import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

import "hardhat-circom";

const config: HardhatUserConfig = {
    solidity: "0.6.11",
};

export default config;


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.11",
  circom: {
    inputBasePath: "./circuits",
    ptau: "pot15_final.ptau",
    circuits: [
      {
        name: "merklechecker",
        protocol: "groth16"
      }
    ],
  },
};
