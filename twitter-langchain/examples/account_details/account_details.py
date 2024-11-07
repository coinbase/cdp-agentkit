import uuid

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent

from twitter_langchain import (
    TwitterApiWrapper,
    TwitterToolkit
)

# Initialize TwitterApiwrapper
twitter_api_wrapper = TwitterApiWrapper()

# Create TwitterToolkit from the api wrapper
twitter_toolkit = TwitterToolkit.from_twitter_api_wrapper(twitter_api_wrapper)

# View available tools
tools = twitter_toolkit.get_tools()
for tool in tools:
    print(tool.name)

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o-mini")

# Create agent
agent_executor = create_react_agent(llm, tools)

# Example - get account details
events = agent_executor.stream(
    {
        "messages": [
            HumanMessage(content=f"Please obtain my twitter account information"),
        ],
    },
    stream_mode="values",
)

for event in events:
    event["messages"][-1].pretty_print()

#  ================================ Human Message =================================
#  What is my twitter account profile link?
#  ================================== Ai Message ==================================
#  Tool Calls:
#      account_details (call_pYME8H1tHfdMakFZ1FTS0VBX)
#      Call ID: call_pYME8H1tHfdMakFZ1FTS0VBX
#          Args:
#  ================================= Tool Message =================================
#  Name: account_details

#  Successfully retrieved authenticated user account details. Please present the following as json and not markdown:
#  id: 1853889445319331840
#  name: CDP AgentKit
#  username: CDPAgentKit
#  link: https://x.com/CDPAgentKit
#  ================================== Ai Message ==================================
#  {
#      "id": "[REDACTED]",
#      "name": "[REDACTED]",
#      "username": "[REDACTED]",
#      "link": "[REDACTED]"
#  }
