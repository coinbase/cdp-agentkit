from collections.abc import Callable

from cdp import SmartContract
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.cdp_action import CdpAction
from cdp_agentkit_core.actions.uniswap_v3.constants import (
    UNISWAP_V3_POOL_ABI,
)

UNISWAP_V3_GET_POOL_LIQUIDITY_PROMPT = """
This tool will get the liquidity for Uniswap V3 pools that have been previously created. It takes in the networkId and the pool contract address. Supported networks are Base Sepolia, Base Mainnet, Ethereum Mainnet, Polygon Mainnet, and Arbitrum Mainnet.
"""


class UniswapV3GetPoolLiquidityInput(BaseModel):
    """Input argument schema for get pool liquidity action."""

    network_id: str = Field(
        ...,
        description="The network ID of the network to get the pool on.",
    )
    pool_contract_address: str = Field(
        ...,
        description="The contract address of the pool to get the liquidity for.",
    )


def uniswap_v3_get_pool_liquidity(network_id: str, pool_contract_address: str) -> str:
    """Get the liquidity for Uniswap V3 pools that have been created.

    Args:
        network_id (str): The network ID of the network to get the pool on.
        pool_contract_address (str): The contract address of the pool to get the liquidity for.

    Returns:
        str: A message containing the liquidity for the pool.

    """
    liquidity = SmartContract.read(
        network_id=network_id,
        contract_address=pool_contract_address,
        method="liquidity",
        abi=UNISWAP_V3_POOL_ABI,
        args={},
    )

    return f"Liquidity for pool {pool_contract_address} is {liquidity}."


class UniswapV3GetPoolLiquidityAction(CdpAction):
    """Uniswap V3 get pool liquidity action."""

    name: str = "uniswap_v3_get_pool_liquidity"
    description: str = UNISWAP_V3_GET_POOL_LIQUIDITY_PROMPT
    args_schema: type[BaseModel] | None = UniswapV3GetPoolLiquidityInput
    func: Callable[..., str] = uniswap_v3_get_pool_liquidity
