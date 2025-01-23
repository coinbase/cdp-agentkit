from cdp import SmartContract, Wallet, Address, Transaction
from .abi import ERC20_ABI
import time


erc20_symbols = {}
erc20_decimals = {}


def get_balance_of(wallet: Wallet, contract_address: str, address: Address) -> int | None:
    try:
        balance = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=contract_address,
            method="balanceOf",
            abi=ERC20_ABI,
            args={"_owner": address.address_id})
        if not isinstance(balance, int):
            raise TypeError("Balance must be an integer")
        return balance
    except Exception as e:
        return None


def get_decimals_of(wallet: Wallet, contract_address: str) -> int | None:
    global erc20_decimals
    decimals = erc20_decimals.get(contract_address)
    if decimals is not None:
        return decimals
    try:
        decimals = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=contract_address,
            method="decimals",
            abi=ERC20_ABI,
            args={})
        if not isinstance(decimals, int):
            raise TypeError("Decimals must be an integer")
        erc20_decimals[contract_address] = decimals
        return decimals
    except Exception as e:
        return None


def get_symbol_of(wallet: Wallet, contract_address: str) -> str | None:
    global erc20_symbols
    symbol = erc20_symbols.get(contract_address)
    if symbol is not None:
        return symbol
    try:
        symbol = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=contract_address,
            method="symbol",
            abi=ERC20_ABI,
            args={})
        if not isinstance(symbol, str):
            raise TypeError("Symbol must be a string")
        erc20_symbols[contract_address] = symbol
        return symbol
    except Exception as e:
        return None


def get_allowance_of(wallet: Wallet, contract_address: str, owner: str, spender: str) -> int | None:
    try:
        allowance = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=contract_address,
            method="allowance",
            abi=ERC20_ABI,
            args={"_owner": owner, "_spender": spender})
        if not isinstance(allowance, int):
            raise TypeError("Allowance must be an integer")
        return allowance
    except Exception as e:
        return None


def approve_token(wallet: Wallet, token_address: str, spender_address: str, amount: int) -> bool | None:
    """Approve the token for spending."""

    allowance = get_allowance_of(wallet, token_address, wallet.default_address.address_id, spender_address)
    if allowance is None:
        return None
    if allowance >= amount:
        return True

    try:
        invocation = wallet.invoke_contract(
            contract_address=token_address,
            method="approve",
            abi=ERC20_ABI,
            args={
                "_spender": spender_address,
                "_value": str(amount)
            }
        ).wait()
        while not invocation.transaction.terminal_state:
            time.sleep(1)
        if invocation.transaction.status == Transaction.Status.COMPLETE:
            return True
        else:
            return False
    except Exception as e:
        print(f"Error approving token: {e}")
        return None
