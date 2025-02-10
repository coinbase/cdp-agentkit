"""Tests for Superfluid update flow action."""
from unittest.mock import Mock, patch

import pytest

from coinbase_agentkit.action_providers.superfluid.constants import (
    SUPERFLUID_HOST_ADDRESS,
    UPDATE_ABI,
)
from coinbase_agentkit.action_providers.superfluid.schemas import UpdateFlowInput
from coinbase_agentkit.action_providers.superfluid.superfluid_action_provider import (
    superfluid_action_provider,
)

MOCK_RECIPIENT = "0xvalidRecipientAddress"
MOCK_TOKEN_ADDRESS = "0xvalidTokenAddress"
MOCK_NEW_FLOW_RATE = "2000000000000000"
MOCK_TX_HASH = "0x123456789abcdef"


def test_update_flow_input_model_valid():
    """Test that UpdateFlowInput accepts valid parameters."""
    input_model = UpdateFlowInput(
        recipient=MOCK_RECIPIENT,
        token_address=MOCK_TOKEN_ADDRESS,
        new_flow_rate=MOCK_NEW_FLOW_RATE,
    )

    assert input_model.recipient == MOCK_RECIPIENT
    assert input_model.token_address == MOCK_TOKEN_ADDRESS
    assert input_model.new_flow_rate == MOCK_NEW_FLOW_RATE


def test_update_flow_input_model_missing_params():
    """Test that UpdateFlowInput raises error when params are missing."""
    with pytest.raises(ValueError):
        UpdateFlowInput()


def test_update_flow_success(wallet_provider_factory):
    """Test successful flow update with valid parameters."""
    # Set up mocks
    wallet_provider = wallet_provider_factory()
    provider = superfluid_action_provider(wallet_provider)
    mock_transaction = Mock()
    mock_receipt = Mock()
    mock_receipt.transaction_hash = MOCK_TX_HASH

    with (
        patch.object(
            wallet_provider, "send_transaction", return_value=mock_transaction
        ) as mock_send_transaction,
        patch.object(
            mock_transaction, "wait_for_receipt", return_value=mock_receipt
        ) as mock_wait_for_receipt,
    ):
        # Execute action
        response = provider.update_flow({
            "recipient": MOCK_RECIPIENT,
            "token_address": MOCK_TOKEN_ADDRESS,
            "new_flow_rate": MOCK_NEW_FLOW_RATE,
        })

        # Verify response
        expected_response = f"Flow updated successfully. Transaction hash: {MOCK_TX_HASH}"
        assert response == expected_response
        mock_send_transaction.assert_called_once_with(
            contract_address=SUPERFLUID_HOST_ADDRESS,
            abi=UPDATE_ABI,
            method="updateFlow",
            args={
                "token": MOCK_TOKEN_ADDRESS,
                "sender": wallet_provider.get_address(),
                "receiver": MOCK_RECIPIENT,
                "flowrate": MOCK_NEW_FLOW_RATE,
                "userData": "0x",
            },
        )
        mock_wait_for_receipt.assert_called_once_with()


def test_update_flow_error(wallet_provider_factory):
    """Test flow update when error occurs."""
    # Set up mocks
    wallet_provider = wallet_provider_factory()
    provider = superfluid_action_provider(wallet_provider)
    error = Exception("Contract error")

    with patch.object(
        wallet_provider, "send_transaction", side_effect=error
    ) as mock_send_transaction:
        # Execute action
        response = provider.update_flow({
            "recipient": MOCK_RECIPIENT,
            "token_address": MOCK_TOKEN_ADDRESS,
            "new_flow_rate": MOCK_NEW_FLOW_RATE,
        })

        # Verify response
        expected_response = "Error updating flow: Contract error"
        assert response == expected_response
        mock_send_transaction.assert_called_once_with(
            contract_address=SUPERFLUID_HOST_ADDRESS,
            abi=UPDATE_ABI,
            method="updateFlow",
            args={
                "token": MOCK_TOKEN_ADDRESS,
                "sender": wallet_provider.get_address(),
                "receiver": MOCK_RECIPIENT,
                "flowrate": MOCK_NEW_FLOW_RATE,
                "userData": "0x",
            },
        )
