from decimal import Decimal
from unittest.mock import MagicMock, patch

import pytest

from coinbase_agentkit.action_providers.compound.compound_action_provider import (
    CompoundActionProvider,
)


@pytest.fixture
def wallet():
    """Fixture to create a mock wallet."""
    mock_wallet = MagicMock()
    mock_wallet.get_address.return_value = "0xWallet"
    mock_network = MagicMock()
    mock_network.network_id = 1
    mock_network.protocol_family = "evm"
    mock_wallet.network = mock_network
    mock_wallet.get_network.return_value = mock_network
    # Simulate a successful transaction
    mock_wallet.send_transaction.return_value = "0xTxHash"
    fake_receipt = MagicMock()
    fake_receipt.transaction_link = "http://example.com/tx/0xTxHash"
    mock_wallet.wait_for_transaction_receipt.return_value = fake_receipt
    # Setup read_contract to return base token address
    mock_wallet.read_contract.return_value = "0xBaseToken"
    return mock_wallet


def test_borrow_action_success(wallet):
    """Test that the borrow action in CompoundActionProvider successfully borrows USDC."""
    provider = CompoundActionProvider()

    # Override internal address getters to return dummy addresses
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    # Setup mocks using context managers
    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio_after_borrow") as mock_get_health_ratio_after_borrow, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3:

        # Setup mocks for utility functions
        atomic_amount = 1000000000  # 1000 USDC with 6 decimals: 1000 * 10^6
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_health_ratio.side_effect = [Decimal("Infinity"), Decimal("Infinity")]  # Initial and final health ratios are infinite
        mock_get_health_ratio_after_borrow.return_value = Decimal("2.0")  # Healthy position after borrow

        # Setup fake Web3 contract and its encode_abi call
        fake_contract = MagicMock()
        fake_contract.encode_abi.return_value = "encoded_borrow_data"
        fake_eth = MagicMock()
        fake_eth.contract.return_value = fake_contract
        mock_web3.return_value.eth = fake_eth

        # Act
        result = provider.borrow(wallet, input_args)

        # Assert that the borrow action returned the expected success message
        assert "Borrowed 1000 USDC from Compound" in result
        assert "Transaction hash: 0xTxHash" in result
        assert "Health ratio changed from Inf.% to Inf.%" in result

        # Additional assertions to verify that contract.encode_abi was called correctly
        fake_contract.encode_abi.assert_called_once_with("withdraw", args=["0xBaseToken", atomic_amount])

        # Verify that the transaction was sent to the correct comet address with the encoded data
        wallet.send_transaction.assert_called_once_with(
            {"to": "0xComet", "data": "encoded_borrow_data"}
        )


def test_borrow_unhealthy_position(wallet):
    """Test borrow action when the resulting position would be unhealthy."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio_after_borrow") as mock_get_health_ratio_after_borrow, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio:

        # Setup mocks
        atomic_amount = 1000000000  # 1000 USDC
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_health_ratio.return_value = 2.0  # Current health ratio
        mock_get_health_ratio_after_borrow.return_value = 0.8  # Projected health ratio < 1

        result = provider.borrow(wallet, input_args)

        assert "Error: Borrowing 1000 USDC would result in an unhealthy position" in result
        assert "Health ratio would be 0.80" in result


def test_borrow_transaction_failure(wallet):
    """Test borrow action when the transaction fails."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio_after_borrow") as mock_get_health_ratio_after_borrow, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3:

        # Setup mocks
        atomic_amount = 1000000000  # 1000 USDC
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_health_ratio.return_value = 2.0
        mock_get_health_ratio_after_borrow.return_value = 1.5  # Healthy ratio

        # Setup Web3 contract mock
        fake_contract = MagicMock()
        fake_contract.encode_abi.return_value = "encoded_borrow_data"
        fake_eth = MagicMock()
        fake_eth.contract.return_value = fake_contract
        mock_web3.return_value.eth = fake_eth

        # Make transaction fail
        wallet.send_transaction.side_effect = Exception("Transaction failed")

        result = provider.borrow(wallet, input_args)

        assert "Error executing transaction: Transaction failed" in result


def test_borrow_infinite_health_ratio(wallet):
    """Test borrow action when health ratio is infinite."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio_after_borrow") as mock_get_health_ratio_after_borrow, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3:

        # Setup mocks
        atomic_amount = 1000000000  # 1000 USDC
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_health_ratio.side_effect = [Decimal("Infinity"), Decimal("Infinity")]  # Initial and final health ratios are infinite
        mock_get_health_ratio_after_borrow.return_value = 1.5  # Healthy ratio

        # Setup Web3 contract mock
        fake_contract = MagicMock()
        fake_contract.encode_abi.return_value = "encoded_borrow_data"
        fake_eth = MagicMock()
        fake_eth.contract.return_value = fake_contract
        mock_web3.return_value.eth = fake_eth

        result = provider.borrow(wallet, input_args)

        # Check that the message uses "Inf.%" for infinite health ratio
        assert "Health ratio changed from Inf.% to Inf.%" in result
        assert "Borrowed 1000 USDC from Compound" in result


def test_borrow_general_error(wallet):
    """Test borrow action when an unexpected error occurs."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals:
        # Make format_amount_with_decimals raise an unexpected error
        mock_format_amount_with_decimals.side_effect = Exception("Unexpected error occurred")

        result = provider.borrow(wallet, input_args)

        assert "Error borrowing from Compound: Unexpected error occurred" in result
