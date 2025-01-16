from collections.abc import Callable
from decimal import Decimal
from typing import TypedDict

from cdp import Asset, Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.morpho.constants import BLUE_ABI, MORPHO_BASE_ADDRESS
from cdp_agentkit_core.actions.morpho.utils import approve


# Define the structure for market parameters
class MarketParams(TypedDict):
    """Type definition for Morpho market parameters."""

    loanToken: str  # address
    collateralToken: str  # address
    oracle: str  # address
    irm: str  # address
    lltv: str  # uint256


class MorphoRepayInput(BaseModel):
    """Input schema for Morpho Markets repay action."""

    market_params: MarketParams = Field(
        ...,
        description="Market parameters including loan token, collateral token, oracle, irm, and lltv addresses",
    )
    assets: str
    shares: str
    on_behalf: str


REPAY_PROMPT = """
This tool allows repaying borrowed assets to a Morpho market. It takes:

- market_params: The market parameters including:
  - loanToken: The address of the loan token
  - collateralToken: The address of the collateral token
  - oracle: The address of the oracle
  - irm: The address of the interest rate model
  - lltv: The liquidation LTV (loan-to-value ratio)
- assets: The amount of assets to repay in whole units
  Examples for WETH:
  - 1 WETH
  - 0.1 WETH
  - 0.01 WETH
- shares: The amount of shares to repay (use "0" to repay using assets amount)
- on_behalf: The address to repay on behalf of
"""


def repay_to_morpho(
    wallet: Wallet,
    market_params: dict,
    assets: str,
    shares: str,
    on_behalf: str,
) -> str:
    """Repay assets to a Morpho market.

    Args:
        wallet (Wallet): The wallet to execute the repay from
        market_params (dict): The market parameters
        assets (str): The amount of assets to repay in whole units (e.g., 0.01 WETH)
        shares (str): The amount of shares to repay
        on_behalf (str): The address to repay on behalf of

    Returns:
        str: A success message with transaction hash or error message
    """
    if (assets == "0" and shares == "0") or (assets != "0" and shares != "0"):
        return "Error: Exactly one of 'assets' or 'shares' must be zero, the other number has to be positive"

    try:
        token_asset = Asset.fetch(wallet.network_id, market_params["loanToken"])

        atomic_assets = (
            str(int(token_asset.to_atomic_amount(Decimal(assets)))) if assets != "0" else "0"
        )
        atomic_shares = (
            str(int(token_asset.to_atomic_amount(Decimal(shares)))) if shares != "0" else "0"
        )

        # Approve spending of tokens by Morpho if repaying with assets
        if atomic_assets != "0":
            approval_response = approve(
                wallet, market_params["loanToken"], MORPHO_BASE_ADDRESS, atomic_assets
            )
            if approval_response.startswith("Error"):  # Check if approval failed
                return f"Error repaying to Morpho Blue: {approval_response}"

        # Convert market_params dictionary to the required tuple format
        market_params_tuple = [
            market_params["loanToken"],
            market_params["collateralToken"],
            market_params["oracle"],
            market_params["irm"],
            str(market_params["lltv"]),  # Convert lltv to int for uint256
        ]

        repay_args = {
            "marketParams": market_params_tuple,
            "assets": atomic_assets,
            "shares": atomic_shares,
            "onBehalf": on_behalf,
            "data": "0x",  # Empty bytes
        }

        invocation = wallet.invoke_contract(
            contract_address=MORPHO_BASE_ADDRESS,
            method="repay",
            abi=BLUE_ABI,
            args=repay_args,
        ).wait()

        return f"Repaid {assets if assets != '0' else shares + ' shares'} to Morpho market with transaction hash: {invocation.transaction_hash} and transaction link: {invocation.transaction_link}"

    except Exception as e:
        return f"Error repaying to Morpho Blue: {e!s}"


class MorphoRepayAction(CdpAction):
    """Morpho Blue repay action."""

    name: str = "morpho_repay"
    description: str = REPAY_PROMPT
    args_schema: type[BaseModel] = MorphoRepayInput
    func: Callable[..., str] = repay_to_morpho
