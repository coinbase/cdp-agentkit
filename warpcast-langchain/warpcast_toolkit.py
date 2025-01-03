from langchain_core.tools import BaseTool
from langchain_core.tools.base import BaseToolkit

from cdp_agentkit_core.actions.social.warpcast import (
    CastAction,
    ReplyAction,
    UserDetailsAction,
    UserCastsAction,
)
from warpcast_langchain.warpcast_api_wrapper import WarpcastApiWrapper


class WarpcastToolkit(BaseToolkit):
    """Warpcast Toolkit for Langchain integration."""

    tools: list[BaseTool] = []  # noqa: RUF012

    @classmethod
    def from_warpcast_api_wrapper(cls, warpcast_api_wrapper: WarpcastApiWrapper) -> "WarpcastToolkit":
        """Create a WarpcastToolkit from a WarpcastApiWrapper.

        Args:
            warpcast_api_wrapper: WarpcastApiWrapper. The Warpcast API wrapper.

        Returns:
            WarpcastToolkit. The Warpcast toolkit.

        """
        actions = [
            CastAction(),
            ReplyAction(),
            UserDetailsAction(),
            UserCastsAction(),
        ]

        tools = [
            BaseTool(
                name=action.name,
                description=action.description,
                args_schema=action.args_schema,
                func=action.func,
            )
            for action in actions
        ]

        return cls(tools=tools)  # type: ignore[arg-type]

    def get_tools(self) -> list[BaseTool]:
        """Get the tools in the toolkit."""
        return self.tools
