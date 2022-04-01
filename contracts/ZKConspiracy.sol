pragma solidity ^0.7.3;

pragma experimental ABIEncoderV2;

import "./MerkleTreeWithHistory.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

struct Proof {
    uint256[2] a;
    uint256[2][2] b;
    uint256[2] c;
}

interface IVerifier {
    function verifyProof(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[5] calldata input
        ) external view returns (bool);
}

contract ZKConspiracy is MerkleTreeWithHistory, ReentrancyGuard {
    IVerifier public immutable verifier;

    mapping(bytes32 => bool) public nullifierHashes;

    event Registration(
        bytes32 indexed commitment,
        uint32 leafIndex,
        uint256 timestamp
    );

    // TODO: Require attestations to register

    /**
    @param _verifier the address of SNARK verifier for this contract
    @param _merkleTreeHeight the height of deposits' Merkle Tree
    */
    constructor(
        IVerifier _verifier,
        uint32 _merkleTreeHeight,
        address _hasher
    ) MerkleTreeWithHistory(_merkleTreeHeight, _hasher) {
        verifier = _verifier;
    }

    // XXX Commitment wrong wording
    // TODO Attestation check

    /**
    @dev Register.
    @param _commitment the note commitment, which is PedersenHash(nullifier + secret)
    */
    function register(bytes32 _commitment) external payable nonReentrant {
        uint32 insertedIndex = _insert(_commitment);

        emit Registration(_commitment, insertedIndex, block.timestamp);
    }

    // TODO Attest/tap function

}
