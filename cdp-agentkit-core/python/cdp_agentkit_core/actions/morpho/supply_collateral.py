from collections.abc import Callable
from decimal import Decimal

from cdp import Asset, Wallet
from pydantic import BaseModel

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.morpho.constants import BLUE_ABI, MORPHO_BASE_ADDRESS
from cdp_agentkit_core.actions.morpho.utils import approve


class MorphoSupplyCollateralInput(BaseModel):
    """Input schema for Morpho Markets supply collateral action."""

    market_params: dict
    assets: str
    on_behalf: str


SUPPLY_COLLATERAL_PROMPT = """
This tool allows supplying collateral to a Morpho market. It takes:

- market_params: The market parameters including:
  - loanToken: The address of the loan token
  - collateralToken: The address of the collateral token
  - oracle: The address of the oracle
  - irm: The address of the interest rate model
  - lltv: The liquidation LTV (loan-to-value ratio)
- assets: The amount of collateral to supply in whole units
  Examples for WETH:
  - 1 WETH
  - 0.1 WETH
  - 0.01 WETH
- on_behalf: The address to supply collateral for
"""


def supply_collateral_to_morpho(
    wallet: Wallet,
    market_params: dict,
    assets: str,
    on_behalf: str,
) -> str:
    """Supply collateral to a Morpho market.

    Args:
        wallet (Wallet): The wallet to execute the supply from
        market_params (dict): The market parameters
        assets (str): The amount of assets to supply in whole units (e.g., 0.01 WETH)
        on_behalf (str): The address to supply collateral for

    Returns:
        str: A success message with transaction hash or error message
    """
    if float(assets) <= 0:
        return "Error: Assets amount must be greater than 0"

    if market_params["collateralToken"] == "0x0000000000000000000000000000000000000000":
        return "Error: Can't supply collateral to 'idle' markets"

    try:
        token_asset = Asset.fetch(wallet.network_id, market_params["collateralToken"])
        atomic_assets = str(int(token_asset.to_atomic_amount(Decimal(assets))))

        # Approve Morpho Blue contract to spend tokens
        approval_result = approve(
            wallet, market_params["collateralToken"], MORPHO_BASE_ADDRESS, atomic_assets
        )
        if approval_result.startswith("Error"):
            return f"Error approving Morpho Blue as spender: {approval_result}"

        supply_args = {
            "marketParams": market_params,
            "assets": atomic_assets,
            "onBehalf": on_behalf,
            "data": "0x",  # Empty bytes
        }

        invocation = wallet.invoke_contract(
            contract_address=MORPHO_BASE_ADDRESS,
            method="supplyCollateral",
            abi=BLUE_ABI,
            args=supply_args,
        ).wait()

        return f"Supplied {assets} as collateral to Morpho market with transaction hash: {invocation.transaction_hash} and transaction link: {invocation.transaction_link}"

    except Exception as e:
        return f"Error supplying collateral to Morpho Blue: {e!s}"


class MorphoSupplyCollateralAction(CdpAction):
    """Morpho Blue supply collateral action."""

    name: str = "morpho_supply_collateral"
    description: str = SUPPLY_COLLATERAL_PROMPT
    args_schema: type[BaseModel] = MorphoSupplyCollateralInput
    func: Callable[..., str] = supply_collateral_to_morpho
