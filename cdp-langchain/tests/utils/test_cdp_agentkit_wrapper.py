"""Tests for the CDP Agentkit Wrapper."""

import json
from typing import Any
from unittest.mock import Mock, patch

import pytest
from pydantic import ValidationError

from cdp import Cdp, Wallet, WalletData
from cdp_langchain.utils import CdpAgentkitWrapper


@pytest.fixture
def mock_cdp_configure():
    """Fixture for mocked CDP SDK."""
    with patch("cdp.Cdp.configure") as mock_cdp:
        mock_cdp_instance = Mock(spec=Cdp)
        mock_cdp.return_value = mock_cdp_instance
        yield mock_cdp


@pytest.fixture
def mock_wallet_create():
    """Fixture for mocked CDP SDK Wallet creation."""
    with patch("cdp.Wallet.create") as mock_wallet:
        mock_wallet_instance = Mock(spec=Wallet)
        mock_wallet.return_value = mock_wallet_instance
        yield mock_wallet


@pytest.fixture
def mock_wallet_import_data():
    """Fixture for mocked CDP SDK Wallet import data."""
    with patch("cdp.Wallet.import_data") as mock_wallet:
        mock_wallet_instance = Mock(spec=Wallet)
        mock_wallet.return_value = mock_wallet_instance
        yield mock_wallet


@pytest.fixture
def env_vars(monkeypatch: pytest.MonkeyPatch):
    """Fixture to set environment variables."""
    test_vars = {
        "CDP_API_KEY_NAME": "test-cdp-api-key-name",
        "CDP_API_KEY_PRIVATE_KEY": "test-cdp-api-key-private-key",
        "NETWORK_ID": "base-sepolia",
    }
    for key, value in test_vars.items():
        monkeypatch.setenv(key, value)
    return test_vars


def test_initialization_with_env_vars(
    env_vars: dict[str, str], mock_cdp_configure: Mock, mock_wallet_create: Mock
):
    """Test initialization with environment variables."""
    wrapper = CdpAgentkitWrapper()

    assert wrapper.cdp_api_key_name == env_vars["CDP_API_KEY_NAME"]
    assert wrapper.cdp_api_key_private_key == env_vars["CDP_API_KEY_PRIVATE_KEY"]
    assert wrapper.network_id == env_vars["NETWORK_ID"]
    assert wrapper.wallet is not None

    mock_cdp_configure.assert_called_once_with(
        env_vars["CDP_API_KEY_NAME"], env_vars["CDP_API_KEY_PRIVATE_KEY"]
    )

    mock_wallet_create.assert_called_once_with(network_id=env_vars["NETWORK_ID"])


def test_initialization_with_direct_values(mock_cdp_configure: Mock, mock_wallet_create: Mock):
    """Test initialization with directly provided values."""
    test_values = {
        "cdp_api_key_name": "test-cdp-api-key-name",
        "cdp_api_key_private_key": "test-cdp-api-key-private-key",
        "network_id": "base-sepolia",
    }

    wrapper = CdpAgentkitWrapper(**test_values)

    assert wrapper.cdp_api_key_name == test_values["cdp_api_key_name"]
    assert wrapper.cdp_api_key_private_key == test_values["cdp_api_key_private_key"]
    assert wrapper.network_id == test_values["network_id"]

    mock_cdp_configure.assert_called_once_with(
        test_values["cdp_api_key_name"], test_values["cdp_api_key_private_key"]
    )

    mock_wallet_create.assert_called_once_with(network_id=test_values["network_id"])


def test_initialization_with_direct_values_and_persisted_wallet(
    mock_cdp_configure: Mock,
    mock_wallet_import_data: Mock,
):
    """Test initialization with directly provided values and persisted wallet."""
    wallet_data = WalletData(wallet_id="test-wallet-id", seed="test-seed")

    test_values = {
        "cdp_api_key_name": "test-cdp-api-key-name",
        "cdp_api_key_private_key": "test-cdp-api-key-private-key",
        "network_id": "base-sepolia",
        "cdp_wallet_data": json.dumps(wallet_data.to_dict()),
    }

    wrapper = CdpAgentkitWrapper(**test_values)

    assert wrapper.cdp_api_key_name == test_values["cdp_api_key_name"]
    assert wrapper.cdp_api_key_private_key == test_values["cdp_api_key_private_key"]
    assert wrapper.network_id == test_values["network_id"]

    mock_cdp_configure.assert_called_once_with(
        test_values["cdp_api_key_name"], test_values["cdp_api_key_private_key"]
    )

    mock_wallet_import_data.assert_called_once()


def test_missing_environment_variables(monkeypatch: pytest.MonkeyPatch):
    """Test initialization with missing environment variables."""
    # Clear environment variables
    monkeypatch.delenv("CDP_API_KEY_NAME", raising=False)
    monkeypatch.delenv("CDP_API_KEY_PRIVATE_KEY", raising=False)
    monkeypatch.delenv("NETWORK_ID", raising=False)

    with pytest.raises(ValidationError):
        CdpAgentkitWrapper()


def test_cdp_sdk_import_error():
    """Test handling of missing CDP SDK."""
    with patch.dict("sys.modules", {"cdp": None}):
        with pytest.raises(ImportError) as exc_info:
            CdpAgentkitWrapper()

        assert "CDP SDK is not installed" in str(exc_info.value)


@pytest.mark.parametrize(
    "mode,kwargs,mock_path,expected_result",
    [
        (
            "get_wallet_details",
            {},
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.get_wallet_details_wrapper",
            "Got wallet details successfully",
        ),
        (
            "get_balance",
            {"asset_id": "usdc"},
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.get_balance_wrapper",
            "Got balance successfully",
        ),
        (
            "request_faucet_funds",
            {},
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.request_faucet_funds_wrapper",
            "Requested assets from faucet successfully",
        ),
        (
            "transfer",
            {
                "amount": "0.01",
                "asset_id": "usdc",
                "destination": "example.base.eth",
                "gasless": True,
            },
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.transfer_wrapper",
            "Transferred successfully",
        ),
        (
            "trade",
            {
                "amount": "0.01",
                "from_asset_id": "usdc",
                "to_asset_id": "weth",
            },
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.trade_wrapper",
            "Traded successfully",
        ),
        (
            "deploy_token",
            {
                "name": "Test Token",
                "symbol": "TOKEN",
                "total_supply": "1000000",
            },
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.deploy_token_wrapper",
            "Deployed token successfully",
        ),
        (
            "mint_nft",
            {
                "contract_address": "0xvalidContractAddress",
                "destination": "0xvalidAddress",
            },
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.mint_nft_wrapper",
            "Minted NFT successfully",
        ),
        (
            "deploy_nft",
            {
                "name": "test-nft-name",
                "symbol": "TEST",
                "base_uri": "https://www.test.xyz/metadata/",
            },
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.deploy_nft_wrapper",
            "Minted NFT successfully",
        ),
        (
            "register_basename",
            {
                "basename": "test-basename",
            },
            "langchain_cdp.utils.cdp_agentkit_wrapper.CdpAgentkitWrapper.register_basename_wrapper",
            "Registered basename successfully",
        ),
    ],
)
def test_run_valid_modes(
    env_vars: dict[str, str],
    mock_cdp_configure: Mock,
    mock_wallet_create: Mock,
    mode: str,
    kwargs: dict[str, Any],
    mock_path: str,
    expected_result: str,
):
    """Test run method with valid modes."""
    with patch(mock_path, return_value=expected_result) as mock_action:
        wrapper = CdpAgentkitWrapper()
        result = wrapper.run(mode, **kwargs)
        assert result == expected_result
        mock_action.assert_called_once_with(**kwargs)


def test_run_invalid_mode(
    env_vars: dict[str, str], mock_cdp_configure: Mock, mock_wallet_create: Mock
):
    """Test run method with invalid mode."""
    wrapper = CdpAgentkitWrapper()

    with pytest.raises(ValueError) as exc_info:
        wrapper.run("invalid_mode")

    assert "Invalid mode" in str(exc_info.value)


def test_cdp_configuration_error(
    env_vars: dict[str, str], mock_cdp_configure: Mock, mock_wallet_create: Mock
):
    """Test handling of CDP configuration errors."""
    mock_cdp_configure.side_effect = Exception("Configuration error")

    with pytest.raises(Exception) as exc_info:
        CdpAgentkitWrapper()

    assert "Configuration error" in str(exc_info.value)
