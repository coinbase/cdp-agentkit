from collections.abc import Callable
from pydantic import BaseModel, Field
from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction
from .helper import (get_lyf_farming_vault_state, format_str_leverage_to_int,
                     get_decimals_of, get_balance_of,
                     get_user_farming_vault_positions, get_amount_out,
                     get_lyf_vault_borrow_available, addresses,
                     get_lyf_vault_related_lending_pool_ids, get_vault_address, get_lyf_farming_apy)

EXTRA_LYF_INVEST_TO_FARMING_HELPER_PROMPT = """
This tool calculates and generates required parameters for ExtrafiLYFInvestToFarmingAction, allowing you to proceed with the action once users confirm these parameters.

Background:
Users engage in leveraged yield farming through invest farming vaults to seek higher APR returns. In LYF scenarios, users contribute their own funds and borrow additional capital from the LYF Lending Pool for AMM liquidity mining.

Important Notes:

- Network Support: Only supported "Base Mainnet"
- Each Vault contains two tokens, referred to as token0 and token1. 
- Users may provide only one of these tokens.
- Users MUST give which token they wish to borrow when the leverage is greater than 1! User can borrow the same token they supply.
- Users might refer to tokens or vaults by token symbols; you need to obtain the values via ExtrafiLYFListFarmingAction.
- The tool will automatically scale the token amount to the appropriate unit, such as ERC20 decimals or Ethereum's wei. Just enter the amount in natural language.
"""


class ExtrafiLYFInvestToFarmingHelperInput(BaseModel):
    """Input argument schema for LYF invest to farming helper action."""
    vault_id: str = Field(
        ...,
        description="The vault id of the LYF Farming Vault as a string representation of an integer, e.g., '18'",
    )
    token0_address: str = Field(
        ...,
        description="The address of the token the user wishes to invest, which must be one of the two tokens in the vault, e.g., '0x9Ef15597B0B900bfceE4A77204F72bd20C85d7c8'",
    )
    token0_amount: str = Field(
        ...,
        description="The amount of token0 the user wishes to invest. Specify the token amount as a string (e.g., '1000.01' for USDC or '0.00001' for ETH)",
    )
    token1_address: str = Field(
        ...,
        description="The address of the token the user wishes to invest, which must be one of the two tokens in the vault. If the user wishes to invest only in one token, enter an empty string here",
    )
    token1_amount: str = Field(
        ...,
        description="The amount of token1 the user wishes to invest. Specify the token amount as a string; if the user wishes to invest in only one token, enter an empty string here",
    )
    leverage: str = Field(
        ...,
        description="Specify the desired leverage without exceeding the vault's maximum allowed by ExtrafiLYFListFarmingAction. The minimum leverage is 1. (e.g., '2.2' for 2.2x leverage)",
    )
    borrow_token_address: str = Field(
        ...,
        description="When leverage is greater than 1, user MUST specify the token address to borrow. When the leverage is 1, enter an empty string here",
    )


def lyf_invest_to_farming_helper(wallet: Wallet, vault_id: str, token0_address: str, token0_amount: str,
                                 token1_address: str, token1_amount: str, leverage: str,
                                 borrow_token_address: str) -> str:
    """
    Calculate and generate required parameters for LYF invest to farming action.

    Returns:
        str: A message containing the required parameters for LYF invest to farming action.
    """

    # Get vault state
    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return "Error: Failed to retrieve the vault state. Please check the vault id.\n"

    # check leverage:
    max_leverage = vault_state["maxLeverage"]
    leverage_int = format_str_leverage_to_int(leverage)
    if leverage_int is None:
        return "Error: Failed to convert the leverage to an integer. Please check the leverage.\n"

    if leverage_int < 100 or leverage_int > max_leverage:
        return "Error: The leverage should be between 1 and max_leverage.\n"

    # check token addresses:
    vault_token0_address = vault_state["token0"]
    vault_token1_address = vault_state["token1"]
    vault_address = get_vault_address(vault_id)
    if vault_address is None:
        return "Error: Failed to retrieve the vault address.\n"
    pair_address = vault_state["pair"]

    if token0_address != vault_token0_address and token0_address != vault_token1_address:
        return "Error: Token0 address is not in the vault.\n"
    if token1_address != "" and token1_address != vault_token1_address and token1_address != vault_token0_address:
        return "Error: Token1 address is not in the vault.\n"

    if token0_address == token1_address:
        return "Error: Token0 and Token1 addresses are the same.\n"

    # check borrow token address:
    if (leverage_int > 100 and borrow_token_address != vault_token0_address and
            borrow_token_address != vault_token1_address):
        return "Error: Borrow token address is not in the vault.\n"

    # Adjust the token amount to address potential issues with the incorrect order of token0 and token1.
    if token0_address == vault_token1_address:
        token0_amount, token1_amount = token1_amount, token0_amount

    # check ETH balance:
    eth_balance_reply = ""
    eth_balance = wallet.default_address.balance("wei")
    weth_address = addresses.token_addresses[wallet.network_id]["WETH"]

    # check token amounts:
    token0_amount_with_decimals = 0
    if token0_amount != "":
        token0_decimals = get_decimals_of(wallet, vault_token0_address)
        if token0_decimals is None:
            return "Error: Failed to retrieve the decimals of token0.\n"
        try:
            token0_amount_with_decimals = int(float(token0_amount) * 10 ** token0_decimals)
        except Exception as e:
            return "Error: Failed to convert token0 amount to the decimal value.\n"

        token0_balance_with_decimals = get_balance_of(wallet, vault_token0_address, wallet.default_address)
        if token0_balance_with_decimals is None:
            return "Error: Failed to retrieve the user balance of token0.\n"
        if token0_amount_with_decimals > token0_balance_with_decimals:
            if vault_token0_address != weth_address or token0_amount_with_decimals > eth_balance:
                return f"Error: Insufficient balance of token {vault_token0_address}.\n"
            else:
                eth_balance_reply = (f"Not enough WETH left, ExtrafiLYFInvestToFarmingAction will wrap "
                                     f"{token0_amount_with_decimals} wei ETH balance for User.\n")

    token1_amount_with_decimals = 0
    if token1_amount != "":
        token1_decimals = get_decimals_of(wallet, vault_token1_address)
        if token1_decimals is None:
            return "Error: Failed to retrieve the decimals of token1.\n"
        try:
            token1_amount_with_decimals = int(float(token1_amount) * 10 ** token1_decimals)
        except Exception as e:
            return "Error: Failed to convert token1 amount to the decimal value.\n"

        token1_balance_with_decimals = get_balance_of(wallet, vault_token1_address, wallet.default_address)
        if token1_balance_with_decimals is None:
            return "Error: Failed to retrieve the user balance of token1.\n"
        if token1_amount_with_decimals > token1_balance_with_decimals:
            if vault_token1_address != weth_address or token1_amount_with_decimals > eth_balance:
                return f"Error: Insufficient balance of token {vault_token1_address}.\n"
            else:
                eth_balance_reply = (f"Not enough WETH left, ExtrafiLYFInvestToFarmingAction will wrap "
                                     f"{token1_amount_with_decimals} wei ETH balance for User.\n")

    # get existed position id
    positions = get_user_farming_vault_positions(wallet.default_address.address_id, vault_id)
    if positions is None:
        return "Error: Failed to retrieve the existing farming vault positions. \n"

    if len(positions) > 0:
        position_id = str(positions[0]["vaultPositionId"])
    else:
        position_id = "0"

    # calculate borrow amount
    # calculate all invest token amount in token0
    token1_amount_in_token0 = 0
    if token1_amount_with_decimals != 0:
        token1_amount_in_token0 = get_amount_out(wallet,
                                                 pair_address,
                                                 vault_token1_address,
                                                 str(token1_amount_with_decimals))
    total_amount_in_token0 = token0_amount_with_decimals + token1_amount_in_token0
    borrow_amount_in_token0 = (leverage_int - 100) * total_amount_in_token0 // 100
    borrow_amount_in_token1 = 0
    if borrow_token_address == vault_token1_address:
        borrow_amount_in_token1 = get_amount_out(wallet,
                                                 pair_address,
                                                 vault_token0_address,
                                                 str(borrow_amount_in_token0))
        borrow_amount_in_token0 = 0

    related_lending_pool_ids = get_lyf_vault_related_lending_pool_ids(wallet, vault_id)
    if related_lending_pool_ids is None:
        return "Error: Failed to retrieve the lending pool ids related to the farming vault's debts.\n"
    if borrow_amount_in_token0 != 0:
        token0_available_for_borrow = get_lyf_vault_borrow_available(wallet,
                                                                     related_lending_pool_ids[0],
                                                                     vault_address)
        if token0_available_for_borrow is None:
            return "Error: Failed to retrieve the available borrow amount of token0.\n"
        if borrow_amount_in_token0 > token0_available_for_borrow:
            return (f"Error: Insufficient available borrow amount of token0, the available amount is "
                    f"{token0_available_for_borrow}, but the required amount is {borrow_amount_in_token0}, "
                    f"try to reduce the leverage or borrow another token instead\n")
    if borrow_amount_in_token1 != 0:
        token1_available_for_borrow = get_lyf_vault_borrow_available(wallet,
                                                                     related_lending_pool_ids[1],
                                                                     vault_address)
        if token1_available_for_borrow is None:
            return "Error: Failed to retrieve the available borrow amount of token1.\n"
        if borrow_amount_in_token1 > token1_available_for_borrow:
            return (f"Error: Insufficient available borrow amount of token1, the available amount is "
                    f"{token1_available_for_borrow}, but the required amount is {borrow_amount_in_token1}, "
                    f"try to reduce the leverage or borrow another token instead\n")

    apy = get_lyf_farming_apy(wallet, vault_id, token0_amount_with_decimals,
                        borrow_amount_in_token0, token1_amount_with_decimals,
                        borrow_amount_in_token1, leverage_int)
    if apy is None:
        return "Error: Failed to retrieve the APY of the farming vault.\n"
    apy = apy * 100

    reply = f"ExtrafiLYFInvestToFarmingInput parameters generated:\n"
    reply += (f"vault_id: {vault_id}, vault_position_id: {position_id}, "
              f"amount_0_invest: {token0_amount_with_decimals}, "
              f"amount_0_borrow: {borrow_amount_in_token0}, "
              f"amount_1_invest: {token1_amount_with_decimals}, "
              f"amount_1_borrow: {borrow_amount_in_token1}, "
              f"amount_0_min: 0, amount_1_min: 0\n\n")
    reply += (f"Other information:\n"
              f"APY calculated: {apy}%\n")
    if eth_balance_reply != "":
        reply += eth_balance_reply
    return reply


class ExtrafiLYFInvestToFarmingHelperAction(CdpAction):
    """Generate required parameters for LYF invest to farming action."""

    name: str = "extrafi_lyf_invest_to_farming_helper_action"
    description: str = EXTRA_LYF_INVEST_TO_FARMING_HELPER_PROMPT
    args_schema: type[BaseModel] | None = ExtrafiLYFInvestToFarmingHelperInput
    func: Callable[..., str] = lyf_invest_to_farming_helper
