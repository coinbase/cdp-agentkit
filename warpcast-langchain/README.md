# Warpcast Langchain Toolkit
Warpcast integration with Langchain to enable agentic workflows using the core primitives defined in `cdp-agentkit-core`.

This toolkit contains tools that enable an LLM agent to interact with [Warpcast](https://warpcast.com/~/developers). The toolkit provides a wrapper around the Warpcast API, allowing agents to perform social operations like posting casts and replies.

## Setup

### Prerequisites
- Python 3.10 or higher 
- [OpenAI API Key](https://platform.openai.com/api-keys)
- [Warpcast API Credentials](https://warpcast.com/~/developers)

### Installation

```bash
pip install warpcast-langchain
```

### Environment Setup

Set the following environment variables:

```bash
export OPENAI_API_KEY=<your-openai-api-key>
export WARPCAST_MNEMONIC=<your-mnemonic>
export WARPCAST_API_KEY=<your-api-key>
```

## Usage

### Basic Setup

```python
from warpcast_langchain import (
    WarpcastApiWrapper,
    WarpcastToolkit
)

# Initialize WarpcastApiWrapper
warpcast_api_wrapper = WarpcastApiWrapper()

# Create WarpcastToolkit from the api wrapper
warpcast_toolkit = WarpcastToolkit.from_warpcast_api_wrapper(warpcast_api_wrapper)
```

View available tools:
```python
tools = warpcast_toolkit.get_tools()
for tool in tools:
    print(tool.name)
```

The toolkit provides the following tools:

1. **user_details** - Get user details by FID
2. **user_casts** - Get casts from a specific user
3. **cast** - Post a cast (max 320 characters)
4. **reply_to_cast** - Reply to an existing cast

### Using with an Agent

```python
import uuid

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent

llm = ChatOpenAI(model="gpt-4-turbo-preview")

# Create agent
agent_executor = create_react_agent(llm, tools)

# Example - post cast
events = agent_executor.stream(
    {
        "messages": [
            HumanMessage(content=f"Please post 'Hello Farcaster! {uuid.uuid4().hex}' to Warpcast"),
        ],
    },
    stream_mode="values",
)

for event in events:
    event["messages"][-1].pretty_print()
```

Expected output:
```
================================ Human Message =================================
Please post 'Hello Farcaster! c4b8e3744c2e4345be9e0622b4c0a8aa' to Warpcast
================================== Ai Message ==================================
Tool Calls:
    cast (call_xVx4BMCSlCmCcbEQG1yyebbq)
    Call ID: call_xVx4BMCSlCmCcbEQG1yyebbq
    Args:
        text: Hello Farcaster! c4b8e3744c2e4345be9e0622b4c0a8aa
================================= Tool Message =================================
Name: cast
Successfully posted!
================================== Ai Message ==================================
The message "Hello Farcaster! c4b8e3744c2e4345be9e0622b4c0a8aa" has been successfully posted to Warpcast!
```

## Contributing
See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed setup instructions and contribution guidelines.

## Documentation
For detailed documentation, please visit:
- [Agentkit-Core](https://coinbase.github.io/cdp-agentkit/cdp-agentkit-core/) 