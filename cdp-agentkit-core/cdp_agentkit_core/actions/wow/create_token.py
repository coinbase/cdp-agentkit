from collections.abc import Callable

from cdp import Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.wow.constants import (
    GENERIC_TOKEN_METADATA_URI,
    WOW_FACTORY_ABI,
    get_factory_address,
)

WOW_CREATE_TOKEN_PROMPT = """
This tool will create a Zora Wow ERC20 memecoin using the WoW factory. This tool takes the token name, token symbol, and optionally a token URI containing metadata about the token. It uses a bonding curve so there is no need to add liquidity to the pool upfront. It is only supported on Base Sepolia and Base Mainnet.
"""


class WowCreateTokenInput(BaseModel):
    """Input argument schema for create token action."""

    name: str = Field(
        ...,
        description="The name of the token to create, e.g. WowCoin",
    )
    symbol: str = Field(
        ...,
        description="The symbol of the token to create, e.g. WOW",
    )
    token_uri: str = Field(
        default=None,
        description="The URI of the token metadata to store on IPFS, e.g. ipfs://QmY1GqprFYvojCcUEKgqHeDj9uhZD9jmYGrQTfA9vAE78J",
    )


def wow_create_token(wallet: Wallet, name: str, symbol: str, token_uri: str | None = None) -> str:
    """Create a Zora Wow ERC20 memecoin.

    Args:
        wallet (Wallet): The wallet to create the token from.
        name (str): The name of the token to create.
        symbol (str): The symbol of the token to create.
        token_uri (str | None): The URI of the token metadata to store on IPFS e.g. ipfs://QmY1GqprFYvojCcUEKgqHeDj9uhZD9jmYGrQTfA9vAE78J.

    Returns:
        str: A message containing the token creation details.

    """
    factory_address = get_factory_address(wallet.network_id)

    try:
        invocation = wallet.invoke_contract(
            contract_address=factory_address,
            method="deploy",
            abi=WOW_FACTORY_ABI,
            args={
                "_tokenCreator": wallet.default_address.address_id,
                "_platformReferrer": "0x0000000000000000000000000000000000000000",
                "_tokenURI": token_uri or GENERIC_TOKEN_METADATA_URI,
                "_name": name,
                "_symbol": symbol,
            },
        ).wait()
    except Exception as e:
        return f"Error creating Zora Wow ERC20 memecoin {e!s}"

    return f"Created WoW ERC20 memecoin {name} with symbol {symbol} on network {wallet.network_id}.\nTransaction hash for the token creation: {invocation.transaction.transaction_hash}\nTransaction link for the token creation: {invocation.transaction.transaction_link}"


class WowCreateTokenAction(CdpAction):
    """Zora Wow create token action."""

    name: str = "wow_create_token"
    description: str = WOW_CREATE_TOKEN_PROMPT
    args_schema: type[BaseModel] | None = WowCreateTokenInput
    func: Callable[..., str] = wow_create_token
