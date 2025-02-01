from collections.abc import Callable
from decimal import Decimal

from cdp import Asset, Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.aerodrome.constants import AERODROME_ROUTER_ABI, AERODROME_ROUTER_ADDRESS
from cdp_agentkit_core.actions.utils import approve


class AerodromeAddLiquidityInput(BaseModel):
    """Input schema for Aerodrome liquidity deposit action."""

    token_a: str = Field(..., description="The address of the first token in the pair")
    token_b: str = Field(..., description="The address of the second token in the pair")
    stable: bool = Field(..., description="Whether this is a stable or volatile pair")
    amount_a_desired: str = Field(..., description="The amount of first token to add as liquidity")
    amount_b_desired: str = Field(..., description="The amount of second token to add as liquidity")
    amount_a_min: str = Field(..., description="The minimum amount of first token to add as liquidity")
    amount_b_min: str = Field(..., description="The minimum amount of second token to add as liquidity")
    to: str = Field(..., description="The address that will receive the liquidity tokens")
    deadline: str = Field(..., description="The timestamp deadline for the transaction to be executed by")


DEPOSIT_PROMPT = """
This tool allows adding liquidity to Aerodrome pools.
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
- amount_a_min: The minimum amount of first token (to protect against slippage)
- amount_b_min: The minimum amount of second token (to protect against slippage)
- to: The address to receive the LP tokens
- deadline: The timestamp deadline for the transaction (in seconds since Unix epoch)

Important notes:
- Make sure to use exact amounts provided. Do not convert units for amounts in this action.
- Please use token addresses (example 0x4200000000000000000000000000000000000006). If unsure of token addresses, please clarify before continuing.
- The deadline should be a future timestamp (current time + some buffer, e.g., 20 minutes)
- For stable pairs, the ratio between tokens should be close to 1:1 in USD value
"""


def deposit(
    wallet: Wallet,
    token_a: str,
    token_b: str,
    stable: bool,
    amount_a_desired: str,
    amount_b_desired: str,
    amount_a_min: str,
    amount_b_min: str,
    to: str,
    deadline: str,
) -> str:
    """Add liquidity to an Aerodrome pool.

    Args:
        wallet (Wallet): The wallet to execute the deposit from
        token_a (str): The address of the first token
        token_b (str): The address of the second token
        stable (bool): Whether this is a stable or volatile pair
        amount_a_desired (str): The desired amount of first token to add
        amount_b_desired (str): The desired amount of second token to add
        amount_a_min (str): The minimum amount of first token to add
        amount_b_min (str): The minimum amount of second token to add
        to (str): The address to receive LP tokens
        deadline (str): The timestamp deadline for the transaction

    Returns:
        str: A success message with transaction hash or error message
    """
    try:
        # Validate inputs
        if float(amount_a_desired) <= 0 or float(amount_b_desired) <= 0:
            return "Error: Desired amounts must be greater than 0"

        if float(amount_a_min) <= 0 or float(amount_b_min) <= 0:
            return "Error: Minimum amounts must be greater than 0"

        # Convert amounts to atomic units
        token_a_asset = Asset.fetch(wallet.network_id, token_a)
        token_b_asset = Asset.fetch(wallet.network_id, token_b)

        atomic_amount_a_desired = str(int(token_a_asset.to_atomic_amount(Decimal(amount_a_desired))))
        atomic_amount_b_desired = str(int(token_b_asset.to_atomic_amount(Decimal(amount_b_desired))))
        atomic_amount_a_min = str(int(token_a_asset.to_atomic_amount(Decimal(amount_a_min))))
        atomic_amount_b_min = str(int(token_b_asset.to_atomic_amount(Decimal(amount_b_min))))

        #  atomic_amount_a_approved = str(int(token_a_asset.to_atomic_amount(Decimal(amount_a_desired)*Decimal(10))))
        #  atomic_amount_b_approved = str(int(token_b_asset.to_atomic_amount(Decimal(amount_b_desired) * Decimal(10))))

        # Approve router for both tokens
        approval_a = approve(wallet, token_a, AERODROME_ROUTER_ADDRESS, atomic_amount_a_desired)
        if approval_a.startswith("Error"):
            return f"Error approving token A: {approval_a}"

        approval_b = approve(wallet, token_b, AERODROME_ROUTER_ADDRESS, atomic_amount_b_desired)
        if approval_b.startswith("Error"):
            return f"Error approving token B: {approval_b}"

        print(f"\ndesired a: {atomic_amount_a_desired}\ndesired b: {atomic_amount_b_desired}")
        print(f"\nmin a: {atomic_amount_a_min}\nmin b: {atomic_amount_b_min}")
        add_liquidity_args = {
            "tokenA": token_a,
            "tokenB": token_b,
            "stable": stable,
            "amountADesired": atomic_amount_a_desired,
            "amountBDesired": atomic_amount_b_desired,
            "amountAMin": atomic_amount_a_min,
            "amountBMin": atomic_amount_b_min,
            "to": to,
            "deadline": deadline,
        }

        invocation = wallet.invoke_contract(
            contract_address=AERODROME_ROUTER_ADDRESS,
            method="addLiquidity",
            abi=AERODROME_ROUTER_ABI,
            args=add_liquidity_args,
        ).wait()

        return f"Added liquidity to Aerodrome pool with transaction hash: {invocation.transaction_hash} and transaction link: {invocation.transaction_link}"

    except Exception as e:
        return f"Error adding liquidity to Aerodrome: {e!s}"


class AerodromeAddLiquidityAction(CdpAction):
    """Aerodrome liquidity deposit action."""

    name: str = "aerodrome_add_liquidity"
    description: str = DEPOSIT_PROMPT
    args_schema: type[BaseModel] = AerodromeAddLiquidityInput
    func: Callable[..., str] = deposit
