from cdp import Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.uniswap_v3.constants import UNISWAP_V3_FACTORY_ABI

CREATE_POOL_PROMPT = """
This tool will create a Uniswap v3 pool for trading 2 tokens, one of which can be the native gas token. For native gas token, use the address 0x4200000000000000000000000000000000000006. This tool takes the address of the first token, address of the second token, and the fee to charge for trades as inputs. The fee is denominated in hundredths of a bip (i.e. 1e-6) and must be passed a string. Acceptable fee values are 100, 500, 3000, and 10000."""


class CreatePoolInput(BaseModel):
    """Input argument schema for create pool action."""

    token_a: str = Field(
        ...,
        description="The address of the first token to trade`",
    )
    token_b: str = Field(
        ...,
        description="The address of the second token to trade`",
    )
    fee: str = Field(
        ...,
        description="The fee to charge for trades, denominated in hundredths of a bip (i.e. 1e-6)",
    )


def create_pool(wallet: Wallet, token_a: str, token_b: str, fee: str) -> str:
    """Create a Uniswap v3 pool for trading 2 tokens, one of which can be the native gas token.

    Args:
        wallet (Wallet): The wallet to create the pool from.
        token_a (str): The address of the first token to trade.
        token_b (str): The address of the second token to trade.
        fee (str): The fee to charge for trades, denominated in hundredths of a bip (i.e. 1e-6).

    Returns:
        str: A message containing the pool creation details.

    """
    pool = wallet.invoke_contract(
        contract_address="0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",  # TODO - set this based on network id
        method="createPool",
        abi=UNISWAP_V3_FACTORY_ABI,
        args={
            "tokenA": token_a,
            "tokenB": token_b,
            "fee": fee,
        },
    ).wait()
    return f"Created pool for {token_a} and {token_b} with fee {fee} on network {wallet.network_id}.\nTransaction hash for the pool creation: {pool.transaction.transaction_hash}\nTransaction link for the pool creation: {pool.transaction.transaction_link}"
