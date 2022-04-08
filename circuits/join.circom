pragma circom 2.0.3;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/bitify.circom";
include "merkleTree.circom";

// This mocks ECDSAVerifyNoPubkeyCheck() in circom-ecdsa,
// it does no actual verification whatsoever
//
// TODO: Replace with actual circuit
// This requires setting up AWS instance and environment for perf
//
// r, s, msghash, and pubkey have coordinates
// encoded with k registers of n bits each
// signature is (r, s)
// Does not check that pubkey is valid
//
// TODO: Make interface map 1:1 to actual implementation, not just conceptually
// all r,s, msghash, pubkey should be arrays of size k=4,
// where k is the number of registers of n (e.g. 64) bits each
template MockECSDAVerify() {
    signal input r;
    signal input s;
    signal input msgHash;
    signal input pubKey;

    signal output result;

    result <== 1;
}

// When joining, prove have enough assertions from pubkeys that are in tree
// Prove in tree with pubKey, treePosition
// TODO We also probably want to hide pubkey, probably by hashing it and storing that merkle tree instead
template Join(levels) {
    signal input root;

    // signal input nullifierHash;
    // signal input nullifier;
    signal input pubKey;
    signal input privKey;

    // XXX - do we want this for insertion to local tree?
    // We need this information for doing attestations later
    // Not sure we want to make this public in event
    // signal input pathElements[levels];
    // signal input pathIndices[levels];

    // Attestation is an ECDSA signature by a public key in merkle tree with a message hash
    // The message includes merkle tree position and attestation to public key
    signal input attestationPubKey;
    signal input attestationMsgHash;
    signal input attestationMsgPathElements[levels];
    signal input attestationMsgPathIndices[levels];
    signal input attestationMsgAttestation;
    signal input attestationR;
    signal input attestationS;

    // TODO Multiple attestations

    // TODO A bunch of things to assert...

    // 1) Attestation Message should hash to Message Hash
    // TODO This should probably have some app specific info in it
    // TODO Look at idiomatic way of using hash of array, should be *[levels]
    component attestationMsgHasher = Poseidon(3);
    attestationMsgHasher.inputs[0] <== attestationMsgPathElements[0];
    attestationMsgHasher.inputs[1] <== attestationMsgPathIndices[0];
    attestationMsgHasher.inputs[2] <== attestationMsgAttestation;

    log(attestationMsgHasher.out);
    //attestationMsgHasher.out === attestationMsgHash;

    // 2) Attestation signature should be valid (mocked)
    component verifier = MockECSDAVerify();
    verifier.r <== 1;
    verifier.s <== 1;
    verifier.msgHash <== attestationMsgHash;
    verifier.pubKey <== attestationPubKey;
    verifier.result === 1;

    // 3) Attestation msg attestation is the same as public key
    attestationPubKey === attestationMsgAttestation;

    // 4) Attestation Pub Key should be in merkle tree with root

    // ...probably more

    // component leafIndexNum = Bits2Num(levels);
    // for (var i = 0; i < levels; i++) {
    //     leafIndexNum.in[i] <== pathIndices[i];
    // }

    // component nullifierHasher = Poseidon(3);
    // nullifierHasher.inputs[0] <== nullifier;
    // nullifierHasher.inputs[1] <== 1;
    // nullifierHasher.inputs[2] <== leafIndexNum.out;

    // component commitmentHasher = Poseidon(2);
    // commitmentHasher.inputs[0] <== nullifier;
    // commitmentHasher.inputs[1] <== 0;

    component tree = MerkleTreeChecker(levels);
    tree.leaf <== attestationPubKey;
    tree.root <== root;
    for (var i = 0; i < levels; i++) {
      tree.pathElements[i] <== attestationMsgPathElements[i];
      tree.pathIndices[i] <== attestationMsgPathIndices[i];
    }
}

// TODO Increase levels to 20
component main { public [ root, pubKey ] } = Join(2);
