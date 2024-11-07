from collections.abc import Callable

from cdp import SmartContract
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.cdp_action import CdpAction
from cdp_agentkit_core.actions.uniswap_v3.constants import (
    UNISWAP_V3_POOL_ABI,
)

UNISWAP_V3_GET_POOL_OBSERVE_PROMPT = """
This tool will get the observation details for Uniswap V3 pools that have been previously created. It takes in a network ID, pool contract address, and list of secondsAgo values and returns the tickCumulative and secondsPerLiquidityCumulativeX128 for each secondsAgo value.
The tickCumulative is the tick multiplied by seconds elapsed for the life of the pool as of the observation timestamp.
The secondsPerLiquidityCumulativesX128 is the seconds per in range liquidity for the life of the pool as of the observation timestamp.
Supported networks are Base Sepolia, Base Mainnet, Ethereum Mainnet, Polygon Mainnet, and Arbitrum Mainnet.
"""


class UniswapV3GetPoolObserveInput(BaseModel):
    """Input argument schema for get pool observe action."""

    network_id: str = Field(
        ...,
        description="The network ID of the network to get the pool on.",
    )
    pool_contract_address: str = Field(
        ...,
        description="The contract address of the pool to get the slot0 for.",
    )
    seconds_ago: list[str] = Field(
        ...,
        description="The list of seconds ago values to get the observation for. The seconds ago value is the number of seconds ago from the current block timestamp to get the observation for and is provided as a string.",
    )


def uniswap_v3_get_pool_observe(
    network_id: str, pool_contract_address: str, seconds_ago: list[str]
) -> str:
    """Get the observation for Uniswap V3 pools that have been created.

    Args:
        network_id (str): The network ID of the network to get the pool on.
        pool_contract_address (str): The contract address of the pool to get the observation for.
        seconds_ago (List[str]): The list of seconds ago values to get the observation for. The seconds ago value is the number of seconds ago from the current block timestamp to get the observation for and is provided as a string.

    Returns:
        str: A message containing the observation details for the pool.

    """
    observations = SmartContract.read(
        network_id=network_id,
        contract_address=pool_contract_address,
        method="observe",
        abi=UNISWAP_V3_POOL_ABI,
        args={"secondsAgos": seconds_ago},
    )

    return f"Observations for pool {pool_contract_address} are {observations}."


class UniswapV3GetPoolObserveAction(CdpAction):
    """Uniswap V3 get pool observe action."""

    name: str = "uniswap_v3_get_pool_observe"
    description: str = UNISWAP_V3_GET_POOL_OBSERVE_PROMPT
    args_schema: type[BaseModel] | None = UniswapV3GetPoolObserveInput
    func: Callable[..., str] = uniswap_v3_get_pool_observe
