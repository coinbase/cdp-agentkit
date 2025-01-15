from decimal import Decimal
from unittest.mock import patch

import pytest

from cdp_agentkit_core.actions.morpho.constants import BLUE_ABI, MORPHO_BASE_ADDRESS
from cdp_agentkit_core.actions.morpho.supply_collateral import (
    MorphoSupplyCollateralInput,
    supply_collateral_to_morpho,
)

MOCK_NETWORK_ID = "base"
MOCK_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890"
MOCK_DECIMALS = 18
MOCK_ASSETS = "1"
MOCK_ASSETS_WEI = "1000000000000000000"

# Market parameters for the specific market
MOCK_MARKET_PARAMS = {
    "loanToken": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "collateralToken": "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    "oracle": "0x663BECd10daE6C4A3Dcd89F1d76c1174199639B9",
    "irm": "0x46415998764C29aB2a25CbeA6254146D50D22687",
    "lltv": "860000000000000000",
}


def test_supply_collateral_input_model_valid():
    """Test that MorphoSupplyCollateralInput accepts valid parameters."""
    input_model = MorphoSupplyCollateralInput(
        market_params=MOCK_MARKET_PARAMS,
        assets=MOCK_ASSETS_WEI,
        on_behalf=MOCK_WALLET_ADDRESS,
    )

    assert input_model.market_params == MOCK_MARKET_PARAMS
    assert input_model.assets == MOCK_ASSETS_WEI
    assert input_model.on_behalf == MOCK_WALLET_ADDRESS


def test_supply_collateral_input_model_missing_params():
    """Test that MorphoSupplyCollateralInput raises error when params are missing."""
    with pytest.raises(ValueError):
        MorphoSupplyCollateralInput()


def test_supply_collateral_success(wallet_factory, contract_invocation_factory, asset_factory):
    """Test successful supply collateral with valid parameters."""
    mock_wallet = wallet_factory()
    mock_contract_instance = contract_invocation_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    mock_asset = asset_factory(decimals=MOCK_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.morpho.supply_collateral.approve",
            return_value="Approval successful",
        ) as mock_approve,
        patch(
            "cdp_agentkit_core.actions.morpho.supply_collateral.Asset.fetch",
            return_value=mock_asset,
        ) as mock_get_asset,
        patch.object(
            mock_asset, "to_atomic_amount", return_value=MOCK_ASSETS_WEI
        ) as mock_to_atomic_amount,
        patch.object(
            mock_wallet, "invoke_contract", return_value=mock_contract_instance
        ) as mock_invoke,
        patch.object(
            mock_contract_instance, "wait", return_value=mock_contract_instance
        ) as mock_contract_wait,
    ):
        action_response = supply_collateral_to_morpho(
            mock_wallet,
            MOCK_MARKET_PARAMS,
            MOCK_ASSETS,
            MOCK_WALLET_ADDRESS,
        )

        expected_response = f"Supplied {MOCK_ASSETS} as collateral to Morpho market with transaction hash: {mock_contract_instance.transaction_hash} and transaction link: {mock_contract_instance.transaction_link}"
        assert action_response == expected_response

        mock_approve.assert_called_once_with(
            mock_wallet,
            MOCK_MARKET_PARAMS["collateralToken"],
            MORPHO_BASE_ADDRESS,
            MOCK_ASSETS_WEI,
        )

        mock_get_asset.assert_called_once_with(
            MOCK_NETWORK_ID, MOCK_MARKET_PARAMS["collateralToken"]
        )

        mock_to_atomic_amount.assert_called_once_with(Decimal(MOCK_ASSETS))

        mock_invoke.assert_called_once_with(
            contract_address=MORPHO_BASE_ADDRESS,
            method="supplyCollateral",
            abi=BLUE_ABI,
            args={
                "marketParams": MOCK_MARKET_PARAMS,
                "assets": MOCK_ASSETS_WEI,
                "onBehalf": MOCK_WALLET_ADDRESS,
                "data": "0x",
            },
        )
        mock_contract_wait.assert_called_once_with()


def test_supply_collateral_api_error(wallet_factory, asset_factory):
    """Test supply collateral when API error occurs."""
    mock_wallet = wallet_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    mock_asset = asset_factory(decimals=MOCK_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.morpho.supply_collateral.approve",
            return_value="Approval successful",
        ),
        patch(
            "cdp_agentkit_core.actions.morpho.supply_collateral.Asset.fetch",
            return_value=mock_asset,
        ) as mock_get_asset,
        patch.object(
            mock_asset, "to_atomic_amount", return_value=MOCK_ASSETS_WEI
        ) as mock_to_atomic_amount,
        patch.object(mock_wallet, "invoke_contract", side_effect=Exception("API error")),
    ):
        action_response = supply_collateral_to_morpho(
            mock_wallet,
            MOCK_MARKET_PARAMS,
            MOCK_ASSETS,
            MOCK_WALLET_ADDRESS,
        )

        expected_response = "Error supplying collateral to Morpho Blue: API error"
        assert action_response == expected_response

        mock_get_asset.assert_called_once_with(
            MOCK_NETWORK_ID, MOCK_MARKET_PARAMS["collateralToken"]
        )

        mock_to_atomic_amount.assert_called_once_with(Decimal(MOCK_ASSETS))


def test_supply_collateral_approval_failure(wallet_factory, asset_factory):
    """Test supply collateral when approval fails."""
    mock_wallet = wallet_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    mock_asset = asset_factory(decimals=MOCK_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.morpho.supply_collateral.approve",
            return_value="Error: Approval failed",
        ) as mock_approve,
        patch(
            "cdp_agentkit_core.actions.morpho.supply_collateral.Asset.fetch",
            return_value=mock_asset,
        ) as mock_get_asset,
        patch.object(
            mock_asset, "to_atomic_amount", return_value=MOCK_ASSETS_WEI
        ) as mock_to_atomic_amount,
    ):
        action_response = supply_collateral_to_morpho(
            mock_wallet,
            MOCK_MARKET_PARAMS,
            MOCK_ASSETS,
            MOCK_WALLET_ADDRESS,
        )

        expected_response = "Error approving Morpho Blue as spender: Error: Approval failed"
        assert action_response == expected_response

        mock_approve.assert_called_once_with(
            mock_wallet,
            MOCK_MARKET_PARAMS["collateralToken"],
            MORPHO_BASE_ADDRESS,
            MOCK_ASSETS_WEI,
        )

        mock_get_asset.assert_called_once_with(
            MOCK_NETWORK_ID, MOCK_MARKET_PARAMS["collateralToken"]
        )

        mock_to_atomic_amount.assert_called_once_with(Decimal(MOCK_ASSETS))
