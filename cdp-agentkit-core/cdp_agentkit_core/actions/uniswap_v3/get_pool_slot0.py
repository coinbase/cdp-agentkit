from collections.abc import Callable

from cdp import SmartContract
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.cdp_action import CdpAction
from cdp_agentkit_core.actions.uniswap_v3.constants import (
    UNISWAP_V3_POOL_ABI,
)

UNISWAP_V3_GET_POOL_SLOT0_PROMPT = """
This tool will get the slot0 for Uniswap V3 pools. It takes in a networkId and pool contract address. The slot0 contains the sqrtPriceX96, tick, observationIndex, observationCardinality, observationCardinalityNext, feeProtocol, and unlocked.
The sqrtPriceX96 is the current price of the pool as a sqrt(token1/token0) Q64.96 value.
The tick is the current tick, based on the last transition that was run. This value may not always equal SqrtTickMath getTickAtSqrtRatio(sqrtPriceX96) if the price is on a tick boundary.
The observationIndex is the index of the last oracle observation. The observationCardinality is the maximum number of observations stored.
The observationCardinalityNext is the next maximum number of observations. The feeProtocol is the current fee as a percentage of the swap fee taken on withdrawal.
The unlocked is whether the pool is currently locked to reentrancy. Supported networks are Base Sepolia, Base Mainnet, Ethereum Mainnet, Polygon Mainnet, and Arbitrum Mainnet.
"""


class UniswapV3GetPoolSlot0Input(BaseModel):
    """Input argument schema for get pool slot0 action."""

    network_id: str = Field(
        ...,
        description="The network ID of the network to get the pool on.",
    )
    pool_contract_address: str = Field(
        ...,
        description="The contract address of the pool to get the slot0 for.",
    )


def uniswap_v3_get_pool_slot0(network_id: str, pool_contract_address: str) -> str:
    """Get the slot0 for Uniswap V3 pools that have been created.

    Args:
        network_id (str): The network ID of the network to get the pool on.
        pool_contract_address (str): The contract address of the pool to get the liquidity for.

    Returns:
        str: A message containing the slot0 details for the pool.

    """
    slot0 = SmartContract.read(
        network_id=network_id,
        contract_address=pool_contract_address,
        method="slot0",
        abi=UNISWAP_V3_POOL_ABI,
        args={},
    )

    return f"Slot0 for pool {pool_contract_address} is {slot0}."


class UniswapV3GetPoolSlot0Action(CdpAction):
    """Uniswap V3 get pool slot0 action."""

    name: str = "uniswap_v3_get_pool_slot0"
    description: str = UNISWAP_V3_GET_POOL_SLOT0_PROMPT
    args_schema: type[BaseModel] | None = UniswapV3GetPoolSlot0Input
    func: Callable[..., str] = uniswap_v3_get_pool_slot0
