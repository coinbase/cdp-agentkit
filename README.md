# CDP Agentkit

[![PyPI - Downloads](https://img.shields.io/pypi/dm/cdp-agentkit-core?style=flat-square)](https://pypistats.org/packages/cdp-agentkit-core)
[![GitHub star chart](https://img.shields.io/github/stars/coinbase/cdp-agentkit?style=flat-square)](https://star-history.com/#coinbase/cdp-agentkit)
[![Open Issues](https://img.shields.io/github/issues-raw/coinbase/cdp-agentkit?style=flat-square)](https://github.com/coinbase/cdp-agentkit/issues)

The Coinbase Developer Platform (CDP) Agentkit simplifies bringing your AI Agents onchain. Every AI Agent deserves a crypto wallet!

## Key Features
- Framework-agnostic: Common AI Agent primitives that can be used with any AI framework.
- Langchain Toolkit: Integration with Langchain for easy agentic workflows. More frameworks coming soon!
- Support for various on-chain actions:
  - Faucet for testnet funds
  - Getting wallet details and balances
  - Transferring and trading tokens
  - Registering Basenames
  - Deploying ERC20 tokens
  - Deploying ERC721 tokens and minting NFTs
  - Deploying tokens on Zora's Wow Launcher (Bonding Curve)
  - Buying and selling Zora Wow ERC20 coins

## Examples
Check out `cdp-langchain/examples` for inspiration and help getting started!
- [Chatbot](./cdp-langchain/examples/chatbot/README.md): Simple example of a Chatbot that can perform complex onchain interactions, using OpenAI.

## Repository Structure
CDP Agentkit is organized as a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains multiple packages.

### cdp-agentkit-core
Core primitives and framework agnostic tools that are meant to be composable and used via CDP Agentkit framework extensions.
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
- [CDP Agentkit Core API Reference](https://coinbase.github.io/cdp-agentkit/cdp-agentkit-core/index.html)
- [CDP Agentkit Langchain Extension API Reference](https://coinbase.github.io/cdp-agentkit/cdp-langchain/index.html)
