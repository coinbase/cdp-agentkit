"""Uniswap action provider implementation."""
import json
from typing import Any

from ...network import Network
from ...wallet_providers import EvmWalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider
from .schemas import UniswapQuoteInput
from .utils import get_uniswap_quote
from ..wow.constants import WOW_ABI


SUPPORTED_CHAINS = [8453, 84532]  # Base Mainnet and Base Sepolia chain IDs

class UniswapActionProvider(ActionProvider[EvmWalletProvider]):
    """Provides actions for interacting with Uniswap V3 protocol."""

    def __init__(self):
        """Initialize Uniswap action provider."""
        super().__init__("uniswap", [])

    @create_action(
        name="get_quote",
        description="""
This tool can only be used to get a quote for buying or selling tokens on Uniswap V3.
Do not use this tool for any other purpose, or for other DEXes.

Inputs:
- Token contract address
- Amount of tokens (in wei)
- Quote type ('buy' or 'sell')

Important notes:
- The amount is a string and cannot have any decimal points, since the unit of measurement is wei
- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action""",
        schema=UniswapQuoteInput,
    )
    def get_quote(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Get quote for buying or selling tokens on Uniswap V3.
        
        Args:
            args: The input arguments for the quote
            wallet: The wallet provider to use for contract calls

        Returns:
            str: A formatted string containing the quote details or error message
        """
        try:
            validated_args = UniswapQuoteInput(**args)
            
            # Get pool address from token contract
            pool_address = wallet_provider.read_contract(
                contract_address=validated_args.token_address,
                abi=WOW_ABI,
                function_name="poolAddress",
                args=[],
            )
            
            if not pool_address:
                return json.dumps(
                    {
                        "error": "Could not get pool address from token contract"
                    },
                    indent=2,
                )

            quote = get_uniswap_quote(
                wallet=wallet_provider,
                token_address=validated_args.token_address,
                amount=int(validated_args.amount),
                quote_type=validated_args.quote_type,
                pool_address=pool_address,
            )
            return json.dumps(
                {
                    "amount_in": str(quote.amount_in),
                    "amount_out": str(quote.amount_out),
                    "balance": {
                        "token0": quote.balance.token0,
                        "token1": quote.balance.token1,
                    } if quote.balance else None,
                    "fee": quote.fee,
                    "error": quote.error,
                },
                indent=2,
            )
        except Exception as error:
            return f"Error getting Uniswap quote: {error!s}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by Uniswap V3 protocol."""
        return True
        # return (
        #     network.protocol_family == "evm"
        #     and network.chain_id in SUPPORTED_CHAINS
        # )


def uniswap_action_provider() -> UniswapActionProvider:
    """Create a new UniswapActionProvider instance."""
    return UniswapActionProvider()
