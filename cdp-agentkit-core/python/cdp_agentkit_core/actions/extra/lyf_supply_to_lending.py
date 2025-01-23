from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction
from .helper import (get_pool_token_address, get_balance_of, get_decimals_of, token_addresses, lyf_addresses,
                     LYF_LENDING_POOL_ABI)

EXTRA_LYF_SUPPLY_TO_LENDING_PROMPT = """
This tool facilitates supplying capital to the Extrafi LYF Lending Pool through a series of on-chain operations to earn interests.

Inputs:

- Pool id: Users typically provide the token symbol. You should use tool ExtrafiLYFListLending to retrieve the Pool id. If multiple pool ids exist for the same symbol, choose the one with the highest APR.
- Amount: Amount: Specify the token amount as a string (e.g., "1000.01" for USDC or "0.00001" for ETH). The tool will automatically scale this value to the appropriate unit, such as ERC20 decimals or Ethereum's wei.

Important Notes:

- Network Support: Only supported on the following networks:
  - Base Mainnet (i.e., 'base', 'base-mainnet')
- This tool belongs to the Extrafi LYF Lending series
- WETH Pool Selection: If a WETH pool is selected and the user does not have sufficient WETH, the tool will assist in wrapping ETH to WETH automatically, do not ask user to swap or wrap first.
- When returning blockchain explorer url, use https://basescan.org/tx/ as the prefix.
"""


class ExtrafiLYFSupplyToLendingInput(BaseModel):
    """Input argument schema for LYF supply to lending pool action."""
    pool_id: str = Field(
        ...,
        description="The pool id of the LYF Lending Pool as a string representation of an integer, e.g., '20'",
    )
    amount: str = Field(
        ...,
        description="The amount without decimals to supply to the LYF Lending Pool as a string representation of a float, e.g., '10.01'",
    )


def lyf_supply_to_lending(wallet: Wallet, pool_id: str, amount: str) -> str:
    """Supply capital to the LYF lending pool.

    Returns:
        str: A message containing the result of supplying.
    """

    # Get the token address of the pool
    token_address = get_pool_token_address(wallet, pool_id)
    if token_address is None:
        return "Error: Failed to retrieve the token address of the pool.\n"

    # get the balance and decimals
    decimals = get_decimals_of(wallet, token_address)
    if decimals is None:
        return "Error: Failed to retrieve the decimals of the token.\n"
    balance = get_balance_of(wallet, token_address, wallet.default_address)
    if balance is None:
        return "Error: Failed to retrieve the user balance of the token.\n"

    # Convert the amount to the decimal value
    wrap_eth = False
    amount_with_decimals = int(float(amount) * 10 ** decimals)
    if amount_with_decimals > balance:
        if token_address != token_addresses["base-mainnet"]["WETH"]:
            return "Error: Insufficient balance to supply to the pool.\n"
        else:
            eth_balance = wallet.balance("wei")
            if amount_with_decimals >= eth_balance:
                return "Error: Insufficient ETH balance to wrap to WETH.\n"
            else:
                wrap_eth = True

    # Supply to the pool
    try:
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]
        if wrap_eth:
            invocation = wallet.invoke_contract(
                contract_address=lending_pool_address,
                method="depositAndStake",
                abi=LYF_LENDING_POOL_ABI,
                args={
                    "reserveId": pool_id,
                    "amount": str(amount_with_decimals),
                    "onBehalfOf": wallet.default_address.address_id,
                    "referralCode": "0",
                },
                amount=str(amount_with_decimals),
                asset_id="wei"
            ).wait()
            return f"Supplied to lending pool with transaction hash: {invocation.transaction.transaction_hash}\n"
        else:
            invocation = wallet.invoke_contract(
                contract_address=lending_pool_address,
                method="depositAndStake",
                abi=LYF_LENDING_POOL_ABI,
                args={
                    "reserveId": pool_id,
                    "amount": str(amount_with_decimals),
                    "onBehalfOf": wallet.default_address.address_id,
                    "referralCode": "0",
                }
            ).wait()
            return f"Supplied to lending pool with transaction hash: {invocation.transaction.transaction_hash}\n"

    except Exception as e:
        return f"Error supplying to the pool {e!s}\n"


class ExtrafiLYFSupplyToLendingAction(CdpAction):
    """Supply to Extrafi LYF lending pools action."""

    name: str = "extrafi_lyf_supply_to_lending_action"
    description: str = EXTRA_LYF_SUPPLY_TO_LENDING_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFSupplyToLendingInput
    func: Callable[..., str] = lyf_supply_to_lending
