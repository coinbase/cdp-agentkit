from web3 import Web3

from coinbase_agentkit.wallet_providers import EvmWalletProvider

ERC20_APPROVE_ABI = [
    {
        "inputs": [
            {"name": "spender", "type": "address"},
            {"name": "amount", "type": "uint256"},
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function",
    }
]


def approve(wallet: EvmWalletProvider, token_address: str, spender_address: str, amount: int):
    """Approve a spender to spend tokens on behalf of the owner."""
    try:
        contract = Web3().eth.contract(address=token_address, abi=ERC20_APPROVE_ABI)
        encoded_data = contract.encode_abi("approve", args=[spender_address, amount])

        params = {
            "to": token_address,
            "data": encoded_data,
        }

        hash = wallet.send_transaction(params)
        receipt = wallet.wait_for_transaction_receipt(hash)

        return receipt
    except Exception as e:
        return f"Error approving tokens: {e!s}"
