"""CDP Toolkit."""

from langchain_core.tools import BaseTool
from langchain_core.tools.base import BaseToolkit

from cdp_agentkit_core.actions import (
    DEPLOY_NFT_PROMPT,
    DEPLOY_TOKEN_PROMPT,
    GET_BALANCE_PROMPT,
    GET_WALLET_DETAILS_PROMPT,
    MINT_NFT_PROMPT,
    REGISTER_BASENAME_PROMPT,
    REQUEST_FAUCET_FUNDS_PROMPT,
    TRADE_PROMPT,
    TRANSFER_PROMPT,
    DeployNftInput,
    DeployTokenInput,
    GetBalanceInput,
    GetWalletDetailsInput,
    MintNftInput,
    RegisterBasenameInput,
    RequestFaucetFundsInput,
    TradeInput,
    TransferInput,
)
from cdp_langchain.tools import CdpAction
from cdp_langchain.utils import CdpAgentkitWrapper


class CdpToolkit(BaseToolkit):
    """Coinbase Developer Platform (CDP) Toolkit.

    *Security Note*: This toolkit contains tools that can read and modify
        the state of a service; e.g., by creating, deleting, or updating,
        reading underlying data.

        For example, this toolkit can be used to create wallets, transactions,
        and smart contract invocations on CDP supported blockchains.

        See [Security](https://python.langchain.com/docs/security) for more information.

    Setup:
        See detailed installation instructions here:
        https://python.langchain.com/docs/integrations/tools/cdp/#installation

        You will need to set the following environment
        variables:

        .. code-block:: bash

            export CDP_API_KEY_NAME="cdp-api-key-name"
            export CDP_API_KEY_PRIVATE_KEY="cdp-api-key-private-key"
            export NETWORK_ID="network-id"

    Instantiate:
        .. code-block:: python

            from cdp_langchain.agent_toolkits import CdpToolkit
            from cdp_langchain.utils import CdpAgentkitWrapper

            cdp = CdpAgentkitWrapper()
            cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

    Tools:
        .. code-block:: python

            tools = cdp_toolkit.get_tools()
            for tool in tools:
                print(tool.name)

        .. code-block:: none

            get_wallet_details
            get_balance
            request_faucet_funds
            transfer
            trade
            deploy_token
            mint_nft
            deploy_nft
            register_basename

    Use within an agent:
        .. code-block:: python

            from langchain_openai import ChatOpenAI
            from langgraph.prebuilt import create_react_agent

            # Select example tool
            tools = [tool for tool in toolkit.get_tools() if tool.name == "get_wallet_details"]
            assert len(tools) == 1

            llm = ChatOpenAI(model="gpt-4o-mini")
            agent_executor = create_react_agent(llm, tools)

            example_query = "Tell me about your wallet"

            events = agent_executor.stream(
                {"messages": [("user", example_query)]},
                stream_mode="values",
            )
            for event in events:
                event["messages"][-1].pretty_print()

        .. code-block:: none

             ================================[1m Human Message [0m=================================

            Tell me about your wallet
            ==================================[1m Ai Message [0m==================================
            Tool Calls:
            get_wallet_details (call_iSYJVaM7uchfNHOMJoVPQsOi)
            Call ID: call_iSYJVaM7uchfNHOMJoVPQsOi
            Args:
                no_input: ""
            =================================[1m Tool Message [0m=================================
            Name: get_wallet_details

            ...
            ==================================[1m Ai Message [0m==================================

            My wallet is wallet-id-123 on Base Sepolia with default address 0x0123

    Parameters
    ----------
        tools: List[BaseTool]. The tools in the toolkit. Default is an empty list.

    """

    tools: list[BaseTool] = []  # noqa: RUF012

    @classmethod
    def from_cdp_agentkit_wrapper(cls, cdp_agentkit_wrapper: CdpAgentkitWrapper) -> "CdpToolkit":
        """Create a CdpToolkit from a CdpAgentkitWrapper.

        Args:
            cdp_agentkit_wrapper: CdpAgentkitWrapper. The CDP Agentkit wrapper.

        Returns:
            CdpToolkit. The CDP toolkit.

        """
        actions: list[dict] = [
            {
                "mode": "get_wallet_details",
                "name": "get_wallet_details",
                "description": GET_WALLET_DETAILS_PROMPT,
                "args_schema": GetWalletDetailsInput,
            },
            {
                "mode": "get_balance",
                "name": "get_balance",
                "description": GET_BALANCE_PROMPT,
                "args_schema": GetBalanceInput,
            },
            {
                "mode": "request_faucet_funds",
                "name": "request_faucet_funds",
                "description": REQUEST_FAUCET_FUNDS_PROMPT,
                "args_schema": RequestFaucetFundsInput,
            },
            {
                "mode": "transfer",
                "name": "transfer",
                "description": TRANSFER_PROMPT,
                "args_schema": TransferInput,
            },
            {
                "mode": "trade",
                "name": "trade",
                "description": TRADE_PROMPT,
                "args_schema": TradeInput,
            },
            {
                "mode": "deploy_token",
                "name": "deploy_token",
                "description": DEPLOY_TOKEN_PROMPT,
                "args_schema": DeployTokenInput,
            },
            {
                "mode": "mint_nft",
                "name": "mint_nft",
                "description": MINT_NFT_PROMPT,
                "args_schema": MintNftInput,
            },
            {
                "mode": "deploy_nft",
                "name": "deploy_nft",
                "description": DEPLOY_NFT_PROMPT,
                "args_schema": DeployNftInput,
            },
            {
                "mode": "register_basename",
                "name": "register_basename",
                "description": REGISTER_BASENAME_PROMPT,
                "args_schema": RegisterBasenameInput,
            },
        ]

        tools = [
            CdpAction(
                name=action["name"],
                description=action["description"],
                mode=action["mode"],
                cdp_agentkit_wrapper=cdp_agentkit_wrapper,
                args_schema=action.get("args_schema", None),
            )
            for action in actions
        ]

        return cls(tools=tools)  # type: ignore[arg-type]

    def get_tools(self) -> list[BaseTool]:
        """Get the tools in the toolkit."""
        return self.tools
