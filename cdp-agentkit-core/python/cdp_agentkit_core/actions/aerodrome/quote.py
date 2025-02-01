from collections.abc import Callable
from decimal import Decimal

from cdp import Asset, Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.aerodrome.constants import AERODROME_FACTORY_ADDRESS
from cdp_agentkit_core.actions.aerodrome.utils import quote_add_liquidity


class AerodromeQuoteAddLiquidityInput(BaseModel):
    """Input schema for Aerodrome liquidity quote action."""

    token_a: str = Field(..., description="The address of the first token in the pair")
    token_b: str = Field(..., description="The address of the second token in the pair")
    stable: bool = Field(..., description="Whether this is a stable or volatile pair")
    amount_a_desired: str = Field(..., description="The amount of first token to add as liquidity")
    amount_b_desired: str = Field(..., description="The amount of second token to add as liquidity")


QUOTE_PROMPT = """
This tool allows getting a quote for adding liquidity to Aerodrome pools.
It takes:

- token_a: The address of the first token in the pair
- token_b: The address of the second token in the pair
- stable: Whether this is a stable or volatile pair (true/false)
- amount_a_desired: The amount of first token to add as liquidity in whole units
    Examples:
    - 1 TOKEN
    - 0.1 TOKEN
    - 0.01 TOKEN
- amount_b_desired: The amount of second token to add as liquidity in whole units

Important notes:
- Make sure to use exact amounts provided. Do not convert units for amounts in this action.
- Please use token addresses (example 0x4200000000000000000000000000000000000006).
- For stable pairs, the ratio between tokens should be close to 1:1 in USD value
"""


def quote_add_liquidity_action(
    wallet: Wallet,
    token_a: str,
    token_b: str,
    stable: bool,
    amount_a_desired: str,
    amount_b_desired: str,
) -> str:
    """Get a quote for adding liquidity to an Aerodrome pool.

    Args:
        wallet (Wallet): The wallet to execute the quote from
        token_a (str): The address of the first token
        token_b (str): The address of the second token
        stable (bool): Whether this is a stable or volatile pair
        amount_a_desired (str): The desired amount of first token to add
        amount_b_desired (str): The desired amount of second token to add

    Returns:
        str: A success message with quote details or error message
    """
    try:
        # Validate inputs
        if float(amount_a_desired) <= 0 or float(amount_b_desired) <= 0:
            return "Error: Desired amounts must be greater than 0"

        # Convert amounts to atomic units
        token_a_asset = Asset.fetch(wallet.network_id, token_a)
        token_b_asset = Asset.fetch(wallet.network_id, token_b)

        atomic_amount_a_desired = int(token_a_asset.to_atomic_amount(Decimal(amount_a_desired)))
        atomic_amount_b_desired = int(token_b_asset.to_atomic_amount(Decimal(amount_b_desired)))

        # Get quote using utility function
        amount_a, amount_b, liquidity = quote_add_liquidity(
            wallet=wallet,
            token_a=token_a,
            token_b=token_b,
            stable=stable,
            factory=AERODROME_FACTORY_ADDRESS,
            amount_a_desired=atomic_amount_a_desired,
            amount_b_desired=atomic_amount_b_desired
        )

        # Convert atomic amounts back to human readable
        human_amount_a = token_a_asset.from_atomic_amount(amount_a)
        human_amount_b = token_b_asset.from_atomic_amount(amount_b)

        return (
            f"Quote for adding liquidity to Aerodrome pool:\n"
            f"Token A amount: {human_amount_a}\n"
            f"Token B amount: {human_amount_b}\n"
            f"Expected liquidity tokens: {liquidity}"
        )

    except Exception as e:
        return f"Error getting quote from Aerodrome: {e!s}"


class AerodromeQuoteAddLiquidityAction(CdpAction):
    """Aerodrome liquidity quote action."""

    name: str = "aerodrome_quote_add_liquidity"
    description: str = QUOTE_PROMPT
    args_schema: type[BaseModel] = AerodromeQuoteAddLiquidityInput
    func: Callable[..., str] = quote_add_liquidity_action
