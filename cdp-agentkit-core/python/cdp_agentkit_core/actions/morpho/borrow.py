from collections.abc import Callable
from decimal import Decimal

from cdp import Asset, Wallet
from pydantic import BaseModel

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.morpho.constants import BLUE_ABI, MORPHO_BASE_ADDRESS
from cdp_agentkit_core.actions.morpho.utils import approve


class MorphoBorrowInput(BaseModel):
    """Input schema for Morpho Markets borrow action."""

    market_params: dict
    assets: str
    shares: str
    on_behalf: str
    receiver: str


BORROW_PROMPT = """
This tool allows borrowing assets from a Morpho market. It takes:

- market_params: The market parameters including:
  - loanToken: The address of the loan token
  - collateralToken: The address of the collateral token
  - oracle: The address of the oracle
  - irm: The address of the interest rate model
  - lltv: The liquidation LTV (loan-to-value ratio)
- assets: The amount of assets to borrow in whole units
  Examples for WETH:
  - 1 WETH
  - 0.1 WETH
  - 0.01 WETH
- shares: The amount of shares to borrow (use "0" to borrow using assets amount)
- on_behalf: The address to borrow on behalf of
- receiver: The address to receive the borrowed assets
"""


def borrow_from_morpho(
    wallet: Wallet,
    market_params: dict,
    assets: str,
    shares: str,
    on_behalf: str,
    receiver: str,
) -> str:
    """Borrow assets from a Morpho market.

    Args:
        wallet (Wallet): The wallet to execute the borrow from
        market_params (dict): The market parameters
        assets (str): The amount of assets to borrow in whole units (e.g., 0.01 WETH)
        shares (str): The amount of shares to borrow
        on_behalf (str): The address to borrow on behalf of
        receiver (str): The address to receive the borrowed assets

    Returns:
        str: A success message with transaction hash or error message
    """

    if (assets == "0" and shares == "0") or (assets != "0" and shares != "0"):
        return "Error: Exactly one of 'assets' or 'shares' must be zero, the other number has to be positive"

    try:
        # TODO We are going to need to verify that a collateral position has been provided.

        token_asset = Asset.fetch(wallet.network_id, market_params["loanToken"])
        # Validate that exactly one of assets or shares is zero

        atomic_assets = (
            str(int(token_asset.to_atomic_amount(Decimal(assets)))) if assets != "0" else "0"
        )
        atomic_shares = (
            str(int(token_asset.to_atomic_amount(Decimal(shares)))) if shares != "0" else "0"
        )
        borrow_args = {
            "marketParams": market_params,
            "assets": atomic_assets,
            "shares": atomic_shares,
            "onBehalf": on_behalf,
            "receiver": receiver,
        }

        invocation = wallet.invoke_contract(
            contract_address=MORPHO_BASE_ADDRESS,
            method="borrow",
            abi=BLUE_ABI,
            args=borrow_args,
        ).wait()

        return f"Borrowed {assets} from Morpho market with transaction hash: {invocation.transaction_hash} and transaction link: {invocation.transaction_link}"

    except Exception as e:
        return f"Error borrowing from Morpho Blue: {e!s}"


class MorphoBorrowAction(CdpAction):
    """Morpho Blue borrow action."""

    name: str = "morpho_borrow"
    description: str = BORROW_PROMPT
    args_schema: type[BaseModel] = MorphoBorrowInput
    func: Callable[..., str] = borrow_from_morpho
