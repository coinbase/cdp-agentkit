from collections.abc import Callable

from cdp import Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.uniswap_v3.constants import (
    UNISWAP_V3_FACTORY_ABI,
    get_contract_address,
)

UNISWAP_V3_CREATE_POOL_PROMPT = """
This tool will create a Uniswap v3 pool for trading 2 tokens, one of which can be the native gas token. For native gas token, use the address 0x4200000000000000000000000000000000000006, and for ERC20 token, use its contract address. This tool takes the address of the first token, address of the second token, and the fee to charge for trades as inputs. The fee is denominated in hundredths of a bip (i.e. 1e-6) and must be passed a string. Acceptable fee values are 100, 500, 3000, and 10000. Supported networks are Base Sepolia, Base Mainnet, Ethereum Mainnet, Polygon Mainnet, and Arbitrum Mainnet."""


class UniswapV3CreatePoolInput(BaseModel):
    """Input argument schema for create pool action."""

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


def uniswap_v3_create_pool(wallet: Wallet, token_a: str, token_b: str, fee: str) -> str:
    """Create a Uniswap v3 pool for trading 2 tokens, one of which can be the native gas token.

    Args:
        wallet (Wallet): The wallet to create the pool from.
        token_a (str): The address of the first token to trade, e.g. 0x4200000000000000000000000000000000000006 for native gas token
        token_b (str): The address of the second token to trade, e.g. 0x1234567890123456789012345678901234567890 for ERC20 token
        fee (str): The fee to charge for trades, denominated in hundredths of a bip (i.e. 1e-6).

    Returns:
        str: A message containing the pool creation details.

    """
    factory_address = get_contract_address(wallet.network_id)

    pool = wallet.invoke_contract(
        contract_address=factory_address,
        method="createPool",
        abi=UNISWAP_V3_FACTORY_ABI,
        args={
            "tokenA": token_a,
            "tokenB": token_b,
            "fee": fee,
        },
    ).wait()
    return f"Created pool for {token_a} and {token_b} with fee {fee} on network {wallet.network_id}.\nTransaction hash for the pool creation: {pool.transaction.transaction_hash}\nTransaction link for the pool creation: {pool.transaction.transaction_link}"


class UniswapV3CreatePoolAction(CdpAction):
    """Uniswap V3 create pool action."""

    name: str = "uniswap_v3_create_pool"
    description: str = UNISWAP_V3_CREATE_POOL_PROMPT
    args_schema: type[BaseModel] | None = UniswapV3CreatePoolInput
    func: Callable[..., str] = uniswap_v3_create_pool
