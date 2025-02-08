"""CDP Toolkit."""

from typing import List
from crewai.tools import BaseTool
from cdp_agentkit_core.actions import CDP_ACTIONS
from ..utils import CdpAgentkitWrapper
from ..tools import CdpTool

class CdpToolkit:
    """Coinbase Developer Platform (CDP) Toolkit.

    *Security Note*: This toolkit contains tools that can read and modify
        the state of a service; e.g., by creating, deleting, or updating,
        reading underlying data.

        For example, this toolkit can be used to create wallets, transactions,
        and smart contract invocations on CDP supported blockchains.
    """

    tools: List[BaseTool] = []

    def __init__(self, tools: List[BaseTool] = None):
        """Initialize the toolkit with tools."""
        self.tools = tools or []

    @classmethod
    def from_cdp_agentkit_wrapper(cls, cdp_agentkit_wrapper: CdpAgentkitWrapper) -> "CdpToolkit":
        """Create a CdpToolkit from a CdpAgentkitWrapper.

        Args:
            cdp_agentkit_wrapper: CdpAgentkitWrapper. The CDP Agentkit wrapper.

        Returns:
            CdpToolkit. The CDP toolkit.
        """
        actions = CDP_ACTIONS

        tools = [
            CdpTool(
                name=action.name,
                description=action.description,
                cdp_agentkit_wrapper=cdp_agentkit_wrapper,
                args_schema=action.args_schema,
                func=action.func
            )
            for action in actions
        ]

        return cls(tools=tools)

    def get_tools(self) -> List[BaseTool]:
        """Get the tools in the toolkit."""
        return self.tools