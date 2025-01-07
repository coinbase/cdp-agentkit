# Warpcast Langchain Integration

This package provides integration with Warpcast for the CDP Agentkit, enabling agentic workflows using the core primitives defined in `cdp-agentkit-core`.

## Setup

### Prerequisites
- Python 3.10 or higher
- Warpcast API Key

### Installation

```bash
pip install warpcast-langchain
```

### Environment Setup

Set the following environment variables:

```bash
export WARPCAST_API_KEY=<your-warpcast-api-key>
```

## Usage

### Basic Setup

```python
from warpcast_langchain.warpcast_api_wrapper import WarpcastApiWrapper
from warpcast_langchain.warpcast_toolkit import WarpcastToolkit

# Initialize Warpcast API wrapper
warpcast_api = WarpcastApiWrapper(api_key="your-warpcast-api-key")

# Create toolkit from wrapper
toolkit = WarpcastToolkit(api_wrapper=warpcast_api)
```

View available tools:
```python
tools = toolkit.get_tools()
for tool in tools:
    print(tool.name)
```

The toolkit provides the following tools:

1. **cast** - Post a cast
2. **reply_to_cast** - Reply to a cast
3. **get_user_details** - Get user details
4. **get_user_casts** - Get user's casts

### Using with an Agent

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
    {"messages": [("user", "Post a cast saying 'Hello, Warpcast!'")]},
    stream_mode="values"
)

for event in events:
    event["messages"][-1].pretty_print()
```
Expected output:
```
Posted a cast saying 'Hello, Warpcast!'.
```

## Contributing
See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed setup instructions and contribution guidelines.
