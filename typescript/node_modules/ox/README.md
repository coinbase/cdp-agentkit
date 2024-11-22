<br/>

<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/wevm/ox/blob/main/.github/ox-dark.svg">
      <img alt="ox logo" src="https://github.com/wevm/ox/blob/main/.github/ox-light.svg" width="auto" height="200">
    </picture>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ox">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/ox?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/v/ox?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
  </a>
  <a href="https://github.com/wevm/ox/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/ox?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/l/ox?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
  </a>
  <a href="https://app.codecov.io/gh/wevm/ox">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/codecov/c/github/wevm/ox?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/codecov/c/github/wevm/ox?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Code coverage">
    </picture>
  </a>
</p>

## Overview

Ox (⦻) is the foundation of robust Ethereum software written in TypeScript. It is an Ethereum Standard Library that provides a set of lightweight, performant, and type-safe TypeScript modules for Ethereum.

It offers core utilities & types for primitives such as: ABIs, Addresses, Blocks, Bytes, ECDSA, Hex, JSON-RPC, RLP, Signing & Signatures, Transaction Envelopes, and more.

As an unopinionated Standard Library, it is designed to be used by higher-level consumers (such as [Viem](https://viem.sh), [Tevm](https://tevm.sh), or their alternatives) to provide their own opinionated interfaces, and/or when reaching for low-level primitives may be needed without buying into a Client Abstraction stack (Viem, Ethers, Web3.js, etc).

## Documentation

[Head to the documentation](https://oxlib.sh) to read and learn more about Ox.

## Example Usage

The example below demonstrates how to construct, sign, and broadcast a transaction envelope using Ox:

```ts
import { Provider, Secp256k1, TransactionEnvelopeEip1559, Value } from 'ox'
 
// 1. Construct a transaction envelope.
const envelope = TransactionEnvelopeEip1559.from({
  chainId: 1,
  gas: 21000n,
  nonce: 0n,
  maxFeePerGas: Value.fromGwei('10'),
  maxPriorityFeePerGas: Value.fromGwei('1'),
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: Value.fromEther('1'),
})
 
// 2. Get the signing payload for the envelope.
const payload = TransactionEnvelopeEip1559.getSignPayload(envelope) 
 
// 3. Sign the payload with your private key using secp256k1.
const signature = Secp256k1.sign({ payload, privateKey: '0x...' })

// 4. Serialize the envelope with the signature.
const serialized = TransactionEnvelopeEip1559.serialize(envelope, { signature })

// 5. Broadcast the envelope to the network.
const provider = Provider.from(window.ethereum)
const hash = await provider.request({
  method: 'eth_sendRawTransaction',
  params: [serialized],
})
```

> [!NOTE]  
> Ox's APIs are purposely stateless, unopinionated, and verbose. The example above can definitely be achieved in a few lines of code in a more concise manner, however, the goal is for higher-level abstractions (Viem, etc) built on top of Ox to handle this for you.

## Community

Check out the following places for more Ox-related content:

- Follow [@wevm_dev](https://x.com/wevm_dev), [@jxom](https://x.com/_jxom), and [@awkweb](https://x.com/awkweb) on Twitter for project updates
- Join the [discussions on GitHub](https://github.com/wevm/ox/discussions)

## Support

- [GitHub Sponsors](https://github.com/sponsors/wevm?metadata_campaign=docs_support)
- [Gitcoin Grant](https://wagmi.sh/gitcoin)
- [wevm.eth](https://etherscan.io/enslookup-search?search=wevm.eth)
