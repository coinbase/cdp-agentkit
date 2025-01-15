from collections.abc import Callable
from decimal import Decimal

from cdp import Asset, Wallet
from pydantic import BaseModel

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.morpho.constants import BLUE_ABI, MORPHO_BASE_ADDRESS


class MorphoWithdrawCollateralInput(BaseModel):
    """Input schema for Morpho Markets withdraw collateral action."""

    market_params: dict
    assets: str
    on_behalf: str
    receiver: str


WITHDRAW_COLLATERAL_PROMPT = """
This tool allows withdrawing collateral from a Morpho market. It takes:

- market_params: The market parameters including:
  - loanToken: The address of the loan token
  - collateralToken: The address of the collateral token
  - oracle: The address of the oracle
  - irm: The address of the interest rate model
  - lltv: The liquidation LTV (loan-to-value ratio)
- assets: The amount of collateral to withdraw in whole units
  Examples for WETH:
  - 1 WETH
  - 0.1 WETH
  - 0.01 WETH
- on_behalf: The address to withdraw collateral from
- receiver: The address to receive the withdrawn collateral
"""


def withdraw_collateral_from_morpho(
    wallet: Wallet,
    market_params: dict,
    assets: str,
    on_behalf: str,
    receiver: str,
) -> str:
    """Withdraw collateral from a Morpho market.

    Args:
        wallet (Wallet): The wallet to execute the withdrawal from
        market_params (dict): The market parameters
        assets (str): The amount of assets to withdraw in whole units (e.g., 0.01 WETH)
        on_behalf (str): The address to withdraw collateral from
        receiver (str): The address to receive the withdrawn collateral

    Returns:
        str: A success message with transaction hash or error message
    """
    if float(assets) <= 0:
        return "Error: Assets amount must be greater than 0"

    try:
        token_asset = Asset.fetch(wallet.network_id, market_params["collateralToken"])
        atomic_assets = str(int(token_asset.to_atomic_amount(Decimal(assets))))

        withdraw_args = {
            "marketParams": market_params,
            "assets": atomic_assets,
            "onBehalf": on_behalf,
            "receiver": receiver,
        }

        invocation = wallet.invoke_contract(
            contract_address=MORPHO_BASE_ADDRESS,
            method="withdrawCollateral",
            abi=BLUE_ABI,
            args=withdraw_args,
        ).wait()

        return f"Withdrawn {assets} collateral from Morpho market with transaction hash: {invocation.transaction_hash} and transaction link: {invocation.transaction_link}"

    except Exception as e:
        return f"Error withdrawing collateral from Morpho Blue: {e!s}"


class MorphoWithdrawCollateralAction(CdpAction):
    """Morpho Blue withdraw collateral action."""

    name: str = "morpho_withdraw_collateral"
    description: str = WITHDRAW_COLLATERAL_PROMPT
    args_schema: type[BaseModel] = MorphoWithdrawCollateralInput
    func: Callable[..., str] = withdraw_collateral_from_morpho
