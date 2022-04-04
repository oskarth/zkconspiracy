#!/usr/bin/env bash

# TODO: Make this most robust with build dir etc

cd contracts/ && sed 's/0\.6\.11/0\.7\.3/g' MerkleTreeVerifier.sol > tmp.txt && mv tmp.txt MerkleTreeVerifier.sol
