from cdp import Wallet, SmartContract
from .abi import IPAIR_V2_ABI


def get_amount_out(wallet: Wallet, pair_address: str, token_in_address: str, token_in_amount: str) -> int | None:
    """Get the amount of token out for a given amount of token in."""
    try:
        # Get the token in and token out addresses
        token_out_amount = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=pair_address,
            method="getAmountOut",
            abi=IPAIR_V2_ABI,
            args={
                "amountIn": token_in_amount,
                "tokenIn": token_in_address,
            }
        )
        if not isinstance(token_out_amount, int):
            raise TypeError("Token out amount must be an integer")
        return token_out_amount
    except Exception as e:
        print(f"Error getting amount out from AMM: {e}")
        return None
