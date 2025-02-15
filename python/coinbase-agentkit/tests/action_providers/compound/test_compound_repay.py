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


def test_repay_action_success(wallet):
    """Test that the repay action in CompoundActionProvider successfully repays debt."""
    provider = CompoundActionProvider()

    # Override internal address getters to return dummy addresses
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_from_decimals") as mock_format_amount_from_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.morpho.morpho_action_provider.approve") as mock_approve, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_symbol") as mock_get_token_symbol, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3:

        # Setup mocks for utility functions
        # For USDC, assume 6 decimals, so 1000 * 10^6 = 1000000000
        token_decimals = 6
        atomic_amount = 1000000000

        # Set wallet balance to be exactly the atomic amount (sufficient for repayment)
        mock_get_token_balance.return_value = atomic_amount
        mock_get_token_decimals.return_value = token_decimals
        mock_format_amount_with_decimals.return_value = atomic_amount

        # Since balance is sufficient, format_amount_from_decimals won't be used in error, but setting a dummy value
        mock_format_amount_from_decimals.return_value = "1000"

        # Simulate health ratio improvement: before and after transaction
        mock_get_health_ratio.side_effect = [1.5, 2.5]

        # Approve should succeed; no need to return any particular value
        mock_approve.return_value = None

        # get_token_symbol returns "USDC"
        mock_get_token_symbol.return_value = "USDC"

        # Setup fake Web3 contract and its encode_abi call for the repay action
        fake_comet_contract = MagicMock()
        fake_comet_contract.encode_abi.return_value = "encoded_repay_data"
        fake_token_contract = MagicMock()
        fake_token_contract.encode_abi.return_value = "encoded_approve_data"

        def get_contract(address, abi):
            if address == "0xComet":
                return fake_comet_contract
            return fake_token_contract

        fake_eth = MagicMock()
        fake_eth.contract.side_effect = get_contract
        mock_web3.return_value.eth = fake_eth

        # Act
        result = provider.repay(wallet, input_args)

        # Assert the repay action returned the expected success message
        assert "Repaid 1000 USDC to Compound" in result
        assert "Transaction hash: 0xTxHash" in result
        assert "Health ratio improved from 1.50 to 2.50" in result

        # Verify that contract.encode_abi was called with the correct parameters for both approve and supply
        fake_token_contract.encode_abi.assert_called_once_with("approve", args=["0xComet", atomic_amount])
        fake_comet_contract.encode_abi.assert_called_once_with("supply", args=["0xToken", atomic_amount])

        # Verify that the transaction was sent to the correct comet address with the encoded data
        assert wallet.send_transaction.call_count == 2
        wallet.send_transaction.assert_has_calls([
            call({"to": "0xToken", "data": "encoded_approve_data"}),
            call({"to": "0xComet", "data": "encoded_repay_data"})
        ])


def test_repay_insufficient_balance(wallet):
    """Test repay action when wallet has insufficient balance."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_from_decimals") as mock_format_amount_from_decimals:

        # Setup mocks to simulate insufficient balance
        token_decimals = 6
        repay_amount = 1000000000  # 1000 USDC
        wallet_balance = 500000000  # Only 500 USDC in wallet

        mock_get_token_decimals.return_value = token_decimals
        mock_format_amount_with_decimals.return_value = repay_amount
        mock_get_token_balance.return_value = wallet_balance
        mock_format_amount_from_decimals.return_value = "500"  # Current balance in human readable form

        result = provider.repay(wallet, input_args)

        assert "Error: Insufficient balance" in result
        assert "You have 500, but trying to repay 1000" in result


def test_repay_approval_failure(wallet):
    """Test repay action when token approval fails."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3:

        # Setup mocks for the basic checks to pass
        token_decimals = 6
        atomic_amount = 1000000000  # 1000 USDC
        mock_get_token_decimals.return_value = token_decimals
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_token_balance.return_value = atomic_amount * 2  # Ensure sufficient balance
        mock_get_health_ratio.return_value = 1.5

        # Setup Web3 contract mock
        fake_contract = MagicMock()
        fake_contract.encode_abi.return_value = "encoded_approve_data"
        fake_eth = MagicMock()
        fake_eth.contract.return_value = fake_contract
        mock_web3.return_value.eth = fake_eth

        # Make the approval transaction fail
        wallet.send_transaction.side_effect = Exception("Approval failed")

        result = provider.repay(wallet, input_args)

        assert "Error approving token: Approval failed" in result


def test_repay_transaction_failure(wallet):
    """Test repay action when the repay transaction fails."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_balance") as mock_get_token_balance, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.format_amount_with_decimals") as mock_format_amount_with_decimals, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_health_ratio") as mock_get_health_ratio, \
         patch("coinbase_agentkit.action_providers.compound.compound_action_provider.Web3") as mock_web3:

        # Setup mocks for the basic checks to pass
        token_decimals = 6
        atomic_amount = 1000000000  # 1000 USDC
        mock_get_token_decimals.return_value = token_decimals
        mock_format_amount_with_decimals.return_value = atomic_amount
        mock_get_token_balance.return_value = atomic_amount * 2  # Ensure sufficient balance
        mock_get_health_ratio.return_value = 1.5

        # Setup Web3 contract mock
        fake_comet_contract = MagicMock()
        fake_comet_contract.encode_abi.return_value = "encoded_repay_data"
        fake_token_contract = MagicMock()
        fake_token_contract.encode_abi.return_value = "encoded_approve_data"

        def get_contract(address, abi):
            if address == "0xComet":
                return fake_comet_contract
            return fake_token_contract

        fake_eth = MagicMock()
        fake_eth.contract.side_effect = get_contract
        mock_web3.return_value.eth = fake_eth

        # Make the first transaction (approval) succeed but the second (repay) fail
        def mock_send_transaction(params):
            if params["data"] == "encoded_approve_data":
                return "0xApprovalHash"
            raise Exception("Repay transaction failed")

        wallet.send_transaction.side_effect = mock_send_transaction

        result = provider.repay(wallet, input_args)

        assert "Error executing transaction: Repay transaction failed" in result


def test_repay_general_error(wallet):
    """Test repay action when an unexpected error occurs."""
    provider = CompoundActionProvider()
    provider._get_comet_address = lambda network: "0xComet"
    provider._get_asset_address = lambda network, asset_id: "0xToken"

    input_args = {"asset_id": "usdc", "amount": "1000"}

    with patch("coinbase_agentkit.action_providers.compound.compound_action_provider.get_token_decimals") as mock_get_token_decimals:
        # Make get_token_decimals raise an unexpected error
        mock_get_token_decimals.side_effect = Exception("Unexpected error occurred")

        result = provider.repay(wallet, input_args)

        assert "Error repaying to Compound: Unexpected error occurred" in result
