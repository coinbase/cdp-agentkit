from collections.abc import Callable

from cdp import Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions import CdpAction

TRANSFER_PROMPT = """
This tool will transfer an asset from the wallet to another onchain address. It takes the amount, the asset ID to transfer, the destination to send the funds (either an onchain address, an ENS `example.eth`, or Basename `example.base.eth`), and whether to do a gasless transfer as inputs. The gasless option is available on `base-sepolia` and `base-mainnet` networks for `usdc` asset only. Always use the gasless option when it is available. Always use the asset ID `usdc` when attempting to transfer USDC. Always ensure that you have enough balance of the input asset ID to complete the transfer."""


class TransferInput(BaseModel):
    """Input argument schema for transfer action."""

    amount: str = Field(
        ..., description="The amount of the asset to transfer, e.g. `15`, `0.000001`"
    )
    asset_id: str = Field(
        ...,
        description="The asset ID to transfer, e.g. `eth`, `0x036CbD53842c5426634e7929541eC2318f3dCF7e`",
    )
    destination: str = Field(
        ...,
        description="The destination to transfer the funds, e.g. `0x58dBecc0894Ab4C24F98a0e684c989eD07e4e027`, `example.eth`, `example.base.eth`",
    )
    gasless: bool = Field(
        default=False,
        description="whether to do a gasless transfer (gasless is available on Base Sepolia and Mainnet for USDC) Always do the gasless option when it is available.",
    )


def transfer(
    wallet: Wallet, amount: str, asset_id: str, destination: str, gasless: bool = False
) -> str:
    """Transfer a specified amount of an asset to a destination onchain. USDC Transfers on Base Sepolia and Mainnet can be gasless. Always use the gasless option when available.

    Args:
        wallet (Wallet): The wallet to transfer the asset from.
        amount (str): The amount of the asset to transfer, e.g. `15`, `0.000001`.
        asset_id (str): The asset ID to transfer (e.g., "eth", "usdc", or a valid contract address like "0x036CbD53842c5426634e7929541eC2318f3dCF7e").
        destination (str): The destination to transfer the funds (e.g. `0x58dBecc0894Ab4C24F98a0e684c989eD07e4e027`, `example.eth`, `example.base.eth`).
        gasless (bool): Whether to send a gasless transfer (Defaults to False.).

    Returns:
        str: A message containing the transfer details.

    """
    try:
        transfer_result = wallet.transfer(
            amount=amount, asset_id=asset_id, destination=destination, gasless=gasless
        ).wait()
    except Exception as e:
        return f"Error transferring the asset {e!s}"

    return f"Transferred {amount} of {asset_id} to {destination}.\nTransaction hash for the transfer: {transfer_result.transaction_hash}\nTransaction link for the transfer: {transfer_result.transaction_link}"


class TransferAction(CdpAction):
    """Transfer action."""

    name: str = "transfer"
    description: str = TRANSFER_PROMPT
    args_schema: type[BaseModel] | None = TransferInput
    func: Callable[..., str] = transfer
