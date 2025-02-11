"""Tests for CDP API faucet funds action."""
from unittest.mock import patch, Mock

import pytest

from coinbase_agentkit.action_providers.cdp.cdp_api_action_provider import (
    cdp_api_action_provider,
    RequestFaucetFundsInput,
)
from coinbase_agentkit.network import Network
from .conftest import (
    MOCK_EXPLORER_URL,
    MOCK_TX_HASH,
)


def test_request_faucet_funds_input_model_valid():
    """Test that RequestFaucetFundsInput accepts valid parameters."""
    # Test with asset_id
    input_model = RequestFaucetFundsInput(asset_id="eth")
    assert input_model.asset_id == "eth"

    # Test without asset_id (should be optional)
    input_model = RequestFaucetFundsInput()
    assert input_model.asset_id is None


@pytest.mark.usefixtures("mock_env")
def test_request_faucet_funds_success(mock_wallet, mock_transaction):
    """Test successful faucet request."""
    provider = cdp_api_action_provider()

    with patch("cdp.ExternalAddress") as mock_address:
        mock_address.return_value.faucet.return_value = mock_transaction

        response = provider.request_faucet_funds(mock_wallet, {})
        assert response == f"Received ETH from the faucet. Transaction: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"
        mock_address.return_value.faucet.assert_called_with(None)

        response = provider.request_faucet_funds(mock_wallet, {"asset_id": "eth"})
        assert response == f"Received eth from the faucet. Transaction: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"
        mock_address.assert_called_with("base-sepolia", mock_wallet.get_address())
        mock_address.return_value.faucet.assert_called_with("eth")

        response = provider.request_faucet_funds(mock_wallet, {"asset_id": "usdc"})
        assert response == f"Received usdc from the faucet. Transaction: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"
        mock_address.return_value.faucet.assert_called_with("usdc")


@pytest.mark.usefixtures("mock_env")
def test_request_faucet_funds_wrong_network():
    """Test faucet request fails on wrong network."""
    provider = cdp_api_action_provider()
    wallet = Mock()
    wallet.get_network.return_value = Network(
        protocol_family="evm",
        network_id="base-mainnet",
        chain_id=8453
    )

    response = provider.request_faucet_funds(wallet, {})
    assert response == "Error: Faucet is only available on base-sepolia network"


@pytest.mark.usefixtures("mock_env")
def test_request_faucet_funds_failure(mock_wallet):
    """Test faucet request when error occurs."""
    provider = cdp_api_action_provider()

    with patch("cdp.ExternalAddress") as mock_address:
        mock_address.return_value.faucet.side_effect = Exception("Faucet request failed")

        response = provider.request_faucet_funds(mock_wallet, {})
        assert response == "Error requesting faucet funds: Faucet request failed"
        mock_address.assert_called_with("base-sepolia", mock_wallet.get_address())
        mock_address.return_value.faucet.assert_called_with(None)
