# ZK Conspiracy

A ZK membership set of Ethereum addresses. New addresses can join by being privately attested to by at least two existing conspirators.

## Sketch

There are two primary actions that can be taken:

- JOIN
- TAP

When a user joins, they produce a ZK proof proving that (i) they are part of a
merkle tree and (ii) that they have at least two attestions.

When a user has joined, they are able to tap an Ethereum address. This increases
that address's tap score.

## TODOs

- [x] Skeleton project with circuits and contract
- [ ] First cut at Circom constraints with tests
- [ ] Attestations logic
- [ ] PoC frontend
- [ ] Solve bootstrap problem (first 2-3 users)
