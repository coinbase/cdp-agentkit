from collections.abc import Callable
from pydantic import BaseModel
from cdp_agentkit_core.actions import CdpAction
from cdp import Wallet
from .helper import get_lyf_farming_vaults_info, format_int_leverage_to_str


EXTRA_LYF_LIST_FARMING_PROMPT = """
This tool lists all Farming Vaults supported by Extrafi LYF (Leveraged Yield Farming), which enable users to engage in LYF. It provides details such as the vault's address, AMM pair symbol, stability status of the pair, addresses of the tokens in the pair, the APR (as a percentage), and the TVL (Total Value Locked) in US dollars.

Input:
None.

Important Notes:

- LYF Vault Definition: Users borrow tokens from the LYF Lending Pool to pair with their tokens for leveraged yield farming. Risks include increased debt ratios due to rising values of borrowed tokens, potentially leading to liquidation if thresholds are exceeded. Additionally, the volatility of the token pair may cause impermanent losses.
- Stable Definition: Vaults with tokens that have correlated values (e.g., wstETH and ETH, USDC and USDz) are marked as stable.
- Supported only on:
  - Base Mainnet (i.e., 'base', 'base-mainnet')
- This tool belongs to the Extrafi LYF Farming series
"""


class ExtrafiLYFListFarmingInput(BaseModel):
    """Input argument schema for LYF list farming action."""


def lyf_list_farming(wallet: Wallet) -> str:
    """List all the farming vaults supported by Extrafi LYF (Leveraged Yield Farming).

    Returns:
        str: A message containing the farming vaults information.
    """
    vaults = get_lyf_farming_vaults_info(wallet)
    if vaults is not None:
        reply = "Extrafi LYF Farming Vaults Information:\n"
        for vault in vaults:
            max_leverage = format_int_leverage_to_str(vault["max_leverage"])
            reply += (f"Vault id: {vault['vault_id']}, Vault Symbol: {vault['symbol']}, "
                      f"Vault Address: {vault['vault_address']}, "
                      f"Stable Pair: {vault['stable']}, Token0 address: {vault['token0']}, "
                      f"Token0 Symbol: {vault['token0_symbol']}, Token1 address: {vault['token1']}, "
                      f"Token1 Symbol: {vault['token1_symbol']}, "
                      f"Max leverage: {max_leverage}, APR: {vault['apr']}%, TVL: ${vault['tvl']}\n")
        return reply
    else:
        return "Error: Failed to retrieve the LYF farming vaults information.\n"


class ExtrafiLYFListFarmingAction(CdpAction):
    """Get Extrafi LYF farming vaults action."""

    name: str = "extrafi_lyf_list_farming_action"
    description: str = EXTRA_LYF_LIST_FARMING_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFListFarmingInput
    func: Callable[..., str] = lyf_list_farming
