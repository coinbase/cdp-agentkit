# CDP Agentkit Extension - LangChain Toolkit

CDP integration with LangChain to enable agentic workflows using the core primitives defined in `@cdp/agentkit-core`.

This toolkit contains tools that enable an LLM agent to interact with the [Coinbase Developer Platform](https://docs.cdp.coinbase.com/). The toolkit provides a wrapper around the CDP SDK, allowing agents to perform onchain operations like transfers, trades, and smart contract interactions.

## Setup

### Prerequisites
- Node.js 18 or higher
- [CDP API Key](https://portal.cdp.coinbase.com/access/api)

### Installation

```bash
npm install @cdp/langchain
```

### Environment Setup

Set the following environment variables:

```bash
export CDP_API_KEY_NAME=<your-api-key-name>
export CDP_API_KEY_PRIVATE_KEY=$'<your-private-key>'
export OPENAI_API_KEY=<your-openai-api-key>
export NETWORK_ID=base-sepolia  # Optional: Defaults to base-sepolia
```

## Usage

### Basic Setup

```typescript
import { CdpToolkit, CdpAgentkitWrapper } from "@cdp/langchain";

// Initialize CDP wrapper
const cdp = new CdpAgentkitWrapper();

// Create toolkit from wrapper
const toolkit = CdpToolkit.fromCdpAgentkitWrapper(cdp);
```

View available tools:
```typescript
const tools = toolkit.getTools();
tools.forEach(tool => console.log(tool.name));
```

The toolkit provides the following tools:

1. **get_wallet_details** - Get details about the MPC Wallet
2. **get_balance** - Get balance for specific assets
3. **request_faucet_funds** - Request test tokens from faucet
4. **transfer** - Transfer assets between addresses
5. **trade** - Trade assets (Mainnet only)
6. **deploy_token** - Deploy ERC-20 token contracts
7. **mint_nft** - Mint NFTs from existing contracts
8. **deploy_nft** - Deploy new NFT contracts
9. **register_basename** - Register a basename for the wallet
10. **wow_create_token** - Deploy a token using Zora's Wow Launcher (Bonding Curve)
11. **wow_buy_token** - Buy Zora Wow ERC20 memecoin with ETH
12. **wow_sell_token** - Sell Zora Wow ERC20 memecoin for ETH

### Using with an Agent

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor } from "langchain/agents";

// Initialize LLM
const llm = new ChatOpenAI({ modelName: "gpt-4o-mini" });

// Get tools and create agent
const tools = toolkit.getTools();
const agent = AgentExecutor.fromAgentAndTools({
  agent: llm,
  tools,
  verbose: true,
});

// Example usage
const result = await agent.invoke({
  input: "Send 0.005 ETH to john2879.base.eth",
});
console.log(result.output);
```

Expected output:
```
Transferred 0.005 of eth to john2879.base.eth.
Transaction hash for the transfer: 0x78c7c2878659a0de216d0764fc87eff0d38b47f3315fa02ba493a83d8e782d1e
Transaction link for the transfer: https://sepolia.basescan.org/tx/0x78c7c2878659a0de216d0764fc87eff0d38b47f3315fa02ba493a83d8e782d1
```

## Contributing
See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed setup instructions and contribution guidelines. 