
from ...network import Network
from ...wallet_providers import WalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider
from .constants import CREATE_ABI, DELETE_ABI, SUPERFLUID_HOST_ADDRESS, UPDATE_ABI
from .schemas import CreateFlowInput, DeleteFlowInput, UpdateFlowInput

# Supported network chain IDs
SUPPORTED_MAINNET_CHAIN_IDS = {
    1,      # Ethereum
    10,     # OP Mainnet
    56,     # BNB Smart Chain
    100,    # Gnosis
    137,    # Polygon
    8453,   # Base
    42161,  # Arbitrum One
    42220,  # Celo
    43114,  # Avalanche
    534352,  # Scroll
    666666666,   # Degen
}

SUPPORTED_TESTNET_CHAIN_IDS = {
    43113,    # Avalanche Fuji
    84532,    # Base Sepolia
    534351,   # Scroll Sepolia
    11155111,  # Sepolia
    11155420,  # OP Sepolia
}

# All supported chain IDs
SUPPORTED_CHAIN_IDS = SUPPORTED_MAINNET_CHAIN_IDS | SUPPORTED_TESTNET_CHAIN_IDS


class SuperfluidActionProvider(ActionProvider[WalletProvider]):
    """Provides actions for interacting with Superfluid protocol."""

    def __init__(self, wallet_provider: WalletProvider):
        super().__init__("superfluid", [])
        self.wallet_provider = wallet_provider

    @create_action(
        name="create_flow",
        description="""
This tool will create a money flow to a specified token recipient using Superfluid. Do not use this tool for any other purpose, or trading other assets.

Inputs:
- Wallet address to send the tokens to
- Super token contract address
- The flowrate of flow in wei per second

Important notes:
- The flowrate cannot have any decimal points, since the unit of measurement is wei per second.
- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action.
- 1 wei = 0.000000000000000001 ETH""",
        schema=CreateFlowInput,
    )
    def create_flow(self, wallet_provider: WalletProvider, args: CreateFlowInput) -> str:
        """Create a money flow using Superfluid."""
        try:
            transaction = wallet_provider.send_transaction(
                contract_address=SUPERFLUID_HOST_ADDRESS,
                abi=CREATE_ABI,
                method="createFlow",
                args={
                    "token": args.token_address,
                    "sender": wallet_provider.get_address(),
                    "receiver": args.recipient,
                    "flowrate": args.flow_rate,
                    "userData": "0x",
                },
            )

            receipt = transaction.wait_for_receipt()
            return f"Flow created successfully. Transaction hash: {receipt.transaction_hash}"
        except Exception as e:
            return f"Error creating flow: {e!s}"

    @create_action(
        name="update_flow",
        description="""
This tool will update an existing money flow to a specified token recipient using Superfluid. Do not use this tool for any other purpose, or trading other assets.

Inputs:
- Wallet address that the tokens are being streamed to
- Super token contract address
- The new flowrate of flow in wei per second

Important notes:
- The flowrate cannot have any decimal points, since the unit of measurement is wei per second.
- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action.
- 1 wei = 0.000000000000000001 ETH""",
        schema=UpdateFlowInput,
    )
    def update_flow(self, wallet_provider: WalletProvider, args: UpdateFlowInput) -> str:
        """Update an existing money flow using Superfluid."""
        try:
            transaction = wallet_provider.send_transaction(
                contract_address=SUPERFLUID_HOST_ADDRESS,
                abi=UPDATE_ABI,
                method="updateFlow",
                args={
                    "token": args.token_address,
                    "sender": wallet_provider.get_address(),
                    "receiver": args.recipient,
                    "flowrate": args.new_flow_rate,
                    "userData": "0x",
                },
            )

            receipt = transaction.wait_for_receipt()
            return f"Flow updated successfully. Transaction hash: {receipt.transaction_hash}"
        except Exception as e:
            return f"Error updating flow: {e!s}"

    @create_action(
        name="delete_flow",
        description="""
This tool will delete an existing money flow to a token recipient using Superfluid. Do not use this tool for any other purpose, or trading other assets.

Inputs:
- Wallet address that the tokens are being streamed to or being streamed from
- Super token contract address""",
        schema=DeleteFlowInput,
    )
    def delete_flow(self, wallet_provider: WalletProvider, args: DeleteFlowInput) -> str:
        """Delete an existing money flow using Superfluid."""
        try:
            transaction = wallet_provider.send_transaction(
                contract_address=SUPERFLUID_HOST_ADDRESS,
                abi=DELETE_ABI,
                method="deleteFlow",
                args={
                    "token": args.token_address,
                    "sender": wallet_provider.get_address(),
                    "receiver": args.recipient,
                    "userData": "0x",
                },
            )

            receipt = transaction.wait_for_receipt()
            return f"Flow deleted successfully. Transaction hash: {receipt.transaction_hash}"
        except Exception as e:
            return f"Error deleting flow: {e!s}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by Superfluid actions.

        Args:
            network: The network to check support for.

        Returns:
            bool: True if the network is supported, False otherwise.

        """
        return (
            network.protocol_family == "evm"
            and network.chain_id is not None
            and network.chain_id in SUPPORTED_CHAIN_IDS
        )


def superfluid_action_provider(wallet_provider: WalletProvider) -> SuperfluidActionProvider:
    """Create a new SuperfluidActionProvider instance."""
    return SuperfluidActionProvider(wallet_provider)
