import uuid

from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

from twitter_langchain import TwitterApiWrapper, TwitterToolkit

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

# Successful Output
#  ================================ Human Message =================================
#  Please post 'hello, world! c4b8e3744c2e4345be9e0622b4c0a8aa' to twitter
#  ================================== Ai Message ==================================
#  Tool Calls:
#      post_tweet (call_xVx4BMCSlCmCcbEQG1yyebbq)
#      Call ID: call_xVx4BMCSlCmCcbEQG1yyebbq
#      Args:
#          text: hello, world! c4b8e3744c2e4345be9e0622b4c0a8aa
#  ================================= Tool Message =================================
#  Name: post_tweet
#  Successfully posted!
#  ================================== Ai Message ==================================
#  The message "hello, world! c4b8e3744c2e4345be9e0622b4c0a8aa" has been successfully posted to Twitter!
