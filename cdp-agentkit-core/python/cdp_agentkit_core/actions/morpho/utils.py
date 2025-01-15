from cdp import Wallet

from cdp_agentkit_core.actions.morpho.constants import ERC20_APPROVE_ABI


def approve(wallet: Wallet, token_address: str, spender: str, amount: int) -> str:
    """Approve a spender to spend a specified amount of tokens.

    Args:
        wallet (Wallet): The wallet to execute the approval from
        token_address (str): The address of the token contract
        spender (str): The address of the spender
        amount (int): The amount of tokens to approve

    Returns:
        str: A success message with transaction hash or error message

    """
    try:
        amount_str = str(amount)

        invocation = wallet.invoke_contract(
            contract_address=token_address,
            method="approve",
            abi=ERC20_APPROVE_ABI,
            args={
                "spender": spender,
                "value": amount_str,
            },
        ).wait()

        return f"Approved {amount} tokens for {spender} with transaction hash: {invocation.transaction_hash} and transaction link: {invocation.transaction_link}"

    except Exception as e:
        return f"Error approving tokens: {e!s}"


# Pre-implementing the force approve for tokens like USDT.
def force_approve(wallet: Wallet, token_address: str, spender: str, amount: int) -> str:
    """Force approve by first setting allowance to 0 and then to the desired amount.

    Args:
        wallet (Wallet): The wallet to execute the approval from
        token_address (str): The address of the token contract
        spender (str): The address of the spender
        amount (int): The amount of tokens to approve

    Returns:
        str: A success message with transaction hash or error message

    """
    try:
        # First set approval to 0
        zero_approval = wallet.invoke_contract(
            contract_address=token_address,
            method="approve",
            abi=ERC20_APPROVE_ABI,
            args={
                "spender": spender,
                "value": "0",
            },
        ).wait()

        # Then set to desired amount
        amount_str = str(amount)
        final_approval = wallet.invoke_contract(
            contract_address=token_address,
            method="approve",
            abi=ERC20_APPROVE_ABI,
            args={
                "spender": spender,
                "value": amount_str,
            },
        ).wait()

        return f"Force approved {amount} tokens for {spender} with transaction hashes: {zero_approval.transaction_hash} (zero approval) and {final_approval.transaction_hash} (final approval) and transaction links: {zero_approval.transaction_link} (zero approval) and {final_approval.transaction_link} (final approval)"

    except Exception as e:
        return f"Error force approving tokens: {e!s}"
