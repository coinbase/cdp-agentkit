from collections.abc import Callable
from pydantic import BaseModel
from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction
from .helper import (get_user_farming_vault_positions, get_vault_position,
                     get_token_value, get_lyf_farming_vault_state, get_symbol_of, get_decimals_of)
from concurrent.futures import ThreadPoolExecutor, as_completed

EXTRA_LYF_GET_FARMING_POSITIONS_PROMPT = """
This tool is designed to retrieve user positions in the LYF Farming Vault where funds have been invested. 
The information returned includes a list of positions, featuring the farming vault id, and the number of tokens invested for each position.

Inputs: None

Important Notes:

- Only supported on the following networks:
    - Base Mainnet (i.e., 'base', 'base-mainnet')
- This tool belongs to the Extrafi LYF Farming series
"""


class ExtrafiLYFGetFarmingPositionsInput(BaseModel):
    """Input argument schema for getting LYF farming vault positions action."""


def get_vault_position_info(wallet: Wallet, vault_id: str, position_id: str) -> str | None:
    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return "Error: Failed to retrieve the vault state. Please check the vault id.\n"
    vault_token0_address = vault_state["token0"]
    vault_token1_address = vault_state["token1"]

    token0_symbol = get_symbol_of(wallet, vault_token0_address)
    if token0_symbol is None:
        return None
    token1_symbol = get_symbol_of(wallet, vault_token1_address)
    if token1_symbol is None:
        return None

    position = get_vault_position(wallet, vault_id, position_id)
    if position is None:
        return None
    token0_left = position.get("token0Left")
    token1_left = position.get("token1Left")
    token0_in_liquidity = position.get("token0InLiquidity")
    token1_in_liquidity = position.get("token1InLiquidity")
    debt0 = position.get("debt0")
    debt1 = position.get("debt1")
    token0_total = token0_left + token0_in_liquidity
    token1_total = token1_left + token1_in_liquidity

    token0_total_with_decimals = f"{token0_total / 10 ** get_decimals_of(wallet, vault_token0_address):.6f}"
    token1_total_with_decimals = f"{token1_total / 10 ** get_decimals_of(wallet, vault_token1_address):.6f}"
    debt0_with_decimals = f"{debt0 / 10 ** get_decimals_of(wallet, vault_token0_address):.6f}"
    debt1_with_decimals = f"{debt1 / 10 ** get_decimals_of(wallet, vault_token1_address):.6f}"

    token0_value = get_token_value(wallet, vault_token0_address, token0_total)
    if token0_value is None:
        return None
    token1_value = get_token_value(wallet, vault_token1_address, token1_total)
    if token1_value is None:
        return None

    debt0_value = debt0 * token0_value / token0_total
    debt1_value = debt1 * token1_value / token1_total

    total_position_value = token0_value + token1_value
    total_debt_value = debt0_value + debt1_value

    equity_value = total_position_value - total_debt_value

    debt_ratio = total_debt_value / total_position_value

    return (f"Vault ID: {vault_id}, Position ID: {position_id}, "
            f"Token0 {token0_symbol}({vault_token0_address}) Position Value: ${token0_value} ({token0_total_with_decimals} {token0_symbol}), "
            f"Token1 {token1_symbol}({vault_token1_address}) Position Value: ${token1_value} ({token1_total_with_decimals} {token1_symbol}), "
            f"Total Position Value: ${total_position_value:.2f}, "
            f"{"Debt Value"}: ${total_debt_value:.2f} ({debt0_with_decimals} {token0_symbol}, "
            f"{debt1_with_decimals} {token1_symbol}), "
            f"Equity Value: ${equity_value}, Debt Ratio: {debt_ratio:.2f}")


def lyf_get_farming_positions(wallet: Wallet) -> str:
    """
    Get user positions in the Extrafi LYF farming vaults.

    Returns:
        str: A message containing the user positions in the LYF farming vaults.
    """

    positions = get_user_farming_vault_positions(wallet.default_address.address_id, None)
    if positions is None:
        return "Error: Failed to retrieve the existing farming vault positions for user.\n"

    reply = "Extrafi LYF Farming Vault Positions:\n"
    position_info = []
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(get_vault_position_info, wallet, position["vaultId"], position["vaultPositionId"])
                   for position in positions]
        for future in as_completed(futures):
            position_info.append(future.result())

    for info in position_info:
        if info is None:
            return "Error: Failed to retrieve the vault position information.\n"
        reply += info + "\n"

    return reply


class ExtrafiLYFGetFarmingPositionsAction(CdpAction):
    """Get user positions in the Extrafi LYF farming vaults action."""

    name: str = "extrafi_lyf_get_farming_positions_action"
    description: str = EXTRA_LYF_GET_FARMING_POSITIONS_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFGetFarmingPositionsInput
    func: Callable[..., str] = lyf_get_farming_positions
