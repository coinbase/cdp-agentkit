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
#  Please post 'hello, world! 2f11acf41ab2412cab56ea9a1d447d74' to twitter
#  ================================== Ai Message ==================================
#  Tool Calls:
#      post_tweet (call_xVx4BMCSlCmCcbEQG1yyebbq)
#      Call ID: call_xVx4BMCSlCmCcbEQG1yyebbq
#      Args:
#          tweet: hello, world! 2f11acf41ab2412cab56ea9a1d447d74
#  ================================= Tool Message =================================
#  Name: post_tweet

#  Successfully posted to Twitter:
#  {"data": {"text": "hello, world! 2f11acf41ab2412cab56ea9a1d447d74", "id": "1857519455640891432", "edit_history_tweet_ids": ["1857519455640891432"]}}
#  ================================== Ai Message ==================================
#  The tweet "hello, world! 2f11acf41ab2412cab56ea9a1d447d74" has been successfully posted to Twitter.
