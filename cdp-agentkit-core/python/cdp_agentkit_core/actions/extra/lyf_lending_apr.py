import json
from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp_agentkit_core.actions import CdpAction
from .helper import get_apr_change_for_lyf_lending_pool


EXTRA_LYF_LENDING_APR_PROMPT = """
This tool is designed to list the APR changes of a specific LYF Lending Pool, useful for users who wish to check if the APR of a lending pool is stable. You can summarize this data.

Inputs:
- Pool id
(Hint: Users often provide a token symbol. Use tool ExtrafiLYFListLending to obtain the Pool id. If multiple pool ids exist for the same symbol, select the one with the highest APR.)

Output:
Includes basic information about the Lending Pool and a list of APRs with timestamps.

Important Notes:

- Network Support: Only supported on the following networks:
  - Base Mainnet (i.e., 'base', 'base-mainnet')
- This tool belongs to the Extrafi LYF Lending series
- APR Format: APR values are expressed as decimals, e.g., 0.05 indicates a 5% annualized rate.
- When communicating with users, you can use UTC time for clarity instead of directly using timestamps.
"""


class ExtrafiLYFLendingAPRInput(BaseModel):
    """Input argument schema for LYF lending APR action."""
    pool_id: str = Field(
        ...,
        description="The pool id of the LYF Lending Pool as a string representation of an integer, e.g., '20'",
    )


def lyf_lending_apr(pool_id: str) -> str:
    """Get the historical APR data of specified Extrafi LYF lending pool.

    Returns:
        str: A message containing the historical APR data.
    """
    apr = get_apr_change_for_lyf_lending_pool(pool_id)
    if apr is not None:
        reply = "Extrafi LYF Lending Pool APR:\n"
        reply += json.dumps(apr, indent=4)
        return reply
    else:
        return "Error: Failed to retrieve the LYF lending pool APR.\n"


class ExtrafiLYFLendingAPRAction(CdpAction):
    """Get historical APR data for one Extrafi LYF lending pool."""

    name: str = "extrafi_lyf_lending_apr_action"
    description: str = EXTRA_LYF_LENDING_APR_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFLendingAPRInput
    func: Callable[..., str] = lyf_lending_apr
