from unittest.mock import MagicMock, patch

import pytest

from coinbase_agentkit.action_providers.compound.compound_action_provider import (
    CompoundActionProvider,
)


@pytest.fixture
def wallet():
    """Fixture to create a mock wallet for testing."""
    mock_wallet = MagicMock()
    mock_wallet.get_address.return_value = "0xWallet"
    mock_network = MagicMock()
    mock_network.network_id = 1
    mock_network.protocol_family = "evm"
    mock_wallet.get_network.return_value = mock_network
    return mock_wallet

def test_get_portfolio_success(wallet):
    """Test that the get_portfolio action returns the expected markdown details."""
    provider = CompoundActionProvider()
    # Override the internal getter to return a dummy Comet address.
    provider._get_comet_address = lambda network: "0xComet"

    input_args = {"comet_address": "dummy", "account": "0xWallet"}  # These args are ignored by the implementation.

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_portfolio_details_markdown") as mock_get_portfolio_details:
        mock_get_portfolio_details.return_value = "Portfolio Details Markdown"

        result = provider.get_portfolio(wallet, input_args)

        # Verify that get_portfolio_details_markdown was called with the correct parameters.
        mock_get_portfolio_details.assert_called_once_with(wallet, "0xComet")
        assert result == "Portfolio Details Markdown"

def test_get_portfolio_failure(wallet):
    """Test that the get_portfolio action returns an error message if portfolio details fail."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"

    input_args = {}

    with patch(
        "coinbase_agentkit.action_providers.compound.compound_action_provider.get_portfolio_details_markdown",
        side_effect=Exception("Test error")
    ):
        result = provider.get_portfolio(wallet, input_args)

        assert "Error getting portfolio details:" in result
        assert "Test error" in result
