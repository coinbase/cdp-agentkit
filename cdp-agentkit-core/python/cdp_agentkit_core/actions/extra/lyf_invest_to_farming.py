import time
from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp import Wallet, Transaction
from cdp_agentkit_core.actions import CdpAction
from .helper import (addresses, get_lyf_farming_vault_state, approve_token,
                     LYF_POSITION_MANAGER_ABI, amount_need_to_wrapped)

EXTRA_LYF_INVEST_TO_FARMING_PROMPT = """
This tool is used to let users invest in Extra LYF Farming.

Before using this tool, you must first call ExtrafiLYFInvestToFarmingHelperAction to obtain the necessary parameters for this tool and have users confirm them.

Background:
Users engage in leveraged yield farming through investment farming vaults to seek higher APR returns. In LYF scenarios, users contribute their own funds and borrow additional capital from the LYF Lending Pool for AMM liquidity mining.

Important Notes:

- Network Support: Only supported on "Base Mainnet"
- This tool belongs to the Extrafi LYF Farming series
- This tool only accepts parameters provided by ExtrafiLYFInvestToFarmingHelperAction
"""


class ExtrafiLYFInvestToFarmingInput(BaseModel):
    """Input argument schema for ExtrafiLYFInvestToFarmingAction."""
    vault_id: str = Field(
        ...,
        description="The vault id of the LYF Farming Vault as a string representation of an integer, e.g., '18'",
    )
    position_id: str = Field(
        ...,
        description="The existing position ID of the user's investment in the specified LYF Farming Vault as a string-encoded integer, e.g., '10'. A value of '0' indicates a new position.",
    )
    amount_0_invest: str = Field(
        ...,
        description="The amount of token0 the user wishes to invest.",
    )
    amount_0_borrow: str = Field(
        ...,
        description="The amount of token0 the user wishes to borrow.",
    )
    amount_1_invest: str = Field(
        ...,
        description="The amount of token1 the user wishes to invest.",
    )
    amount_1_borrow: str = Field(
        ...,
        description="The amount of token1 the user wishes to borrow.",
    )


def lyf_invest_to_farming(wallet: Wallet, vault_id: str, position_id: str, amount_0_invest: str,
                          amount_0_borrow: str, amount_1_invest: str, amount_1_borrow: str) -> str:
    """
    Invest in the specified LYF Farming Vault.

    Returns:
        str: A message containing the result of the investment.
    """

    weth_address = addresses.token_addresses[wallet.network_id]["WETH"]
    position_manager_address = addresses.lyf_addresses[wallet.network_id]["VaultPositionManager"]

    try:
        amount_0_invest_int = int(amount_0_invest)
        amount_1_invest_int = int(amount_1_invest)
    except Exception as e:
        return "Error: Failed to convert the invest amount to an integer.\n"

    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return "Error: Failed to retrieve the vault state. Please check the vault id.\n"
    vault_token0_address = vault_state["token0"]
    vault_token1_address = vault_state["token1"]

    # Check the allowance
    if amount_0_invest_int > 0:
        approval_result = approve_token(wallet, vault_token0_address, position_manager_address, amount_0_invest_int)
        if approval_result is None or not approval_result:
            return "Error: Failed to approve token0 for spending.\n"
    if amount_1_invest_int > 0:
        approval_result = approve_token(wallet, vault_token1_address, position_manager_address, amount_1_invest_int)
        if approval_result is None or not approval_result:
            return "Error: Failed to approve token1 for spending.\n"

    eth_wrapping = 0
    if vault_token0_address == weth_address:
        wrapping_amount = amount_need_to_wrapped(wallet, amount_0_invest)
        if wrapping_amount is None:
            return "Error: Failed to check the wrapping amount for ETH.\n"
        eth_wrapping = wrapping_amount

    if vault_token1_address == weth_address:
        wrapping_amount = amount_need_to_wrapped(wallet, amount_1_invest)
        if wrapping_amount is None:
            return "Error: Failed to check the wrapping amount for ETH.\n"
        eth_wrapping = wrapping_amount

    args = {
        "params": (vault_id,
                   position_id,
                   amount_0_invest,
                   amount_0_borrow,
                   amount_1_invest,
                   amount_1_borrow,
                   "0",
                   "0",
                   str(int(time.time()) + 600),
                   "0",
                   "")
    }

    try:
        if eth_wrapping > 0:
            invocation = wallet.invoke_contract(
                contract_address=position_manager_address,
                method="newOrInvestToVaultPosition",
                abi=LYF_POSITION_MANAGER_ABI,
                args=args,
                amount=str(eth_wrapping),
                asset_id="wei"
            ).wait()
        else:
            invocation = wallet.invoke_contract(
                contract_address=position_manager_address,
                method="newOrInvestToVaultPosition",
                abi=LYF_POSITION_MANAGER_ABI,
                args=args
            ).wait()

        while not invocation.transaction.terminal_state:
            time.sleep(1)

        if invocation.transaction.status == Transaction.Status.COMPLETE:
            return (f"Success: Invested in the farming vault with transaction hash: "
                    f"{invocation.transaction.transaction_hash}\n")
        else:
            return (f"Error: Failed to invest in the farming vault with transaction hash: "
                    f"{invocation.transaction.transaction_hash}\n")

    except Exception as e:
        return f"Error: Failed to invest in the farming vault: {e}\n"


class ExtrafiLYFInvestToFarmingAction(CdpAction):
    """Invest in the specified LYF Farming Vault action."""

    name: str = "extrafi_lyf_invest_to_farming_action"
    description: str = EXTRA_LYF_INVEST_TO_FARMING_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFInvestToFarmingInput
    func: Callable[..., str] = lyf_invest_to_farming
