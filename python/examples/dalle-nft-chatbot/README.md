# DALLE - IPFS - NFT - Multi-Agent - Source Code

A Replit template for running an AI agent with onchain capabilities and X posting using the [Coinbase Developer Platform (CDP) Agentkit](https://github.com/coinbase/cdp-agentkit/).

Supports CDP Agentkit actions + our own actions, allowing it to perform blockchain operations like:
- Deploying tokens (ERC-20 & NFTs)
- Managing wallets
- Executing transactions
- Interacting with smart contracts
- Create prompted DALLE images, and have the images automatically hosted onto ipfs along with nft metadata containing the image ipfs uri

## Prerequisites

1. **API Keys**
   - OpenAI API key from the [OpenAI Portal](https://platform.openai.com/api-keys)
   - CDP API credentials from [CDP Portal](https://portal.cdp.coinbase.com/access/api)
   - Pinata API key from the [Pinata Portal](https://docs.pinata.cloud/account-management/api-keys)
 
2. Fill ENV
Fill this
```
NETWORK_ID="base-sepolia"
CDP_API_KEY_NAME=""
CDP_API_KEY_PRIVATE_KEY=""
OPENAI_API_KEY=""
PINATA_JWT=""
```

## Securing your Wallets

Every agent comes with an associated wallet. Wallet data is read from wallet_data.txt, and if that file does not exist, we will create a new wallet and persist it in a new file. Please note that this contains sensitive data and should not be used in production environments. Refer to the [CDP docs](https://docs.cdp.coinbase.com/mpc-wallet/docs/wallets#securing-a-wallet) for information on how to secure your wallets.

## Features
- Interactive chat mode for guided interactions
- Dalle & IPFS integration for creating an AI image from prompted text, before creating and minting an nft to the user of the image

## Source
This template is based on the CDP Agentkit examples. For more information, visit:
https://github.com/coinbase/cdp-agentkit
