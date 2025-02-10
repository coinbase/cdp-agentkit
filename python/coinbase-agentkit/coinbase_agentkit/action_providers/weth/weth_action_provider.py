
from web3 import Web3

from ...network import Network
from ...wallet_providers import EvmWalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider
from .constants import WETH_ABI, WETH_ADDRESS
from .schemas import WrapEthInput

SUPPORTED_NETWORKS = ["base-mainnet", "base-sepolia"]

class WethActionProvider(ActionProvider[EvmWalletProvider]):
    """Provides actions for interacting with WETH."""

    def __init__(self):
        super().__init__("weth", [])

    @create_action(
        name="wrap_eth",
        description="""
    This tool can only be used to wrap ETH to WETH.
Do not use this tool for any other purpose, or trading other assets.

Inputs:
- Amount of ETH to wrap.

Important notes:
- The amount is a string and cannot have any decimal points, since the unit of measurement is wei.
- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action.
- 1 wei = 0.000000000000000001 WETH
- Minimum purchase amount is 100000000000000 wei (0.0001 WETH)
- Only supported on the following networks:
  - Base Sepolia (ie, 'base-sepolia')
  - Base Mainnet (ie, 'base', 'base-mainnet')
""",
        schema=WrapEthInput
    )
    def wrap_eth(
        self,
        wallet_provider: EvmWalletProvider,
        args: WrapEthInput
    ) -> str:
        """Wrap ETH to WETH.

        Args:
            wallet_provider (EvmWalletProvider): The wallet provider to use for the action.
            args (dict[str, Any]): The input arguments for the action.

        Returns:
            str: A message containing the transaction hash.

        """
        try:
            contract = Web3().eth.contract(address=WETH_ADDRESS, abi=WETH_ABI)
            data = contract.encode_abi("deposit", args=[])

            tx_hash = wallet_provider.send_transaction({
                "to": WETH_ADDRESS,
                "data": data,
                "value": args.amount_to_wrap
            })

            wallet_provider.wait_for_transaction_receipt(tx_hash)

            return f"Wrapped ETH with transaction hash: {tx_hash}"
        except Exception as e:
            return f"Error wrapping ETH: {e}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by WETH actions."""
        return network.network_id in SUPPORTED_NETWORKS

def weth_action_provider() -> WethActionProvider:
    """Create a new WethActionProvider instance."""
    return WethActionProvider()
