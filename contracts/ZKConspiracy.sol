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
        uint256[2] calldata input
        ) external view returns (bool);
}

contract ZKConspiracy is MerkleTreeWithHistory, ReentrancyGuard {
    IVerifier public immutable verifier;

    mapping(bytes32 => bool) public nullifierHashes;

    // Mapping from address to number of attestations
    mapping(bytes32 => uint32) public attestations;

    event Registration(
        bytes32 indexed commitment,
        uint32 leafIndex,
        uint256 timestamp
    );

    event Attestation(
        bytes32 attestee,
        bytes32 nullifierHash,
        uint32 attestations
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
    /**
    @dev Allows registered users to attests to an attestee. `proof` is a zkSNARK
    proof data, and input is an array of circuit public inputs. `input` array
    consists of:
      - merkle root of all registrations in the contract
      (- hash of unique deposit nullifier to prevent double attestations)
      - the attestee target
    */
    function attest(
        Proof calldata _proof,
        bytes32 _root,
        bytes32 _nullifierHash,
        bytes32 _attestee
    ) external nonReentrant {
        // TODO Allow multiple attestations, should be unique per attestee
        require(!nullifierHashes[_nullifierHash], "User has already attested");
        require(
            verifier.verifyProof(
                _proof.a,
                _proof.b,
                _proof.c,
                [
                    uint256(_root),
                    uint256(_nullifierHash)
                 ]
            ),
            "Invalid membership proof"
        );

        nullifierHashes[_nullifierHash] = true;

        attestations[_attestee] += 1;
        emit Attestation(_attestee, _nullifierHash, attestations[_attestee]);
    }
}
