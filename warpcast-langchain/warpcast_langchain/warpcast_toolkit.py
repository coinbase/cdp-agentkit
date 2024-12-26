"""WarpcastToolkit."""

from cdp_agentkit_core.actions.social.warpcast import WARPCAST_ACTIONS
from langchain_core.tools import BaseTool
from langchain_core.tools.base import BaseToolkit

from warpcast_langchain.warpcast_api_wrapper import WarpcastApiWrapper
from warpcast_langchain.warpcast_tool import WarpcastTool


class WarpcastToolkit(BaseToolkit):
    """Warpcast Toolkit.

    *Security Note*: This toolkit contains tools that can read and modify
        the state of a service; e.g., by creating, deleting, or updating,
        reading underlying data.

        For example, this toolkit can be used to post casts on Warpcast.

        See [Security](https://python.langchain.com/docs/security) for more information.

    Setup:
        See detailed installation instructions here:
        https://python.langchain.com/docs/integrations/tools/warpcast/#installation

        You will need to set the following environment
        variables:

        .. code-block:: bash

        OPENAI_API_KEY
        WARPCAST_MNEMONIC

    Instantiate:
        .. code-block:: python

            from warpcast_langchain import WarpcastToolkit
            from warpcast_langchain import WarpcastApiWrapper

            warpcast = WarpcastApiWrapper()
            warpcast_toolkit = WarpcastToolkit.from_warpcast_api_wrapper(warpcast)

    Tools:
        .. code-block:: python

            tools = warpcast_toolkit.get_tools()
            for tool in tools:
                print(tool.name)

        .. code-block:: none

            user_details
            user_casts
            cast
            reply_to_cast

    Use within an agent:
        .. code-block:: python

            from langchain_openai import ChatOpenAI
            from langgraph.prebuilt import create_react_agent

            # Select example tool
            tools = [tool for tool in toolkit.get_tools() if tool.name == "cast"]
            assert len(tools) == 1

            llm = ChatOpenAI(model="gpt-4-turbo-preview")
            agent_executor = create_react_agent(llm, tools)

            example_query = "Post a hello cast to Farcaster"

            events = agent_executor.stream(
                {"messages": [("user", example_query)]},
                stream_mode="values",
            )
            for event in events:
                event["messages"][-1].pretty_print()

    Parameters
    ----------
        tools: List[BaseTool]. The tools in the toolkit. Default is an empty list.
    """

    tools: list[BaseTool] = []  # noqa: RUF012

    @classmethod
    def from_warpcast_api_wrapper(cls, warpcast_api_wrapper: WarpcastApiWrapper) -> "WarpcastToolkit":
        """Create a WarpcastToolkit from a WarpcastApiWrapper.

        Args:
            warpcast_api_wrapper: WarpcastApiWrapper. The Warpcast API wrapper.

        Returns:
            WarpcastToolkit. The Warpcast toolkit.
        """
        actions = WARPCAST_ACTIONS

        tools = [
            WarpcastTool(
                name=action.name,
                description=action.description,
                warpcast_api_wrapper=warpcast_api_wrapper,
                args_schema=action.args_schema,
                func=action.func,
            )
            for action in actions
        ]

        return cls(tools=tools)  # type: ignore[arg-type]

    def get_tools(self) -> list[BaseTool]:
        """Get the tools in the toolkit."""
        return self.tools 