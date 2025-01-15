# CDP Agentkit Extension - Langchain Toolkit
CDP integration with Langchain to enable agentic workflows using the core primitives defined in `cdp-agentkit-core`.

This toolkit contains tools that enable an LLM agent to interact with the [Coinbase Developer Platform](https://docs.cdp.coinbase.com/). The toolkit provides a wrapper around the CDP SDK, allowing agents to perform onchain operations like transfers, trades, and smart contract interactions.

## Setup

### Prerequisites

#### CDP

- [CDP API Key](https://portal.cdp.coinbase.com/access/api)

#### OpenAI

- [OpenAI API Key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key)

#### Python

- Python 3.10 or higher 

#### Typescript

- Node.js 18 or higher

### Installation

#### Python

```bash
pip install cdp-langchain
```

#### Typescript

```bash
npm install @coinbase/cdp-langchain
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

#### Python

```python
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper

# Initialize CDP wrapper
cdp = CdpAgentkitWrapper()

# Create toolkit from wrapper
toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

# Get available tools
tools = toolkit.get_tools()
for tool in tools:
    print(tool.name)
```

#### Typescript

```typescript
```typescript
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";

// Initialize CDP AgentKit
const agentkit = await CdpAgentkit.configureWithWallet();

// Create toolkit
const toolkit = new CdpToolkit(agentkit);

// Get available tools
const tools = toolkit.getTools();
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
13. **wrap_eth** - Wrap ETH to WETH

### Using with an Agent

#### Python

```python
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o-mini")

# Get tools and create agent
tools = toolkit.get_tools()
agent_executor = create_react_agent(llm, tools)

# Example usage
events = agent_executor.stream(
    {"messages": [("user", "Send 0.005 ETH to john2879.base.eth")]},
    stream_mode="values"
)

for event in events:
    event["messages"][-1].pretty_print()
```
Expected output:
```
Transferred 0.005 of eth to john2879.base.eth.
Transaction hash for the transfer: 0x78c7c2878659a0de216d0764fc87eff0d38b47f3315fa02ba493a83d8e782d1e
Transaction link for the transfer: https://sepolia.basescan.org/tx/0x78c7c2878659a0de216d0764fc87eff0d38b47f3315fa02ba493a83d8e782d1
```

#### Typescript

##### Additional Installations

```bash
npm install @langchain/langgraph @langchain/openai
```

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// Initialize LLM
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
});

// Create agent executor
const agent = createReactAgent({
  llm: model,
  tools,
});

// Example usage
const result = await agent.invoke({
  messages: [new HumanMessage("Send 0.005 ETH to john2879.base.eth")],
});

console.log(result.messages[result.messages.length - 1].content);
```

## CDP Tookit Specific Features

### Wallet Management

The toolkit maintains an MPC wallet that persists between sessions:

#### Python

```python
# Export wallet data
wallet_data = cdp.export_wallet()

# Import wallet data
values = {"cdp_wallet_data": wallet_data}
cdp = CdpAgentkitWrapper(**values)
```

#### Typescript

```typescript
// Export wallet data
const walletData = await agentkit.exportWallet();

// Import wallet data
const importedAgentkit = await CdpAgentkit.configureWithWallet({ cdpWalletData: walletData });
```

### Network Support

The toolkit supports [multiple networks](https://docs.cdp.coinbase.com/cdp-sdk/docs/networks).

### Gasless Transactions

The following operations support gasless transactions on Base Mainnet:
- USDC transfers
- EURC transfers
- cbBTC transfers

## Examples

Check out [cdp-langchain/examples](./examples) for inspiration and help getting started!
- [Chatbot Python](./examples/chatbot-python/README.md): Simple example of a Python Chatbot that can perform complex onchain interactions, using OpenAI.
- [Chatbot Typescript](./examples/chatbot-typescript/README.md): Simple example of a Node.js Chatbot that can perform complex onchain interactions, using OpenAI.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed setup instructions and contribution guidelines.
