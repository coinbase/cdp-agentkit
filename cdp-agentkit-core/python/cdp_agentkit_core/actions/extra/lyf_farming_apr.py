import json
from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction
from .helper import get_historical_farming_apr_tvl


EXTRA_LYF_FARMING_APR_PROMPT = """
This tool is designed to list the APR and TVL changes over a specific period for a particular LYF farming vault, aiding users in assessing the vault's historical performance to decide whether to participate in its LYF. You can summarize this data.

Inputs:
- Vault Id
(Hint: Users may refer to a vault by the token symbol involved. You can use the ExtrafiLYFListFarmingAction tool to obtain the vault id. If multiple vault share the same token symbol, you should provide a list.)

Important Notes:

- Network Support: Only supported on the following networks:
  - Base Mainnet (i.e., 'base', 'base-mainnet')
- This tool belongs to the LYF Farming series
- APR Format: APR is expressed in percentage (%) and TVL in US dollars ($).
- When communicating with users, use UTC time for clarity instead of direct timestamps.

"""


class ExtrafiLYFFarmingAPRInput(BaseModel):
    """Input argument schema for LYF Farming APR action."""
    vault_id: str = Field(
        ...,
        description="The vault id of the LYF Farming vault, e.g., '18'",
    )


def lyf_farming_apr(wallet: Wallet, vault_id: str) -> str:
    """Get the historical APR and TVL data of specified Extrafi LYF farming vault.

    Returns:
        str: A message containing the historical APR and TVL data.
    """
    info = get_historical_farming_apr_tvl(wallet, vault_id)
    if info is not None:
        reply = "Extrafi LYF Farming Vault APR and TVL:\n"
        reply += json.dumps(info, indent=4)
        return reply
    else:
        return "Error: Failed to retrieve the LYF farming vault APR and TVL.\n"


class ExtrafiLYFFarmingAPRAction(CdpAction):
    """Get historical APR and TVL data for one Extrafi LYF farming vault."""

    name: str = "extrafi_lyf_farming_apr_action"
    description: str = EXTRA_LYF_FARMING_APR_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFFarmingAPRInput
    func: Callable[..., str] = lyf_farming_apr
