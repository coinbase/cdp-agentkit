
from ...network import Network
from ...wallet_providers import WalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider
from .schemas import GetBalanceInput, GetWalletDetailsInput


class WalletActionProvider(ActionProvider[WalletProvider]):
    """Provides actions for interacting with wallet functionality."""

    def __init__(self):
        super().__init__("wallet", [])

    @create_action(
        name="get_wallet_details",
        description="""
    This tool will return the details of the connected wallet including:
    - Wallet address
    - Network information (protocol family, network ID, chain ID)
    - Native token balance
    - Wallet provider name
    """,
        schema=GetWalletDetailsInput
    )
    def get_wallet_details(
        self,
        wallet_provider: WalletProvider,
        args: GetWalletDetailsInput
    ) -> str:
        """Get details about the wallet."""
        try:
            wallet_address = wallet_provider.get_address()
            network = wallet_provider.get_network()
            balance = wallet_provider.get_balance()
            provider_name = wallet_provider.get_name()

            return f"""Wallet Details:
- Provider: {provider_name}
- Address: {wallet_address}
- Network:
  * Protocol Family: {network.protocol_family}
  * Network ID: {network.network_id or "N/A"}
  * Chain ID: {str(network.chain_id) if network.chain_id else "N/A"}
- Native Balance: {balance}"""
        except Exception as e:
            return f"Error getting wallet details: {e}"

    @create_action(
        name="get_balance",
        description="This tool will get the native currency balance of the connected wallet.",
        schema=GetBalanceInput
    )
    def get_balance(
        self,
        wallet_provider: WalletProvider,
        args: GetBalanceInput
    ) -> str:
        """Get native currency balance for the wallet."""
        try:
            balance = wallet_provider.get_balance()
            wallet_address = wallet_provider.get_address()

            return f"Native balance at address {wallet_address}: {balance}"
        except Exception as e:
            return f"Error getting balance: {e}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by wallet actions."""
        return True

def wallet_action_provider() -> WalletActionProvider:
    """Create a new WalletActionProvider instance."""
    return WalletActionProvider()
