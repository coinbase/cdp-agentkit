from collections.abc import Callable

from cdp import SmartContract
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.cdp_action import CdpAction
from cdp_agentkit_core.actions.uniswap_v3.constants import (
    UNISWAP_V3_FACTORY_ABI,
    get_contract_address,
)

UNISWAP_V3_GET_POOL_PROMPT = """
This tool will get the pool contract address for Uniswap V3 pools that have been previously created. It takes in the networkId, the two token addresses, with the value 0x4200000000000000000000000000000000000006 for native gas token and a value like 0x1234567890123456789012345678901234567890 for ERC20 token. It also takes in the pool fee, which is denominated in hundredths of a bip (i.e. 1e-6). Acceptable fee values are 100, 500, 3000, and 10000. Supported networks are Base Sepolia, Base Mainnet, Ethereum Mainnet, Polygon Mainnet, and Arbitrum Mainnet.
"""


class UniswapV3GetPoolInput(BaseModel):
    """Input argument schema for get pool action."""

    network_id: str = Field(
        ...,
        description="The network ID of the network to get the pool on.",
    )
    token_a: str = Field(
        ...,
        description="The address of the first token to trade, e.g. 0x4200000000000000000000000000000000000006 for native gas token",
    )
    token_b: str = Field(
        ...,
        description="The address of the second token to trade, e.g. 0x1234567890123456789012345678901234567890 for ERC20 token",
    )
    fee: str = Field(
        ...,
        description="The fee to charge for trades, denominated in hundredths of a bip (i.e. 1e-6). Acceptable fee values are 100, 500, 3000, and 10000.",
    )


def uniswap_v3_get_pool(network_id: str, token_a: str, token_b: str, fee: str) -> str:
    """Get the pool contract address for Uniswap V3 pools that have been created.

    Args:
        network_id (str): The network ID of the network to get the pool on.
        token_a (str): The address of the first token to trade, e.g. 0x4200000000000000000000000000000000000006 for native gas token
        token_b (str): The address of the second token to trade, e.g. 0x1234567890123456789012345678901234567890 for ERC20 token
        fee (str): The fee to charge for trades, denominated in hundredths of a bip (i.e. 1e-6).

    Returns:
        str: A message containing the pool creation details.

    """
    factory_address = get_contract_address(network_id)

    pool_address = SmartContract.read(
        network_id=network_id,
        contract_address=factory_address,
        method="getPool",
        abi=UNISWAP_V3_FACTORY_ABI,
        args={"tokenA": token_a, "tokenB": token_b, "fee": fee},
    )

    return f"Pool contract address for {token_a} and {token_b} with fee {fee} on network {network_id} is {pool_address}."


class UniswapV3GetPoolAction(CdpAction):
    """Uniswap V3 get pool action."""

    name: str = "uniswap_v3_get_pool"
    description: str = UNISWAP_V3_GET_POOL_PROMPT
    args_schema: type[BaseModel] | None = UniswapV3GetPoolInput
    func: Callable[..., str] = uniswap_v3_get_pool
