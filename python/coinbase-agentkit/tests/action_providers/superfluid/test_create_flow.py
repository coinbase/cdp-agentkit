"""Tests for Superfluid create flow action."""
from unittest.mock import Mock, patch

import pytest

from coinbase_agentkit.action_providers.superfluid.constants import (
    CREATE_ABI,
    SUPERFLUID_HOST_ADDRESS,
)
from coinbase_agentkit.action_providers.superfluid.schemas import CreateFlowInput
from coinbase_agentkit.action_providers.superfluid.superfluid_action_provider import (
    superfluid_action_provider,
)

MOCK_RECIPIENT = "0xvalidRecipientAddress"
MOCK_TOKEN_ADDRESS = "0xvalidTokenAddress"
MOCK_FLOW_RATE = "1000000000000000"
MOCK_TX_HASH = "0x123456789abcdef"


def test_create_flow_input_model_valid():
    """Test that CreateFlowInput accepts valid parameters."""
    input_model = CreateFlowInput(
        recipient=MOCK_RECIPIENT,
        token_address=MOCK_TOKEN_ADDRESS,
        flow_rate=MOCK_FLOW_RATE,
    )

    assert input_model.recipient == MOCK_RECIPIENT
    assert input_model.token_address == MOCK_TOKEN_ADDRESS
    assert input_model.flow_rate == MOCK_FLOW_RATE


def test_create_flow_input_model_missing_params():
    """Test that CreateFlowInput raises error when params are missing."""
    with pytest.raises(ValueError):
        CreateFlowInput()


def test_create_flow_success(wallet_provider_factory):
    """Test successful flow creation with valid parameters."""
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
        response = provider.create_flow({
            "recipient": MOCK_RECIPIENT,
            "token_address": MOCK_TOKEN_ADDRESS,
            "flow_rate": MOCK_FLOW_RATE,
        })

        # Verify response
        expected_response = f"Flow created successfully. Transaction hash: {MOCK_TX_HASH}"
        assert response == expected_response
        mock_send_transaction.assert_called_once_with(
            contract_address=SUPERFLUID_HOST_ADDRESS,
            abi=CREATE_ABI,
            method="createFlow",
            args={
                "token": MOCK_TOKEN_ADDRESS,
                "sender": wallet_provider.get_address(),
                "receiver": MOCK_RECIPIENT,
                "flowrate": MOCK_FLOW_RATE,
                "userData": "0x",
            },
        )
        mock_wait_for_receipt.assert_called_once_with()


def test_create_flow_error(wallet_provider_factory):
    """Test flow creation when error occurs."""
    # Set up mocks
    wallet_provider = wallet_provider_factory()
    provider = superfluid_action_provider(wallet_provider)
    error = Exception("Contract error")

    with patch.object(
        wallet_provider, "send_transaction", side_effect=error
    ) as mock_send_transaction:
        # Execute action
        response = provider.create_flow({
            "recipient": MOCK_RECIPIENT,
            "token_address": MOCK_TOKEN_ADDRESS,
            "flow_rate": MOCK_FLOW_RATE,
        })

        # Verify response
        expected_response = "Error creating flow: Contract error"
        assert response == expected_response
        mock_send_transaction.assert_called_once_with(
            contract_address=SUPERFLUID_HOST_ADDRESS,
            abi=CREATE_ABI,
            method="createFlow",
            args={
                "token": MOCK_TOKEN_ADDRESS,
                "sender": wallet_provider.get_address(),
                "receiver": MOCK_RECIPIENT,
                "flowrate": MOCK_FLOW_RATE,
                "userData": "0x",
            },
        )
