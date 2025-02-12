# AgentKit

AgentKit is a framework for easily enabling AI agents to take actions onchain. It is designed to be framework-agnostic, so you can use it with any AI framework, and wallet-agnostic, so you can use it with any wallet.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  - [Create an AgentKit instance](#create-an-agentkit-instance)
  - [Create an AgentKit instance with a specified wallet provider](#create-an-agentkit-instance-with-a-specified-wallet-provider)
  - [Create an AgentKit instance with an eth-account wallet provider](#create-an-agentkit-instance-with-an-eth-account-wallet-provider)
  - [Create an AgentKit instance with specified action providers](#create-an-agentkit-instance-with-specified-action-providers)
  - [Use with a framework extension (e.g., LangChain + OpenAI)](#use-with-a-framework-extension)
- [Creating an Action Provider](#creating-an-action-provider)
  - [Adding Actions to your Action Provider](#adding-actions-to-your-action-provider)
  - [Adding Actions that use a Wallet Provider](#adding-actions-that-use-a-wallet-provider)
  - [Adding an Action Provider to your AgentKit instance](#adding-an-action-provider-to-your-agentkit-instance)
- [Wallet Providers](#wallet-providers)
  - [CdpWalletProvider](#cdpwalletprovider)
  - [EthAccountWalletProvider](#ethaccountwalletprovider)
- [Contributing](#contributing)

## Getting Started

*Prerequisites*:
- [Python 3.10+](https://www.python.org/downloads/)
- [CDP Secret API Key](https://docs.cdp.coinbase.com/get-started/docs/cdp-api-keys#creating-secret-api-keys)

## Installation

```bash
pip install coinbase-agentkit
```

## Usage

### Create an AgentKit instance

If no wallet or action providers are specified, the agent will use the `CdpWalletProvider` and `WalletActionProvider` action provider by default.

```python
from coinbase_agentkit import AgentKit, AgentKitConfig

agent_kit = AgentKit()
```

### Create an AgentKit instance with a specified wallet provider

```python
from coinbase_agentkit import (
    AgentKit, 
    AgentKitConfig, 
    CdpWalletProvider, 
    CdpWalletProviderConfig
)

wallet_provider = CdpWalletProvider(CdpWalletProviderConfig(
    api_key_name="CDP API KEY NAME",
    api_key_private="CDP API KEY PRIVATE KEY",
    network_id="base-mainnet"
))

agent_kit = AgentKit(AgentKitConfig(
    wallet_provider=wallet_provider
))
```

### Create an AgentKit instance with an eth-account wallet provider

```python
from coinbase_agentkit import (
    AgentKit, 
    AgentKitConfig, 
    EthAccountWalletProvider, 
    EthAccountWalletProviderConfig
)

# See here for creating a private key:
# https://web3py.readthedocs.io/en/stable/web3.eth.account.html#creating-a-private-key
private_key = os.environ.get("PRIVATE_KEY")
assert private_key is not None, "You must set PRIVATE_KEY environment variable"
assert private_key.startswith("0x"), "Private key must start with 0x hex prefix"

wallet_provider = EthAccountWalletProvider(
    config=EthAccountWalletProviderConfig(
        private_key=private_key,
        chain_id=84532,
        rpc_url="https://sepolia.base.org",
    )
)

agent_kit = AgentKit(AgentKitConfig(
    wallet_provider=wallet_provider
))
```

### Create an AgentKit instance with specified action providers

```python
from coinbase_agentkit import (
    AgentKit,
    AgentKitConfig,
    cdp_api_action_provider,
    pyth_action_provider
)

agent_kit = AgentKit(AgentKitConfig(
    wallet_provider=wallet_provider,
    action_providers=[
        cdp_api_action_provider(
            api_key_name="CDP API KEY NAME",
            api_key_private="CDP API KEY PRIVATE KEY"
        ),
        pyth_action_provider()
    ]
))
```

### Use with a framework extension

Example using LangChain + OpenAI:

*Prerequisites*:
- [OpenAI API Key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)
- Set `OPENAI_API_KEY` environment variable

```bash
poetry add coinbase-agentkit-langchain langchain-openai langgraph
```

```python
from coinbase_agentkit_langchain import get_langchain_tools
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

tools = get_langchain_tools(agent_kit)

llm = ChatOpenAI(model="gpt-4")

agent = create_react_agent(
    llm=llm,
    tools=tools
)
```

## Creating an Action Provider

Action providers define the actions that an agent can take. They are created by subclassing the `ActionProvider` abstract class.

```python
from coinbase_agentkit import ActionProvider, WalletProvider, Network

class MyActionProvider(ActionProvider[WalletProvider]):
    def __init__(self):
        super().__init__("my-action-provider", [])
    
    # Define if the action provider supports the given network
    def supports_network(self, network: Network) -> bool:
        return True
```

### Adding Actions to your Action Provider

Actions are defined using the `@create_action` decorator. They can optionally use a wallet provider and must return a string.

1. Define the action schema using Pydantic:

```python
from pydantic import BaseModel

class MyActionSchema(BaseModel):
    my_field: str
```

2. Define the action:

```python
from coinbase_agentkit import ActionProvider, WalletProvider, Network, create_action

class MyActionProvider(ActionProvider[TWalletProvider]):
    def __init__(self):
        super().__init__("my-action-provider", [])

    @create_action(
        name="my-action",
        description="My action description",
        schema=MyActionSchema
    )
    def my_action(self, args: dict[str, Any]) -> str:
        return args["my_field"]

    def supports_network(self, network: Network) -> bool:
        return True

def my_action_provider():
    return MyActionProvider()
```

### Adding Actions that use a Wallet Provider

Actions that need access to a wallet provider can include it as their first parameter:

```python
class MyActionProvider(ActionProvider[TWalletProvider]):
    @create_action(
        name="my-action",
        description="My action description",
        schema=MyActionSchema
    )
    def my_action(self, wallet_provider: WalletProvider, args: dict[str, Any]) -> str:
        return wallet_provider.sign_message(args["my_field"])
```

### Adding an Action Provider to your AgentKit instance

```python
agent_kit = AgentKit(AgentKitConfig(
    cdp_api_key_name="CDP API KEY NAME",
    cdp_api_key_private="CDP API KEY PRIVATE KEY",
    action_providers=[my_action_provider()]
))
```

## Wallet Providers

AgentKit supports the following wallet providers:

EVM:
- [CdpWalletProvider](./coinbase_agentkit/wallet_providers/cdp_wallet_provider.py) - Uses the Coinbase Developer Platform (CDP) API Wallet
- [EthAccountWalletProvider](./coinbase_agentkit/wallet_providers/eth_account_wallet_provider.py) - Uses a local private key for any EVM-compatible chain

### CdpWalletProvider

For detailed usage of the CdpWalletProvider, see the [CDP API Wallet documentation](https://docs.cdp.coinbase.com/wallet-api/docs/welcome).

### EthAccountWalletProvider

Example usage with a private key:

```python
from coinbase_agentkit import EthAccountWalletProvider, EthAccountWalletProviderConfig

wallet_provider = EthAccountWalletProvider(EthAccountWalletProviderConfig(
    private_key="YOUR_PRIVATE_KEY",
    rpc_url="YOUR_RPC_URL",
    chain_id=8453
))
```

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for more information.
