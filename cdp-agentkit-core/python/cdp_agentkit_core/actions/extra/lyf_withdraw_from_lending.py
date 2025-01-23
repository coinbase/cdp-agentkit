from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction
from .helper import (get_lyf_lending_pool_positions, get_pool_token_address, get_decimals_of, lyf_addresses,
                     LYF_LENDING_POOL_ABI)

EXTRA_LYF_WITHDRAW_FROM_LENDING_PROMPT = """
This tool is used to withdraw funds from an existing position in the Extrafi LYF Lending Pool, provided that the user has previously supplied funds to the respective lending pool.

Inputs:

- Pool id: Users typically provide the token symbol. You should use the ExtrafiLYFGetLendingPositionsAction tool to find the corresponding pool id.
- Amount: Specify the token amount as a string (e.g., "1000.01" for USDC or "0.00001" for ETH). The amount must not exceed the amount in the corresponding position reported by the ExtrafiLYFGetLendingPositionsAction tool. The tool will automatically scale this value to the appropriate unit, such as ERC20 decimals or Ethereum's wei.

Important Notes:

- Only supported on the following networks:
  - Base Mainnet (i.e., 'base', 'base-mainnet')
- This tool belongs to the Extrafi LYF Lending series
- When returning blockchain explorer url, use https://basescan.org/tx/ as the prefix.
"""


class ExtrafiLYFWithdrawFromLendingInput(BaseModel):
    """Input argument schema for LYF withdraw from lending pool action."""
    pool_id: str = Field(
        ...,
        description="The pool id of the LYF Lending Pool as a string representation of an integer, e.g., '20'",
    )
    amount: str = Field(
        ...,
        description="The amount without decimals to supply to the LYF Lending Pool as a string representation of a float, e.g., '10.01'",
    )


def get_etoken_amount(total_liquidity: int, etoken_staked: int, decimals: int, amount: str) -> int | None:
    """Get the amount of eToken to withdraw from the pool."""
    try:
        # Convert the amount to the decimal value
        amount_with_decimals = int(float(amount) * 10 ** decimals)
        if amount_with_decimals > total_liquidity:
            return None
        quote = float(amount_with_decimals) / float(total_liquidity)
        if quote > 0.9:
            return etoken_staked
        etoken_amount = int(amount_with_decimals * etoken_staked / total_liquidity)
        if etoken_amount > etoken_staked:
            return etoken_staked
        return etoken_amount
    except Exception as e:
        return None


def lyf_withdraw_from_lending(wallet: Wallet, pool_id: str, amount: str) -> str:
    """Withdraw funds from the LYF lending pool.

    Returns:
        str: A message containing the result of withdrawing.
    """

    # Get user positions
    positions = get_lyf_lending_pool_positions(wallet, [pool_id])
    if positions is None:
        return ("Error: Failed to retrieve the user positions in the LYF lending pool. "
                "User may not have such position in this pool id.\n")

    position = positions[0]

    # Get the token address of the pool
    token_address = get_pool_token_address(wallet, pool_id)
    if token_address is None:
        return "Error: Failed to retrieve the token address of the pool.\n"

    # get the decimals
    decimals = get_decimals_of(wallet, token_address)
    if decimals is None:
        return "Error: Failed to retrieve the decimals of the token.\n"

    # Get the amount of eToken to withdraw
    etoken_amount = get_etoken_amount(position["liquidity"], position["eTokenStaked"], decimals, amount)
    if etoken_amount is None:
        return "Error: Failed to calculate the eToken amount to withdraw. Please check the amount.\n"

    # Withdraw from the pool
    try:
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]
        invocation = wallet.invoke_contract(
            contract_address=lending_pool_address,
            method="unStakeAndWithdraw",
            abi=LYF_LENDING_POOL_ABI,
            args={
                "reserveId": pool_id,
                "eTokenAmount": str(etoken_amount),
                "to": wallet.default_address.address_id,
                "receiveNativeETH": True,
            }
        ).wait()
        return f"Withdrawn from lending pool with transaction hash: {invocation.transaction.transaction_hash}\n"
    except Exception as e:
        return f"Error withdrawing from the pool {e!s}\n"


class ExtrafiLYFWithdrawFromLendingAction(CdpAction):
    """Withdraw funds from the Extrafi LYF Lending Pool action."""

    name: str = "extrafi_lyf_withdraw_from_lending_action"
    description: str = EXTRA_LYF_WITHDRAW_FROM_LENDING_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFWithdrawFromLendingInput
    func: Callable[..., str] = lyf_withdraw_from_lending
