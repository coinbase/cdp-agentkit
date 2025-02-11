"""Tests for CDP API faucet funds action."""

from unittest.mock import Mock, patch

from coinbase_agentkit.action_providers.cdp.cdp_api_action_provider import (
    RequestFaucetFundsInput,
    cdp_api_action_provider,
)
from coinbase_agentkit.network import Network

from .conftest import (
    MOCK_EXPLORER_URL,
    MOCK_MAINNET_CHAIN_ID,
    MOCK_MAINNET_NETWORK_ID,
    MOCK_TESTNET_NETWORK_ID,
    MOCK_TX_HASH,
)


def test_request_faucet_funds_input_with_asset_id():
    """Test that RequestFaucetFundsInput accepts asset_id parameter."""
    input_model = RequestFaucetFundsInput(asset_id="eth")
    assert input_model.asset_id == "eth"


def test_request_faucet_funds_input_without_asset_id():
    """Test that RequestFaucetFundsInput works without asset_id parameter."""
    input_model = RequestFaucetFundsInput()
    assert input_model.asset_id is None


def test_request_eth_without_asset_id(mock_testnet_wallet_provider, mock_transaction, mock_env):
    """Test requesting ETH from faucet without specifying asset_id."""
    with (
        patch("cdp.Cdp"),
        patch("cdp.ExternalAddress") as mock_address,
    ):
        mock_address.return_value.faucet.return_value = mock_transaction

        response = cdp_api_action_provider().request_faucet_funds(mock_testnet_wallet_provider, {})

        expected_response = (
            f"Received ETH from the faucet. Transaction: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"
        )
        assert response == expected_response
        mock_address.assert_called_with(
            MOCK_TESTNET_NETWORK_ID, mock_testnet_wallet_provider.get_address()
        )
        mock_address.return_value.faucet.assert_called_with(None)


def test_request_eth_with_asset_id(mock_testnet_wallet_provider, mock_transaction, mock_env):
    """Test requesting ETH from faucet with eth asset_id."""
    with (
        patch("cdp.Cdp"),
        patch("cdp.ExternalAddress") as mock_address,
    ):
        mock_address.return_value.faucet.return_value = mock_transaction

        response = cdp_api_action_provider().request_faucet_funds(
            mock_testnet_wallet_provider, {"asset_id": "eth"}
        )

        expected_response = (
            f"Received eth from the faucet. Transaction: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"
        )
        assert response == expected_response
        mock_address.assert_called_with(
            MOCK_TESTNET_NETWORK_ID, mock_testnet_wallet_provider.get_address()
        )
        mock_address.return_value.faucet.assert_called_with("eth")


def test_request_usdc(mock_testnet_wallet_provider, mock_transaction, mock_env):
    """Test requesting USDC from faucet."""
    with (
        patch("cdp.Cdp"),
        patch("cdp.ExternalAddress") as mock_address,
    ):
        mock_address.return_value.faucet.return_value = mock_transaction

        response = cdp_api_action_provider().request_faucet_funds(
            mock_testnet_wallet_provider, {"asset_id": "usdc"}
        )

        expected_response = (
            f"Received usdc from the faucet. Transaction: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"
        )
        assert response == expected_response
        mock_address.assert_called_with(
            MOCK_TESTNET_NETWORK_ID, mock_testnet_wallet_provider.get_address()
        )
        mock_address.return_value.faucet.assert_called_with("usdc")


def test_request_faucet_wrong_network(mock_env):
    """Test faucet request fails on wrong network (mainnet)."""
    with patch("cdp.Cdp"):
        wallet = Mock()
        wallet.get_network.return_value = Network(
            protocol_family="evm",
            network_id=MOCK_MAINNET_NETWORK_ID,
            chain_id=MOCK_MAINNET_CHAIN_ID,
        )

        response = cdp_api_action_provider().request_faucet_funds(wallet, {})
        assert response == "Error: Faucet is only available on base-sepolia network"


def test_request_faucet_api_error(mock_testnet_wallet_provider, mock_env):
    """Test faucet request when API error occurs."""
    with (
        patch("cdp.Cdp"),
        patch("cdp.ExternalAddress") as mock_address,
    ):
        mock_address.return_value.faucet.side_effect = Exception("Faucet request failed")

        response = cdp_api_action_provider().request_faucet_funds(mock_testnet_wallet_provider, {})

        assert response == "Error requesting faucet funds: Faucet request failed"
        mock_address.assert_called_with(
            MOCK_TESTNET_NETWORK_ID, mock_testnet_wallet_provider.get_address()
        )
        mock_address.return_value.faucet.assert_called_with(None)
