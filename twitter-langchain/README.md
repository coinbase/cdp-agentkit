# Twitter (X) Langchain Toolkit
Twitter integration with Langchain to enable agentic workflows using the core primitives defined in `cdp-agentkit-core`.

This toolkit contains tools that enable an LLM agent to interact with [Twitter](https://developer.x.com/en/docs/x-api). The toolkit provides a wrapper around the Twitter (X) API, allowing agents to perform social operations like posting text.

## Setup

### Prerequisites

#### OpenAI

- [OpenAI API Key](https://platform.openai.com/api-keys)

#### Twitter (X)

- [Twitter (X) App Developer Keys](https://developer.x.com/en/portal/dashboard)

#### Python

- Python 3.10 or higher 

#### Typescript

- Node.js 18 or higher

### Installation

#### Python

```bash
pip install twitter-langchain
```

#### Typescript

```bash
npm install @coinbase/twitter-langchain
```

### Environment Setup

Set the following environment variables:

```bash
export OPENAI_API_KEY=<your-openai-api-key>
export TWITTER_API_KEY=<your-api-key>
export TWITTER_API_SECRET=<your-api-secret>
export TWITTER_ACCESS_TOKEN=<your-access-token>
export TWITTER_ACCESS_TOKEN_SECRET=<your-access-token-secret>
export TWITTER_BEARER_TOKEN=<your-bearer-token>
```

## Usage

### Basic Setup

#### Python

```python
from twitter_langchain import (
    TwitterApiWrapper,
    TwitterToolkit
)

# Initialize TwitterApiwrapper
twitter_api_wrapper = TwitterApiWrapper()

# Create TwitterToolkit from the api wrapper
twitter_toolkit = TwitterToolkit.from_twitter_api_wrapper(twitter_api_wrapper)
```

View available tools:
```python
tools = twitter_toolkit.get_tools()
for tool in tools:
    print(tool.name)
```

#### Typescript

```typescript
import { TwitterAgentkit } from "@coinbase/cdp-agentkit-core";
import { TwitterToolkit } from "@coinbase/twitter-langchain";

// Initialize Twitter AgentKit
const agentkit = new TwitterAgentkit();

// Create toolkit
const toolkit = new TwitterToolkit(agentkit);

// Get available tools
const tools = toolkit.getTools();
```

### Available Tools

The toolkit provides the following tools:

1. **account_details** - Get the authenticated account details
2. **account_mentions** - Get mentions for the account
3. **post_tweet** - Post a tweet to the account
3. **post_tweet_reply** - Post a reply to a tweet on Twitter

### Using with an Agent

#### Python

```python
import uuid

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent

llm = ChatOpenAI(model="gpt-4o-mini")

# Create agent
agent_executor = create_react_agent(llm, tools)

# Example - post tweet
events = agent_executor.stream(
    {
        "messages": [
            HumanMessage(content=f"Please post 'hello, world! {uuid.uuid4().hex}' to twitter"),
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
Please post 'hello, world! c4b8e3744c2e4345be9e0622b4c0a8aa' to twitter
================================== Ai Message ==================================
Tool Calls:
    post_tweet (call_xVx4BMCSlCmCcbEQG1yyebbq)
    Call ID: call_xVx4BMCSlCmCcbEQG1yyebbq
    Args:
        tweet: hello, world! c4b8e3744c2e4345be9e0622b4c0a8aa
================================= Tool Message =================================
Name: post_tweet
Successfully posted!
================================== Ai Message ==================================
The message "hello, world! c4b8e3744c2e4345be9e0622b4c0a8aa" has been successfully posted to Twitter!
```

#### Typescript

#### Additional Installations

```bash
npm install @langchain/langgraph @langchain/openai
```

```typescript
import { ChatOpenAI } from "@langchain/openai";
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
  messages: [new HumanMessage("please post 'hello, world!' to twitter")],
});

console.log(result.messages[result.messages.length - 1].content);
```

## Examples

Check out [twitter-langchain/examples](./examples) for inspiration and help getting started!
- [Chatbot Python](./examples/chatbot-python/README.md): Simple example of a Python Chatbot that can interact on Twitter (X), using OpenAI.
- [Chatbot Typescript](./examples/chatbot-typescript/README.md): Simple example of a Node.js Chatbot that can interact on Twitter (X), using OpenAI.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed setup instructions and contribution guidelines.
