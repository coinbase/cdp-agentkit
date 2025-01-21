from collections.abc import Callable

from cdp import Wallet
from pydantic import BaseModel, Field
from typing import Any

from cdp_agentkit_core.actions import CdpAction


DEPLOY_CONTRACT_PROMPT = """
This tool will deploy an arbitrary smart contract. It takes 3 required arguments: solidity compiler version which is a string, solidity input json which is a string, 
contract name which is a string, and 1 optional argument: constructor arguments which is a map of string to any.
The solidity version must be 0.8.+, such as "0.8.28+commit.7893614a" which is the latest version. See https://binaries.soliditylang.org/bin/list.json for valid versions.
The input json must be a valid solidity input json. See https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description for more details. If you 
depend on a library, make sure to include the library source code as separate sources inline in the input json.
For the settings outputSelection in the input JSON, make sure to have a string array including the abi and evm.bytecode.
The contract name must be the name of the contract class to be deployed.
The constructor arguments, if passed in, must be a map of constructor arguments for the contract, where the key is the argument name and the value is the argument value.
uint, int, bytes, fixed bytes, string, address should be encoded as strings. Boolean values should be encoded as true or false.
For arrays and tuples, the values should be encoded depending on the underlying type contained in the array or tuple.
"""


class DeployContractInput(BaseModel):
    """Input argument schema for deploy token action."""

    solidity_version: str = Field(..., description='The solidity compiler version')
    solidity_input_json: str = Field(..., description='The input json for the solidity compiler')
    contract_name: str = Field(..., description='The name of the contract class to be deployed')
    constructor_args: dict[str, Any] = Field(
        ..., description='The constructor arguments for the contract'
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
    try:
        token_contract = wallet.deploy_token(name=name, symbol=symbol, total_supply=total_supply)

        token_contract.wait()
    except Exception as e:
        return f"Error deploying token {e!s}"

    return f"Deployed ERC20 token contract {name} ({symbol}) with total supply of {total_supply} tokens at address {token_contract.contract_address}. Transaction link: {token_contract.transaction.transaction_link}"


class DeployTokenAction(CdpAction):
    """Deploy token action."""

    name: str = "deploy_token"
    description: str = DEPLOY_TOKEN_PROMPT
    args_schema: type[BaseModel] | None = DeployTokenInput
    func: Callable[..., str] = deploy_token
