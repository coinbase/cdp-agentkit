"""CDP API action provider for interacting with CDP API."""
from typing import Any
import os

from pydantic import BaseModel, Field, field_validator
import re

from ...network import Network
from ...wallet_providers import EvmWalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider


BASE_SEPOLIA_NETWORK_ID = "base-sepolia"
BASE_SEPOLIA_CHAIN_ID = 84532


# TODO: ask John where this should probably go
class CdpProviderConfig(BaseModel):
    """Configuration options for CDP providers."""
    api_key_name: str | None = Field(None, description="The CDP API key name")
    api_key_private_key: str | None = Field(None, description="The CDP API private key")


class RequestFaucetFundsInput(BaseModel):
    """Input schema for requesting faucet funds."""
    asset_id: str | None = Field(
        None, description="The asset ID to request from the faucet (defaults to ETH if not specified)")


class CdpApiActionProvider(ActionProvider[EvmWalletProvider]):
    """Provides actions for interacting with CDP API.
    
    This provider is used for any action that uses the CDP API, but does not require a CDP Wallet.
    """

    def __init__(self, config: CdpProviderConfig | None = None):
        super().__init__("cdp_api", [])

        try:
            from cdp import Cdp

            api_key_name = config.api_key_name if config else os.getenv("CDP_API_KEY_NAME")
            api_key_private_key = config.api_key_private_key if config else os.getenv("CDP_API_KEY_PRIVATE_KEY")

            if api_key_name and api_key_private_key:
                Cdp.configure(
                    api_key_name=api_key_name,
                    private_key=api_key_private_key.replace('\\n', '\n'),
                )
            else:
                Cdp.configure_from_json()
        except ImportError as e:
            raise ImportError("Failed to import cdp. Please install it with 'pip install cdp-sdk'.") from e
        except Exception as e:
            raise ValueError(f"Failed to initialize CDP client: {e!s}") from e

    @create_action(
        name="request_faucet_funds",
        description="""
This tool will request test tokens from the faucet for the default address in the wallet. It takes the wallet and asset ID as input.
If no asset ID is provided the faucet defaults to ETH. Faucet is only allowed on 'base-sepolia' and can only provide asset ID 'eth' or 'usdc'.
You are not allowed to faucet with any other network or asset ID. If you are on another network, suggest that the user sends you some ETH
from another wallet and provide the user with your wallet details.""",
        schema=RequestFaucetFundsInput,
    )
    def request_faucet_funds(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Request test tokens from the faucet."""
        validated_args = RequestFaucetFundsInput(**args)

        from cdp import ExternalAddress

        try:
            network = wallet_provider.get_network()
            if network.chain_id != BASE_SEPOLIA_CHAIN_ID:
                return "Error: Faucet is only available on base-sepolia network"

            address = ExternalAddress(
                BASE_SEPOLIA_NETWORK_ID,
                wallet_provider.get_address(),
            )

            faucet_tx = address.faucet(validated_args.asset_id)
            faucet_tx.wait()

            asset_str = validated_args.asset_id or "ETH"
            return f"Received {asset_str} from the faucet. Transaction: {faucet_tx.transaction_link}"
        except Exception as e:
            return f"Error requesting faucet funds: {e!s}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by CDP API actions.
        
        CDP API actions 
        """
        return True


def cdp_api_action_provider(config: CdpProviderConfig | None = None) -> CdpApiActionProvider:
    """Create a new CdpApiActionProvider instance."""
    return CdpApiActionProvider(config=config)
