from collections.abc import Callable
from pydantic import BaseModel
from cdp_agentkit_core.actions import CdpAction
from cdp import Wallet
from .helper import (get_user_lending_position_pool_ids, get_lyf_lending_pool_positions, get_pool_token_address,
                     get_decimals_of, get_symbol_of)


EXTRA_LYF_GET_LENDING_POSITIONS_PROMPT = """
This tool is designed to retrieve user positions in the LYF Lending Pool where funds have been supplied. The information returned includes a list of positions, featuring the lending pool id, and the number of tokens supplied for each position.

Inputs: None

Important Notes:

- Only supported on the following networks:
  - Base Mainnet (i.e., 'base', 'base-mainnet')
- This tool belongs to the Extrafi LYF Lending series
"""


class ExtrafiLYFGetLendingPositionsInput(BaseModel):
    """Input argument schema for getting LYF lending pool positions action."""


def lyf_get_lending_positions(wallet: Wallet) -> str:
    """Get user positions in the Extrafi LYF lending pools.

    Returns:
        str: A message containing the user positions in the LYF lending pools.
    """

    pool_ids = get_user_lending_position_pool_ids(wallet.default_address.address_id)
    if pool_ids is not None:
        positions = get_lyf_lending_pool_positions(wallet, pool_ids)
        if positions is not None:
            reply = "Extrafi LYF Lending Pool Positions:\n"
            for position in positions:
                pool_id = str(position["reserveId"])
                token_address = get_pool_token_address(wallet, pool_id)
                if token_address is None:
                    return "Error: Failed to retrieve the LYF lending pool token address.\n"
                symbol = get_symbol_of(wallet, token_address)
                if symbol is None:
                    return "Error: Failed to retrieve the LYF lending pool token symbol.\n"
                decimals = get_decimals_of(wallet, token_address)
                if decimals is None:
                    return "Error: Failed to retrieve the LYF lending pool token decimals.\n"
                amount = float(position["liquidity"]) / (10 ** decimals)
                reply += f"Pool ID: {position['reserveId']}, Amount: {amount} {symbol}\n"
            return reply
        else:
            return "Error: Failed to retrieve the LYF lending pool positions.\n"
    else:
        return "Error: Failed to retrieve the LYF lending pool ids.\n"


class ExtrafiLYFGetLendingPositionsAction(CdpAction):
    """Get user positions in the Extrafi LYF lending pools action."""

    name: str = "extrafi_lyf_get_lending_positions_action"
    description: str = EXTRA_LYF_GET_LENDING_POSITIONS_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFGetLendingPositionsInput
    func: Callable[..., str] = lyf_get_lending_positions
