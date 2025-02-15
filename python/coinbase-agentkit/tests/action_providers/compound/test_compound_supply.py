from decimal import Decimal
from unittest.mock import MagicMock, call, patch

import pytest

from coinbase_agentkit.action_providers.compound.compound_action_provider import (
    CompoundActionProvider,
)


@pytest.fixture
def wallet():
    """Fixture to create a mock wallet."""
    # Create a mock wallet with necessary attributes and methods
    mock_wallet = MagicMock()
    mock_wallet.get_address.return_value = "0xWallet"

    # Create a fake network with required attributes
    mock_network = MagicMock()
    mock_network.network_id = 1
    mock_network.protocol_family = "evm"
    mock_wallet.network = mock_network
    mock_wallet.get_network.return_value = mock_network

    # Setup send_transaction to return a dummy transaction hash
    mock_wallet.send_transaction.return_value = "0xTxHash"

    # Create a fake receipt with a transaction_link attribute
    fake_receipt = MagicMock()
    fake_receipt.transaction_link = "http://example.com/tx/0xTxHash"
    mock_wallet.wait_for_transaction_receipt.return_value = fake_receipt

    return mock_wallet


def test_supply_action_success(wallet):
    """Test that the supply action in CompoundActionProvider successfully supplies tokens."""
    # Arrange
    provider = CompoundActionProvider()

    # Override internal address getters to return dummy addresses
    comet_address = "0xComet"
    token_address = "0xToken"
    provider._get_comet_address = lambda network: comet_address
    provider._get_asset_address = lambda network, asset_id: token_address

    input_args = {
        "asset_id": "weth",
        "amount": "1",
        "comet_address": comet_address,
        "token_address": token_address,
    }

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_from_decimals") as mock_format_from_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_symbol") as mock_get_token_symbol, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.morpho.morpho_action_provider.approve") as mock_approve, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals:

        # Setup mocks for utility functions
        mock_get_token_decimals.return_value = 18
        atomic_amount = int(Decimal("1.0") * Decimal(10**18))  # 1 WETH in wei
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_token_balance.return_value = atomic_amount
        # First call returns current health, second call returns new health
        mock_get_health_ratio.side_effect = [Decimal("2.0"), Decimal("3.0")]
        mock_approve.return_value = "approved"

        # Setup fake Web3 contract and its encode_abi call
        fake_comet_contract = MagicMock()
        fake_comet_contract.encode_abi.return_value = "encoded_supply_data"
        fake_token_contract = MagicMock()
        fake_token_contract.encode_abi.return_value = "encoded_approve_data"

        def get_contract(address, abi):
            if address == "0xComet":
                return fake_comet_contract
            return fake_token_contract

        fake_eth = MagicMock()
        fake_eth.contract.side_effect = get_contract
        mock_web3.return_value.eth = fake_eth

        mock_get_token_symbol.return_value = "WETH"
        # This mock is not used in the success flow but provided for completeness
        mock_format_from_decimals.return_value = "1"

        # Act
        result = provider.supply(wallet, input_args)

        # Assert that the supply action returned the expected success message
        assert "Supplied 1 WETH to Compound" in result
        assert "Transaction hash: 0xTxHash" in result
        assert "Health ratio changed from 2.00 to 3.00" in result

        # Verify that contract.encode_abi was called with the correct parameters for both approve and supply
        fake_token_contract.encode_abi.assert_called_once_with("approve", args=["0xComet", atomic_amount])
        fake_comet_contract.encode_abi.assert_called_once_with("supply", args=["0xToken", atomic_amount])

        # Verify that the transaction was sent to the correct addresses with the encoded data
        assert wallet.send_transaction.call_count == 2
        wallet.send_transaction.assert_has_calls([
            call({"to": "0xToken", "data": "encoded_approve_data"}),
            call({"to": "0xComet", "data": "encoded_supply_data"})
        ])


def test_supply_insufficient_balance(wallet):
    """Test supply action when wallet has insufficient balance."""
    provider = CompoundActionProvider()
    comet_address = "0xComet"
    token_address = "0xToken"
    provider._get_comet_address = lambda network: comet_address
    provider._get_asset_address = lambda network, asset_id: token_address

    input_args = {
        "asset_id": "weth",
        "amount": "2",  # Try to supply 2 WETH
    }

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_from_decimals") as mock_format_from_decimals:

        # Setup mocks to simulate insufficient balance
        mock_get_token_decimals.return_value = 18
        supply_amount = int(Decimal("2.0") * Decimal(10**18))  # 2 WETH
        wallet_balance = int(Decimal("1.0") * Decimal(10**18))  # Only 1 WETH in wallet
        mock_format_amount_with_decimals.return_value = supply_amount
        mock_get_token_balance.return_value = wallet_balance
        mock_format_from_decimals.return_value = "1"  # Current balance in human readable form

        result = provider.supply(wallet, input_args)

        assert "Error: Insufficient balance" in result
        assert "You have 1, but trying to supply 2" in result


def test_supply_approval_failure(wallet):
    """Test supply action when token approval fails."""
    provider = CompoundActionProvider()
    comet_address = "0xComet"
    token_address = "0xToken"
    provider._get_comet_address = lambda network: comet_address
    provider._get_asset_address = lambda network, asset_id: token_address

    input_args = {
        "asset_id": "weth",
        "amount": "1",
    }

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3:

        # Setup mocks for the basic checks to pass
        mock_get_token_decimals.return_value = 18
        atomic_amount = int(Decimal("1.0") * Decimal(10**18))  # 1 WETH
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_token_balance.return_value = atomic_amount * 2  # Ensure sufficient balance
        mock_get_health_ratio.return_value = Decimal("2.0")  # Set initial health ratio

        # Setup Web3 contract mock
        fake_contract = MagicMock()
        fake_contract.encode_abi.return_value = "encoded_approve_data"
        fake_eth = MagicMock()
        fake_eth.contract.return_value = fake_contract
        mock_web3.return_value.eth = fake_eth

        # Make the approval transaction fail
        wallet.send_transaction.side_effect = Exception("Approval failed")

        result = provider.supply(wallet, input_args)

        assert "Error approving token: Approval failed" in result


def test_supply_transaction_failure(wallet):
    """Test supply action when the supply transaction fails."""
    provider = CompoundActionProvider()
    comet_address = "0xComet"
    token_address = "0xToken"
    provider._get_comet_address = lambda network: comet_address
    provider._get_asset_address = lambda network, asset_id: token_address

    input_args = {
        "asset_id": "weth",
        "amount": "1",
    }

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio:

        # Setup mocks for the basic checks to pass
        mock_get_token_decimals.return_value = 18
        atomic_amount = int(Decimal("1.0") * Decimal(10**18))  # 1 WETH
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_token_balance.return_value = atomic_amount * 2  # Ensure sufficient balance
        mock_get_health_ratio.return_value = Decimal("2.0")

        # Setup Web3 contract mock
        fake_comet_contract = MagicMock()
        fake_comet_contract.encode_abi.return_value = "encoded_supply_data"
        fake_token_contract = MagicMock()
        fake_token_contract.encode_abi.return_value = "encoded_approve_data"

        def get_contract(address, abi):
            if address == "0xComet":
                return fake_comet_contract
            return fake_token_contract

        fake_eth = MagicMock()
        fake_eth.contract.side_effect = get_contract
        mock_web3.return_value.eth = fake_eth

        # Make the first transaction (approval) succeed but the second (supply) fail
        def mock_send_transaction(params):
            if params["data"] == "encoded_approve_data":
                return "0xApprovalHash"
            raise Exception("Supply transaction failed")

        wallet.send_transaction.side_effect = mock_send_transaction

        result = provider.supply(wallet, input_args)

        assert "Error executing transaction: Supply transaction failed" in result


def test_supply_general_error(wallet):
    """Test supply action when an unexpected error occurs."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {
        "asset_id": "weth",
        "amount": "1",
    }

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals:
        # Make get_token_decimals raise an unexpected error
        mock_get_token_decimals.side_effect = Exception("Unexpected error occurred")

        result = provider.supply(wallet, input_args)

        assert "Error supplying to Compound: Unexpected error occurred" in result
