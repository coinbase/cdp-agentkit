import time
from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp import Wallet, Transaction
from cdp_agentkit_core.actions import CdpAction
from .helper import (addresses, approve_token, amount_need_to_wrapped, get_lyf_farming_vault_state,
                     LYF_POSITION_MANAGER_ABI, get_decimals_of, check_balance_sufficiency, get_symbol_of)


EXTRA_LYF_REPAY_FARMING_DEBT_PROMPT = """
This tool is used to let users repay the specified token debt in the specified Extra LYF Farming Vault, position.

Tool ExtrafiLYFListFarmingAction can help you get the user's existing Farming position information, so you can determine the input parameters needed for this tool.

Important Notes:
- Network Support: Only supported on "Base Mainnet"
- This tool belongs to the Extrafi LYF Farming series
- Users must have enough tokens to repay the Repay Amount in the parameters. If the repaid tokens are more than the actual debt in the smart contract, the contract will automatically refund the excess tokens.
- Users might refer to tokens or vaults by token symbols; you need to obtain the values via ExtrafiLYFListFarmingAction.
- The tool will automatically scale the token amount to the appropriate unit, such as ERC20 decimals or Ethereum's wei. Just enter the amount in natural language.
"""


class ExtrafiLYFRepayFarmingDebtInput(BaseModel):
    """Input argument schema for ExtrafiLYFRepayFarmingDebtAction."""
    vault_id: str = Field(
        ...,
        description="The vault id of the LYF Farming Vault as a string representation of an integer, e.g., '18'",
    )
    position_id: str = Field(
        ...,
        description="The position ID of the user's investment in the specified LYF Farming Vault as a string-encoded integer, e.g., '10'.",
    )
    amount0_repay: str = Field(
        ...,
        description="The amount of token0 the user wishes to repay. Specify the token amount as a string (e.g., '1000.01' for USDC or '0.00001' for ETH)",
    )
    amount1_repay: str = Field(
        ...,
        description="The amount of token1 the user wishes to repay. Specify the token amount as a string (e.g., '1000.01' for USDC or '0.00001' for ETH)",
    )


def get_amount_without_decimals(wallet: Wallet, token_address: str, amount: str) -> int | None:
    """Get the amount without decimals for the token."""
    decimals = get_decimals_of(wallet, token_address)
    if decimals is None:
        return None
    try:
        amount_without_decimals = int(float(amount) * 10 ** decimals)
        return amount_without_decimals
    except Exception as e:
        return None


def lyf_repay_farming_debt(wallet: Wallet, vault_id: str, position_id: str,
                           amount0_repay: str, amount1_repay: str) -> str:
    """
    Repay the specified token debt in the specified Extra LYF Farming Vault, position.
    """

    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return "Error: Failed to retrieve the vault state. Please check the vault id.\n"
    vault_token0_address = vault_state["token0"]
    vault_token1_address = vault_state["token1"]
    token0_symbol = get_symbol_of(wallet, vault_token0_address)
    if token0_symbol is None:
        return "Error: Failed to retrieve the token0 symbol.\n"
    token1_symbol = get_symbol_of(wallet, vault_token1_address)
    if token1_symbol is None:
        return "Error: Failed to retrieve the token1 symbol.\n"

    weth_address = addresses.token_addresses[wallet.network_id]["WETH"]
    position_manager_address = addresses.lyf_addresses[wallet.network_id]["VaultPositionManager"]

    amount0_repay_ = get_amount_without_decimals(wallet, vault_token0_address, amount0_repay)
    if amount0_repay_ is None:
        return "Error: Failed to convert the token0 repay amount to an integer.\n"
    amount1_repay_ = get_amount_without_decimals(wallet, vault_token1_address, amount1_repay)
    if amount1_repay_ is None:
        return "Error: Failed to convert the token1 repay amount to an integer.\n"

    # Check the allowance
    eth_wrapping = 0
    if amount0_repay_ > 0:
        ok = check_balance_sufficiency(wallet, vault_token0_address, str(amount0_repay_))
        if ok is None:
            return f"Error: Failed to check the balance sufficiency for {token0_symbol}.\n"
        if not ok:
            return f"Error: Insufficient balance for {token0_symbol}.\n"
        approval_result = approve_token(wallet, vault_token0_address, position_manager_address, amount0_repay_)
        if approval_result is None or not approval_result:
            return f"Error: Failed to approve {token0_symbol} for spending.\n"
        if vault_token0_address == weth_address:
            wrapping_amount = amount_need_to_wrapped(wallet, str(amount0_repay_))
            if wrapping_amount is None:
                return "Error: Failed to check the wrapping amount for ETH.\n"
            eth_wrapping = wrapping_amount
    if amount1_repay_ > 0:
        ok = check_balance_sufficiency(wallet, vault_token1_address, str(amount1_repay_))
        if ok is None:
            return f"Error: Failed to check the balance sufficiency for {token1_symbol}.\n"
        if not ok:
            return f"Error: Insufficient balance for {token1_symbol}.\n"
        approval_result = approve_token(wallet, vault_token1_address, position_manager_address, amount1_repay_)
        if approval_result is None or not approval_result:
            return f"Error: Failed to approve {token0_symbol} for spending.\n"
        if vault_token1_address == weth_address:
            wrapping_amount = amount_need_to_wrapped(wallet, str(amount1_repay_))
            if wrapping_amount is None:
                return "Error: Failed to check the wrapping amount for ETH.\n"
            eth_wrapping = wrapping_amount

    args = {
        "params": (vault_id,
                   position_id,
                   str(amount0_repay_),
                   str(amount1_repay_),
                   True,
                   str(int(time.time()) + 600))
    }

    try:
        if eth_wrapping > 0:
            invocation = wallet.invoke_contract(
                contract_address=position_manager_address,
                method="exactRepay",
                abi=LYF_POSITION_MANAGER_ABI,
                args=args,
                amount=str(eth_wrapping),
                asset_id="wei"
            ).wait()
        else:
            invocation = wallet.invoke_contract(
                contract_address=position_manager_address,
                method="exactRepay",
                abi=LYF_POSITION_MANAGER_ABI,
                args=args
            ).wait()

        while not invocation.transaction.terminal_state:
            time.sleep(1)

        if invocation.transaction.status == Transaction.Status.COMPLETE:
            return (f"Successfully repaid the debt in the farming vault with transaction hash: "
                    f"{invocation.transaction.transaction_hash}\n")
        else:
            return f"Error: Failed to repay the debt in the farming vault.\n"

    except Exception as e:
        return f"Error: {str(e)}. Failed to repay the debt in the farming vault.\n"


class ExtrafiLYFRepayFarmingDebtAction(CdpAction):
    """Action to repay the specified token debt in the specified Extra LYF Farming Vault, position."""

    name: str = "extrafi_lyf_repay_farming_debt_action"
    description: str = EXTRA_LYF_REPAY_FARMING_DEBT_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFRepayFarmingDebtInput
    func: Callable[..., str] = lyf_repay_farming_debt
