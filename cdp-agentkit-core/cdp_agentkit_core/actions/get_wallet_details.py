from cdp import Wallet
from pydantic import BaseModel, Field

GET_WALLET_DETAILS_PROMPT = """
This tool will get details about the MPC Wallet."""


class GetWalletDetailsInput(BaseModel):
    """Input argument schema for get wallet details action."""

    no_input: str = Field(
        "",
        description="No input required, e.g. `` (empty string).",
    )


def get_wallet_details(wallet: Wallet) -> str:
    """Get a wallet's details.

    Args:
        wallet (Wallet): The wallet to trade the asset from.

    Returns:
        str: A message containing the wallet details.

    """
    return f"Wallet: {wallet.id} on network: {wallet.network_id} with default address: {wallet.default_address.address_id}"
