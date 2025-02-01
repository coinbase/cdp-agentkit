import time
from decimal import Decimal
from collections.abc import Callable

from cdp import Asset, Wallet
from pydantic import BaseModel, Field
from web3 import Web3

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.aerodrome.constants import AERODROME_ROUTER_ABI, AERODROME_ROUTER_ADDRESS
from cdp_agentkit_core.actions.aerodrome.utils import get_lp_token_address, get_token_balance, get_reserves
from cdp_agentkit_core.actions.utils import approve

WITHDRAW_PROMPT = """
This tool allows removing liquidity from Aerodrome pools.
It takes:

- token_a: The address of the first token in the pair
- token_b: The address of the second token in the pair
- stable: Whether this is a stable or volatile pair (true/false)
- liquidity: The amount of LP tokens to remove
- amount_a_min: The minimum amount of first token to receive (for slippage protection)
- amount_b_min: The minimum amount of second token to receive (for slippage protection)
- to: The address that will receive the withdrawn tokens
- deadline: The timestamp deadline for the transaction (in seconds since Unix epoch)

Important notes:
- Make sure to use exact amounts provided. Do not convert units for amounts in this action.
- Please use token addresses (example 0x4200000000000000000000000000000000000006).
- Set reasonable minimum amounts to protect against slippage.
- The deadline should be a future timestamp (current time + some buffer, e.g., 20 minutes).
"""


class AerodromeRemoveLiquidityInput(BaseModel):
    """Input model for Aerodrome liquidity withdrawal."""
    token_a: str = Field(description="Address of the first token in the pair")
    token_b: str = Field(description="Address of the second token in the pair")
    stable: bool = Field(description="Whether this is a stable or volatile pair")
    liquidity: str = Field(description="Amount of LP tokens to remove")
    amount_a_min: str = Field(description="Minimum amount of first token to receive")
    amount_b_min: str = Field(description="Minimum amount of second token to receive")
    to: str = Field(description="Address that will receive the withdrawn tokens")
    deadline: str = Field(description="Timestamp deadline for the transaction")


def remove_liquidity(
    wallet: Wallet,
    token_a: str,
    token_b: str,
    stable: bool,
    liquidity: str,
    amount_a_min: str,
    amount_b_min: str,
    to: str,
    deadline: str,
) -> str:
    """Remove liquidity from an Aerodrome pool."""
    try:
        print("\nStarting remove_liquidity function...")
        
        # Convert addresses to checksum format
        token_a = Web3.to_checksum_address(token_a)
        token_b = Web3.to_checksum_address(token_b)
        to = Web3.to_checksum_address(to)

        # Get LP token address
        lp_token_address = get_lp_token_address(wallet, token_a, token_b, stable)
        if not lp_token_address:
            return "Error: Pool does not exist"

        print(f"LP token address: {lp_token_address}")

        # Convert amounts to atomic units
        lp_token_asset = Asset.fetch(wallet.network_id, lp_token_address)
        atomic_liquidity = int(lp_token_asset.to_atomic_amount(Decimal(liquidity)))
        atomic_amount_a_min = int(amount_a_min)
        atomic_amount_b_min = int(amount_b_min)

        print(f"\nAtomic values:")
        print(f"Liquidity: {atomic_liquidity}")
        print(f"Min amount A: {atomic_amount_a_min}")
        print(f"Min amount B: {atomic_amount_b_min}")

        # Approve router to spend LP tokens
        approve_result = approve(
            wallet=wallet,
            token_address=lp_token_address,
            spender=AERODROME_ROUTER_ADDRESS,
            amount=atomic_liquidity
        )
        
        if "Error" in approve_result:
            return f"Failed to approve router: {approve_result}"

        # Remove liquidity with JSON-serializable arguments
        remove_args = {
            "tokenA": token_a,
            "tokenB": token_b,
            "stable": stable,
            "liquidity": str(atomic_liquidity),
            "amountAMin": str(atomic_amount_a_min),
            "amountBMin": str(atomic_amount_b_min),
            "to": to,
            "deadline": str(int(deadline))
        }
        
        print(f"Calling removeLiquidity with args: {remove_args}")
        
        result = wallet.invoke_contract(
            contract_address=AERODROME_ROUTER_ADDRESS,
            method="removeLiquidity",
            abi=AERODROME_ROUTER_ABI,
            args=remove_args
        ).wait()
        
        if result.transaction_hash:
            return (
                f"Successfully removed liquidity with transaction hash: {result.transaction_hash}\n"
                f"Transaction link: {result.transaction_link}"
            )
        else:
            return f"Failed to remove liquidity: {result}"

    except Exception as e:
        return f"Error removing liquidity: {str(e)}"


class AerodromeRemoveLiquidityAction(CdpAction):
    """Aerodrome liquidity withdrawal action."""
    name: str = "aerodrome_remove_liquidity"
    description: str = WITHDRAW_PROMPT
    args_schema: type[BaseModel] = AerodromeRemoveLiquidityInput
    func: Callable[..., str] = remove_liquidity
