# CDP Agentkit

[![PyPI - Downloads](https://img.shields.io/pypi/dm/cdp-agentkit-core?style=flat-square)](https://pypistats.org/packages/cdp-agentkit-core)
[![npm downloads](https://img.shields.io/npm/dm/@coinbase/cdp-agentkit-core?style=flat-square)](https://www.npmjs.com/package/@coinbase/cdp-agentkit-core)
[![GitHub star chart](https://img.shields.io/github/stars/coinbase/cdp-agentkit?style=flat-square)](https://star-history.com/#coinbase/cdp-agentkit)
[![Open Issues](https://img.shields.io/github/issues-raw/coinbase/cdp-agentkit?style=flat-square)](https://github.com/coinbase/cdp-agentkit/issues)

The **Coinbase Developer Platform (CDP) AgentKit** simplifies bringing your AI Agents onchain. Every AI Agent deserves a crypto wallet!


## Key Features

- **Framework-agnostic**: Common AI Agent primitives that can be used with any AI framework.
- **Python and Node.js Support**
- **LangChain integration**: Seamless integration with [LangChain](https://python.langchain.com/docs/introduction/) for easy agentic workflows. More frameworks coming soon!
- **Twitter integration**: Seamless integration of Langchain with [Twitter](https://developer.twitter.com/en/docs/twitter-api) for easy agentic workflows.
- **Support for various on-chain actions**:

  - Faucet for testnet funds
  - Getting wallet details and balances
  - Transferring and trading tokens
  - Registering [Basenames](https://www.base.org/names)
  - Deploying [ERC-20](https://www.coinbase.com/learn/crypto-glossary/what-is-erc-20) tokens
  - Deploying [ERC-721](https://www.coinbase.com/learn/crypto-glossary/what-is-erc-721) tokens and minting NFTs
  - Buying and selling [Zora Wow](https://wow.xyz/) ERC-20 coins
  - Deploying tokens on [Zora's Wow Launcher](https://wow.xyz/mechanics) (Bonding Curve)
  - Wrapping ETH to WETH on Base

  Or [add your own](./CONTRIBUTING.md#adding-an-action-to-agentkit-core)!

## Examples

Check out [cdp-langchain/examples](./cdp-langchain/examples) for inspiration and help getting started!
- [Chatbot Python](./cdp-langchain/examples/chatbot-python/README.md): Simple example of a Python Chatbot that can perform complex onchain interactions, using OpenAI.
- [Chatbot Typescript](./cdp-langchain/examples/chatbot-typescript/README.md): Simple example of a Node.js Chatbot that can perform complex onchain interactions, using OpenAI.

## Repository Structure

CDP Agentkit is organized as a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains multiple packages.

./
├── cdp-agentkit-core/
│   ├── python/
│   └── typescript/
├── cdp-langchain/
│   ├── python/
│   ├── typescript/
│   └── examples/
└── twitter-langchain/
    ├── python/
    ├── typescript/
    └── examples/

### cdp-agentkit-core

Core primitives and framework-agnostic tools that are meant to be composable and used via CDP Agentkit framework extensions (ie, `cdp-langchain`).
See [CDP Agentkit Core](./cdp-agentkit-core/README.md) to get started!

### cdp-langchain

Langchain Toolkit extension of CDP Agentkit. Enables agentic workflows to interact with onchain actions.
See [CDP Langchain](./cdp-langchain/README.md) to get started!

### twitter-langchain

Langchain Toolkit extension for Twitter. Enables agentic workflows to interact with Twitter, such as to post a tweet.
See [Twitter Langchain](./twitter-langchain/README.md) to get started!

## Contributing

CDP Agentkit welcomes community contributions.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Documentation

- [CDP Agentkit Documentation](https://docs.cdp.coinbase.com/agentkit/docs/welcome)
- [API Reference: CDP Agentkit Core Python](https://coinbase.github.io/cdp-agentkit/cdp-agentkit-core/python/index.html)
- [API Reference: CDP Agentkit LangChain Extension Python](https://coinbase.github.io/cdp-agentkit/cdp-langchain/python/index.html)
- [API Reference: CDP Agentkit Core Node.js](https://coinbase.github.io/cdp-agentkit/cdp-agentkit-core/typescript/index.html)
- [API Reference: CDP Agentkit LangChain Extension Node.js](https://coinbase.github.io/cdp-agentkit/cdp-langchain/typescript/index.html)

## Security and bug reports

The CDP AgentKit team takes security seriously.
See [SECURITY.md](../SECURITY.md) for more information.

## License

Apache-2.0
