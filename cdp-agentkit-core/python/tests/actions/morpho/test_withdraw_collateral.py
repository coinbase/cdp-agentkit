from decimal import Decimal
from unittest.mock import patch

import pytest

from cdp_agentkit_core.actions.morpho.constants import BLUE_ABI, MORPHO_BASE_ADDRESS
from cdp_agentkit_core.actions.morpho.withdraw_collateral import (
    MorphoWithdrawCollateralInput,
    withdraw_collateral_from_morpho,
)

MOCK_NETWORK_ID = "base"
MOCK_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890"
MOCK_RECEIVER_ADDRESS = "0x2234567890123456789012345678901234567890"
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


def test_withdraw_collateral_input_model_valid():
    """Test that MorphoWithdrawCollateralInput accepts valid parameters."""
    input_model = MorphoWithdrawCollateralInput(
        market_params=MOCK_MARKET_PARAMS,
        assets=MOCK_ASSETS,
        on_behalf=MOCK_WALLET_ADDRESS,
        receiver=MOCK_RECEIVER_ADDRESS,
    )

    assert input_model.market_params == MOCK_MARKET_PARAMS
    assert input_model.assets == MOCK_ASSETS
    assert input_model.on_behalf == MOCK_WALLET_ADDRESS
    assert input_model.receiver == MOCK_RECEIVER_ADDRESS


def test_withdraw_collateral_input_model_missing_params():
    """Test that MorphoWithdrawCollateralInput raises error when params are missing."""
    with pytest.raises(ValueError):
        MorphoWithdrawCollateralInput()


def test_withdraw_collateral_success(wallet_factory, contract_invocation_factory, asset_factory):
    """Test successful withdraw collateral with valid parameters."""
    mock_wallet = wallet_factory()
    mock_contract_instance = contract_invocation_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    mock_asset = asset_factory(decimals=MOCK_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.morpho.withdraw_collateral.Asset.fetch",
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
        action_response = withdraw_collateral_from_morpho(
            mock_wallet,
            MOCK_MARKET_PARAMS,
            MOCK_ASSETS,
            MOCK_WALLET_ADDRESS,
            MOCK_RECEIVER_ADDRESS,
        )

        expected_response = f"Withdrawn {MOCK_ASSETS} collateral from Morpho market with transaction hash: {mock_contract_instance.transaction_hash} and transaction link: {mock_contract_instance.transaction_link}"
        assert action_response == expected_response

        mock_get_asset.assert_called_once_with(
            MOCK_NETWORK_ID, MOCK_MARKET_PARAMS["collateralToken"]
        )

        mock_to_atomic_amount.assert_called_once_with(Decimal(MOCK_ASSETS))

        mock_invoke.assert_called_once_with(
            contract_address=MORPHO_BASE_ADDRESS,
            method="withdrawCollateral",
            abi=BLUE_ABI,
            args={
                "marketParams": [
                    MOCK_MARKET_PARAMS["loanToken"],
                    MOCK_MARKET_PARAMS["collateralToken"],
                    MOCK_MARKET_PARAMS["oracle"],
                    MOCK_MARKET_PARAMS["irm"],
                    str(MOCK_MARKET_PARAMS["lltv"]),
                ],
                "assets": MOCK_ASSETS_WEI,
                "onBehalf": MOCK_WALLET_ADDRESS,
                "receiver": MOCK_RECEIVER_ADDRESS,
            },
        )
        mock_contract_wait.assert_called_once_with()


def test_withdraw_collateral_api_error(wallet_factory, asset_factory):
    """Test withdraw collateral when API error occurs."""
    mock_wallet = wallet_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    mock_asset = asset_factory(decimals=MOCK_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.morpho.withdraw_collateral.Asset.fetch",
            return_value=mock_asset,
        ) as mock_get_asset,
        patch.object(
            mock_asset, "to_atomic_amount", return_value=MOCK_ASSETS_WEI
        ) as mock_to_atomic_amount,
        patch.object(mock_wallet, "invoke_contract", side_effect=Exception("API error")),
    ):
        action_response = withdraw_collateral_from_morpho(
            mock_wallet,
            MOCK_MARKET_PARAMS,
            MOCK_ASSETS,
            MOCK_WALLET_ADDRESS,
            MOCK_RECEIVER_ADDRESS,
        )

        expected_response = "Error withdrawing collateral from Morpho Blue: API error"
        assert action_response == expected_response

        mock_get_asset.assert_called_once_with(
            MOCK_NETWORK_ID, MOCK_MARKET_PARAMS["collateralToken"]
        )

        mock_to_atomic_amount.assert_called_once_with(Decimal(MOCK_ASSETS))


def test_withdraw_collateral_invalid_assets(wallet_factory):
    """Test withdraw collateral with invalid assets amount."""
    mock_wallet = wallet_factory()

    response = withdraw_collateral_from_morpho(
        mock_wallet,
        MOCK_MARKET_PARAMS,
        "0",
        MOCK_WALLET_ADDRESS,
        MOCK_RECEIVER_ADDRESS,
    )
    assert response == "Error: Assets amount must be greater than 0"
