from cdp import Wallet
from pydantic import BaseModel, Field

DEPLOY_TOKEN_PROMPT = """
This tool will deploy an ERC20 token smart contract. It takes the token name, symbol, and total supply as input. The token will be deployed using the wallet's default address as the owner and initial token holder.
"""


class DeployTokenInput(BaseModel):
    """Input argument schema for deploy token action."""

    name: str = Field(..., description='The name of the token (e.g., "My Token")')
    symbol: str = Field(..., description='The token symbol (e.g., "USDC", "MEME", "SYM")')
    total_supply: str = Field(
        ..., description='The total supply of tokens to mint (e.g., "1000000")'
    )


def deploy_token(wallet: Wallet, name: str, symbol: str, total_supply: str) -> str:
    """Deploy an ERC20 token smart contract.

    Args:
        wallet (wallet): The wallet to deploy the Token from.
        name (str): The name of the token (e.g., "My Token")
        symbol (str): The token symbol (e.g., "USDC", "MEME", "SYM")
        total_supply (str): The total supply of tokens to mint (e.g., "1000000")

    Returns:
        str: A message containing the deployed token contract address and details

    """
    token_contract = wallet.deploy_token(name=name, symbol=symbol, total_supply=total_supply)

    token_contract.wait()

    return f"Deployed ERC20 token contract {name} ({symbol}) with total supply of {total_supply} tokens at address {token_contract.contract_address}. Transaction link: {token_contract.transaction.transaction_link}"
