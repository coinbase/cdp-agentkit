from collections.abc import Callable
from pydantic import BaseModel
from cdp_agentkit_core.actions import CdpAction
from .helper import get_concise_lyf_lending_pool_info


EXTRA_LYF_LIST_LENDING_PROMPT = """
This tool lists all lending pools supported by Extrafi LYF (Leveraged Yield Farming), providing details such as pool id, token symbol, token address, and the latest APR.

Input:
None.

This tool is typically used to provide users with information to help them decide which pool to fund. Generally, users make their decision based on:

1. Whether they possess tokens related to the pool;
2. Whether the APR of the pool meets their income expectations; 
3. Risk factors, especially if tokens are mainstream and relatively price-stable

Important Notes:

- LYF Lending Pool Definition: These are sources of funds for leveraged yield farming, with APRs based on borrowing demands. It is crucial to differentiate LYF Lending Pools from Xlend's Supply Pools.
- Only supported on the following networks:
  - Base Mainnet (ie, 'base', 'base-mainnnet')
- This tool belongs to the Extrafi LYF Lending series
- APR Format: APR values are decimal, e.g., 0.05 indicates a 5% annualized rate.
"""


class ExtrafiLYFListLendingInput(BaseModel):
    """Input argument schema for lyf list lending action."""


def lyf_list_lending() -> str:
    """List all the lending pools supported by Extrafi LYF (Leveraged Yield Farming).

    Returns:
        str: A message containing the lending pools information.
    """
    pools = get_concise_lyf_lending_pool_info()
    if pools is not None:
        reply = "Extrafi LYF Lending Pools Information:\n"
        for pool in pools:
            reply += f"Pool ID: {pool['pool_id']}, Symbol: {pool['symbol']}, Token Address: {pool['address']}, APR: {pool['apr']}\n"
        return reply
    else:
        return "Error: Failed to retrieve the lyf lending pools information.\n"


class ExtrafiLYFListLendingAction(CdpAction):
    """Get Extrafi LYF lending pools action."""

    name: str = "extrafi_lyf_list_lending_action"
    description: str = EXTRA_LYF_LIST_LENDING_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFListLendingInput
    func: Callable[..., str] = lyf_list_lending
