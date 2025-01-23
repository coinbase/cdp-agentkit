import time
from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp import Wallet, Transaction
from cdp_agentkit_core.actions import CdpAction
from .helper import (addresses, get_lyf_farming_vault_state,
                     LYF_POSITION_MANAGER_ABI, get_decimals_of, get_vault_position)


EXTRA_LYF_CLOSE_FARMING_POSITIONS_PROMPT = """
This tool is used to let users close their positions in the Extra LYF Farming Vault.
User can partially or fully close their positions by repaying the debt and withdrawing the remaining tokens.

- Receive Token: The token to receive after closing the position. Must be one of the two tokens in farming vault pair. You need to obtain the values via ExtrafiLYFGetFarmingPositionsAction.

Important Notes:
- Network Support: Only supported on "Base Mainnet"
- This tool belongs to the Extrafi LYF Farming series
- Users might refer to token by token symbol; you need to obtain the token address via ExtrafiLYFGetFarmingPositionsAction.
"""


class ExtrafiLYFCloseFarmingPositionsInput(BaseModel):
    """Input argument schema for closing LYF farming vault positions action."""
    vault_id: str = Field(
        ...,
        description="The vault id of the LYF Farming Vault as a string representation of an integer, e.g., '18'",
    )
    position_id: str = Field(
        ...,
        description="The position ID of the user's investment in the specified LYF Farming Vault as a string-encoded integer, e.g., '10'.",
    )
    percent: str = Field(
        ...,
        description="The percentage of the position to be closed. Specify the percentage as a string (e.g., '50' for 50% or '100' for 100%).",
    )
    receive_token: str = Field(
        ...,
        description="The token to receive after closing the position. Must be one of the two tokens in farming vault pair. Specify the token address as a string (e.g., '0x1234567890abcdef1234567890abcdef12345678').",
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


def lyf_close_farming_position(wallet: Wallet, vault_id: str, position_id: str,
                               percent: str, receive_token: str) -> str:
    """
    Close the specified LYF Farming Vault position.
    """

    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return "Error: Failed to retrieve the vault state. Please check the vault id.\n"
    vault_token0_address = vault_state["token0"]
    vault_token1_address = vault_state["token1"]
    receive_type = -1
    if vault_token0_address == receive_token:
        receive_type = 0
    if vault_token1_address == receive_token:
        receive_type = 1
    if receive_type == -1:
        return "Error: The receive token must be one of the two tokens in the farming vault pair.\n"

    position = get_vault_position(wallet, vault_id, position_id)
    if position is None:
        return "Error: Failed to retrieve the vault position. Please check the position id.\n"

    if position.get("manager") != wallet.default_address.address_id:
        return "Error: The position does not belong to the user.\n"

    try:
        percent_ = int(percent) * 100
    except Exception as e:
        return "Error: Failed to convert the percentage to an integer.\n"
    if percent_ < 0 or percent_ > 10000:
        return "Error: The percentage must be between 0 and 100.\n"

    position_manager_address = addresses.lyf_addresses[wallet.network_id]["VaultPositionManager"]
    args = {
        "params": (vault_id,
                   position_id,
                   str(percent_),
                   wallet.default_address.address_id,
                   True,
                   str(receive_type),
                   "0",
                   "0",
                   str(int(time.time()) + 600),
                   "0",
                   "",)}

    try:
        invocation = wallet.invoke_contract(
            contract_address=position_manager_address,
            method="closeVaultPositionPartially",
            abi=LYF_POSITION_MANAGER_ABI,
            args=args
        ).wait()

        while not invocation.transaction.terminal_state:
            time.sleep(1)

        if invocation.transaction.status == Transaction.Status.COMPLETE:
            return (f"Successfully closed the {percent}% position in the farming vault with transaction hash: "
                    f"{invocation.transaction.transaction_hash}\n")
        else:
            return f"Error: Failed to close the position in the farming vault.\n"

    except Exception as e:
        return f"Error: Failed to close the position in the farming vault: {e}\n"


class ExtrafiLYFCloseFarmingPositionsAction(CdpAction):
    """Action class for closing LYF farming vault positions."""

    name: str = "extrafi_lyf_close_farming_positions_action"
    description: str = EXTRA_LYF_CLOSE_FARMING_POSITIONS_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFCloseFarmingPositionsInput
    func: Callable[..., str] = lyf_close_farming_position
