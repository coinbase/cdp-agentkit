# CDP Agentkit

[![PyPI - Downloads](https://img.shields.io/pypi/dm/cdp-agentkit-core?style=flat-square)](https://pypistats.org/packages/cdp-agentkit-core)
[![GitHub star chart](https://img.shields.io/github/stars/coinbase/cdp-agentkit?style=flat-square)](https://star-history.com/#coinbase/cdp-agentkit)
[![Open Issues](https://img.shields.io/github/issues-raw/coinbase/cdp-agentkit?style=flat-square)](https://github.com/coinbase/cdp-agentkit/issues)

The **Coinbase Developer Platform (CDP) Agentkit for Python** simplifies bringing your AI Agents onchain. Every AI Agent deserves a crypto wallet!

## Table of Contents
- [Key Features](#key-features)
- [Examples](#examples)
- [Repository Structure](#repository-structure)
- [Setup Instructions](#setup-instructions)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Documentation](#documentation)

## Key Features
- **Framework-agnostic**: Common AI Agent primitives that can be used with any AI framework.
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

  Or [add your own](./CONTRIBUTING.md#adding-an-action-to-agentkit-core)!

## Examples
Check out [cdp-langchain/examples](./cdp-langchain/examples) for inspiration and help getting started!
- [Chatbot](./cdp-langchain/examples/chatbot/README.md): Simple example of a Chatbot that can perform complex onchain interactions, using OpenAI.

## Repository Structure
CDP Agentkit is organized as a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains multiple packages.

### cdp-agentkit-core
Core primitives and framework-agnostic tools that are meant to be composable and used via CDP Agentkit framework extensions (ie, `cdp-langchain`).
See [CDP Agentkit Core](./cdp-agentkit-core/README.md) to get started!

### cdp-langchain
Langchain Toolkit extension of CDP Agentkit. Enables agentic workflows to interact with onchain actions.
See [CDP Langchain](./cdp-langchain/README.md) to get started!

### twitter-langchain
Langchain Toolkit extension for Twitter. Enables agentic workflows to interact with Twitter, such as to post a tweet.
See [Twitter Langchain](./twitter-langchain/README.md) to get started!

## Setup Instructions

### Prerequisites
- Python 3.10 or higher
- Rust/Cargo installed ([Rust Installation Instructions](https://doc.rust-lang.org/cargo/getting-started/installation.html))
- Poetry for package management and tooling
  - [Poetry Installation Instructions](https://python-poetry.org/docs/#installation)
- [CDP API Key](https://portal.cdp.coinbase.com/access/api)

### Installation

Clone the repo by running:

```bash
git clone git@github.com:coinbase/cdp-agentkit.git
```

Navigate to the project directory:

```bash
cd cdp-agentkit
```

Install the necessary dependencies:

```bash
pip install -r requirements.txt
pip install ruff
```

### Environment Setup

Set the following environment variables:

```bash
export CDP_API_KEY_NAME=<your-api-key-name>
export CDP_API_KEY_PRIVATE_KEY=$'<your-private-key>'
export OPENAI_API_KEY=<your-openai-api-key>
export NETWORK_ID=base-sepolia  # Optional: Defaults to base-sepolia
```

### Running the Project

To run the project locally, follow these steps:

1. Compile the smart contracts:

```bash
truffle compile
```

2. Migrate the smart contracts to the development network:

```bash
truffle migrate --network development
```

3. Run the tests:

```bash
truffle test
```

## Troubleshooting

Common issues during setup and their solutions:

* **Missing dependencies**: Ensure you have Node.js (v14.x or higher), npm (v6.x or higher), Truffle (v5.x or higher), and Ganache CLI (v6.x or higher) installed. Follow the instructions in the `README.md` to install these dependencies.
* **Incorrect network configuration**: Verify that the network settings in `truffle-config.js` are correctly configured for the desired network. Ensure that the `MNEMONIC` and `ALCHEMY_API_KEY` environment variables are set correctly.
* **Ganache CLI not running**: Make sure Ganache CLI is running before attempting to compile or migrate the smart contracts. Use the command `ganache-cli` to start it.
* **Compilation errors**: Ensure that the Solidity compiler version specified in `truffle-config.js` matches the version used in your smart contracts. Update the version if necessary.
* **Migration issues**: If migrations fail, check the network configuration and ensure that the development network is running. Use the command `truffle migrate --network development` to migrate the contracts.
* **Testing issues**: Ensure that the test environment is correctly set up and that all dependencies are installed. Use the command `truffle test` to run the tests. For forked mainnet state tests, use the command `forge test --fork-url https://eth-sepolia.g.alchemy.com/v2/YOURKEY`.
* **Environment variables**: Ensure that all required environment variables are set correctly. Refer to the `README.md` for the necessary environment variables and their values.
* **API key issues**: Verify that the API keys for services like Alchemy and OpenAI are correctly set in the environment variables. Double-check the values and ensure they are valid.

## Contributing
CDP Agentkit welcomes community contributions.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Documentation
- [CDP Agentkit Documentation](https://docs.cdp.coinbase.com/agentkit/docs/welcome)
- [API Reference: CDP Agentkit Core](https://coinbase.github.io/cdp-agentkit/cdp-agentkit-core/index.html)
- [API Reference: CDP Agentkit LangChain Extension](https://coinbase.github.io/cdp-agentkit/cdp-langchain/index.html)
