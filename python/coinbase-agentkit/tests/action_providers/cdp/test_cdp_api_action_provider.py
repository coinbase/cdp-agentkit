"""Tests for CDP API action provider."""
import os
from unittest.mock import patch

import pytest

from coinbase_agentkit.action_providers.cdp.cdp_api_action_provider import cdp_api_action_provider
from coinbase_agentkit.network import Network
from coinbase_agentkit.wallet_providers.cdp_wallet_provider import CdpProviderConfig

from .conftest import (
    MOCK_API_KEY_NAME,
    MOCK_API_KEY_PRIVATE_KEY,
)


@pytest.mark.usefixtures("mock_env")
def test_provider_init_with_env_vars():
    """Test provider initialization with environment variables."""
    with patch("cdp.Cdp") as mock_cdp:
        _ = cdp_api_action_provider()
        mock_cdp.configure.assert_called_once_with(
            api_key_name=MOCK_API_KEY_NAME,
            private_key=MOCK_API_KEY_PRIVATE_KEY,
        )


def test_provider_init_with_config():
    """Test provider initialization with config."""
    with patch("cdp.Cdp") as mock_cdp:
        config = CdpProviderConfig(
            api_key_name=MOCK_API_KEY_NAME,
            api_key_private_key=MOCK_API_KEY_PRIVATE_KEY
        )
        _ = cdp_api_action_provider(config)
        mock_cdp.configure.assert_called_once_with(
            api_key_name=MOCK_API_KEY_NAME,
            private_key=MOCK_API_KEY_PRIVATE_KEY,
        )


@pytest.mark.usefixtures("mock_env")
def test_provider_init_without_config():
    """Test provider initialization without config."""
    with patch("cdp.Cdp") as mock_cdp:
        _ = cdp_api_action_provider()
        mock_cdp.configure.assert_called_once_with(
            api_key_name=MOCK_API_KEY_NAME,
            private_key=MOCK_API_KEY_PRIVATE_KEY,
        )


def test_provider_init_missing_credentials():
    """Test provider initialization with missing credentials falls back to configure_from_json."""
    with (
        patch("cdp.Cdp") as mock_cdp,
        patch.dict(os.environ, {}, clear=True),
    ):
        _ = cdp_api_action_provider()
        mock_cdp.configure_from_json.assert_called_once()


def test_provider_init_import_error():
    """Test provider initialization fails with import error."""
    with (
        patch.dict("sys.modules", {"cdp": None}),
        pytest.raises(ImportError, match="Failed to import cdp. Please install it with 'pip install cdp-sdk'."),
    ):
        cdp_api_action_provider()


@pytest.mark.usefixtures("mock_env")
def test_supports_network():
    """Test network support."""
    with patch("cdp.Cdp"):
        provider = cdp_api_action_provider()
        assert provider.supports_network(Network(protocol_family="evm", chain_id=1)) is True
        assert provider.supports_network(Network(protocol_family="solana")) is True
