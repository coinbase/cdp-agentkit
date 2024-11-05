"""TwitterToolkit."""

from langchain_core.tools import BaseTool
from langchain_core.tools.base import BaseToolkit
from twitterlangchain import TwitterApiWrapper

from twitter_langchain import TwitterAction


class TwitterToolkit(BaseToolkit):
    """Twitter (X) Toolkit.

    *Security Note*: This toolkit contains tools that can read and modify
        the state of a service; e.g., by creating, deleting, or updating,
        reading underlying data.

        For example, this toolkit can be used post messages on Twitter (X).

        See [Security](https://python.langchain.com/docs/security) for more information.

    Setup:
        See detailed installation instructions here:
        https://python.langchain.com/docs/integrations/tools/twitter/#installation

        You will need to set the following environment
        variables:

        .. code-block:: bash

            # TODO: Add relevant ENV VARs

    Instantiate:
        .. code-block:: python

            from twitter_langchain import TwitterToolkit
            from twitter_langchain import TwitterAgentkitWrapper

            twitter = TwitterAgentkitWrapper()
            twitter_toolkit = TwitterToolkit.from_twitter_api_wrapper(twitter)

    Tools:
        .. code-block:: python

            tools = twitter_toolkit.get_tools()
            for tool in tools:
                print(tool.name)

        .. code-block:: none

            # TODO: Add list of available tools.

    Use within an agent:
        .. code-block:: python

            from langchain_openai import ChatOpenAI
            from langgraph.prebuilt import create_react_agent

            # Select example tool
            tools = [tool for tool in toolkit.get_tools() if tool.name == "post_tweet"]
            assert len(tools) == 1

            llm = ChatOpenAI(model="gpt-4o-mini")
            agent_executor = create_react_agent(llm, tools)

            example_query = "Post a hello tweet to the world"

            events = agent_executor.stream(
                {"messages": [("user", example_query)]},
                stream_mode="values",
            )
            for event in events:
                event["messages"][-1].pretty_print()

        .. code-block:: none

             ================================[1m Human Message [0m=================================

            Post a hello tweet to the world
            ==================================[1m Ai Message [0m==================================
            Tool Calls:
            post_tweet (call_iSYJVaM7uchfNHOMJoVPQsOi)
            Call ID: call_iSYJVaM7uchfNHOMJoVPQsOi
            Args:
                no_input: "hello world"
            =================================[1m Tool Message [0m=================================
            Name: post_tweet

            ...
            ==================================[1m Ai Message [0m==================================

            I posted the tweet "hello world".

    Parameters
    ----------
        tools: List[BaseTool]. The tools in the toolkit. Default is an empty list.

    """

    tools: list[BaseTool] = []  # noqa: RUF012

    @classmethod
    def from_twitter_api_wrapper(cls, twitter_api_wrapper: TwitterApiWrapper) -> "TwitterToolkit":
        """Create a TwitterToolkit from a TwitterApiWrapper.

        Args:
            twitter_api_wrapper: TwitterApiWrapper. The Twitter (X) API wrapper.

        Returns:
            TwitterToolkit. The Twitter toolkit.

        """
        actions: list[dict] = []

        tools = [
            TwitterAction(
                name=action["name"],
                description=action["description"],
                mode=action["mode"],
                twitter_api_wrapper=twitter_api_wrapper,
                args_schema=action.get("args_schema", None),
            )
            for action in actions
        ]

        return cls(tools=tools)  # type: ignore[arg-type]

    def get_tools(self) -> list[BaseTool]:
        """Get the tools in the toolkit."""
        return self.tools
