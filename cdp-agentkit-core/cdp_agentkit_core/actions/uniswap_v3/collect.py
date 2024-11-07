from cdp import Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.uniswap_v3.constants import UNISWAP_V3_POOL_ABI

UNISWAP_V3_COLLECT_PROMPT = """
This tool will collect tokens from a Uniswap v3 pool. This tool takes the pool address, recipient address, tickLower, tickUpper, amount0 requested for token0, and amount1 requested for token1 as inputs. tickLower is the lower tick of the position for which to collect fees, while tickUppwer is the upper tick of the position for which to collect fees."""


class UniswapV3CollectInput(BaseModel):
    """Input argument schema for collect action."""

    pool_address: str = Field(
        ...,
        description="The address of the pool to collect from.",
    )
    recipient_address: str = Field(
        ...,
        description="The address of the recipient of the collected tokens.",
    )
    tick_lower: str = Field(
        ...,
        description="The lower tick of the position for which to collect fees.",
    )
    tick_upper: str = Field(
        ...,
        description="The upper tick of the position for which to collect fees.",
    )
    amount0_requested: str = Field(
        ...,
        description="The amount of token0 requested for collection.",
    )
    amount1_requested: str = Field(
        ...,
        description="The amount of token1 requested for collection.",
    )


def uniswap_v3_collect(
    wallet: Wallet,
    pool_address: str,
    recipient_address: str,
    tick_lower: str,
    tick_upper: str,
    amount0_requested: str,
    amount1_requested: str,
) -> str:
    """Collect tokens from a Uniswap v3 pool.

    Args:
        wallet (Wallet): The wallet to collect tokens from.
        pool_address (str): The address of the pool to collect from.
        recipient_address (str): The address of the recipient of the collected tokens.
        tick_lower (str): The lower tick of the position for which to collect fees.
        tick_upper (str): The upper tick of the position for which to collect fees.
        amount0_requested (str): The amount of token0 requested for collection.
        amount1_requested (str): The amount of token1 requested for collection.

    Returns:
        str: A message containing the details of the collected tokens.

    """
    pool = wallet.invoke_contract(
        contract_address=pool_address,
        method="collect",
        abi=UNISWAP_V3_POOL_ABI,
        args={
            "recipient": recipient_address,
            "tickLower": tick_lower,
            "tickUpper": tick_upper,
            "amount0Requested": amount0_requested,
            "amount1Requested": amount1_requested,
        },
    ).wait()
    return f"Requested collection of {amount0_requested} of token0 and {amount1_requested} of token1 from pool {pool_address}.\nTransaction hash for the collection: {pool.transaction.transaction_hash}\nTransaction link for the collection: {pool.transaction.transaction_link}"
