from cdp import Wallet
from .addresses import token_addresses
from .erc20 import get_balance_of

def format_int_leverage_to_str(max_leverage):
    # Convert the integer to a float by dividing by 100
    leverage_float = max_leverage / 100.0

    # Format the float value to a string with 'X' to denote times leverage
    leverage_str = f"{leverage_float:.1f}X"

    return leverage_str


def format_str_leverage_to_int(leverage):
    # Remove the 'X' from the string if it exists
    leverage_str = leverage.replace("X", "")

    # Convert the string to a float by multiplying by 100
    try:
        leverage_int = int(float(leverage_str) * 100)

        return leverage_int
    except ValueError:
        return None


def amount_need_to_wrapped(wallet: Wallet, invest_amount: str) -> int | None:
    try:
        weth_address = token_addresses[wallet.network_id]["WETH"]
        weth_balance = get_balance_of(wallet, weth_address, wallet.default_address)
        if weth_balance is None:
            return None
        if weth_balance >= int(invest_amount):
            return 0
        eth_balance = wallet.balance("wei")
        if eth_balance < int(invest_amount):
            return None
        return int(invest_amount)
    except Exception as e:
        return None


def check_balance_sufficiency(wallet: Wallet, token_address: str, amount: str) -> bool:
    weth_address = token_addresses[wallet.network_id]["WETH"]
    balance = get_balance_of(wallet, token_address, wallet.default_address)
    if balance is None:
        return False
    if token_address == weth_address and balance < int(amount):
        eth_balance = wallet.balance("wei")
        return eth_balance >= int(amount)
    return balance >= int(amount)
