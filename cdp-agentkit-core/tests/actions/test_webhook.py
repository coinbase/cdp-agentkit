from unittest.mock import Mock, patch

import pytest

from cdp_agentkit_core.actions.webhook import (
    WebhookInput,
    create_webhook,
)

# Test constants
MOCK_NETWORK = "base-sepolia"
MOCK_URL = "https://example.com/"
MOCK_ADDRESS = "0x321"
MOCK_EVENT_TYPE = "wallet_activity"
SUCCESS_MESSAGE = "The webhook was successfully created:"

@pytest.fixture
def mock_webhook():
    """Provide a mocked Webhook instance for testing."""
    with patch('cdp_agentkit_core.actions.webhook.Webhook') as mock:
        mock_instance = Mock()
        mock.create.return_value = mock_instance
        yield mock

def test_webhook_input_valid_parsing():
    """Test successful parsing of valid webhook inputs."""
    # Test wallet activity webhook input
    valid_input = {
        "notification_uri": MOCK_URL,
        "event_type": MOCK_EVENT_TYPE,
        "event_type_filter": {
            "addresses": [MOCK_ADDRESS]
        },
        "network_id": MOCK_NETWORK
    }

    result = WebhookInput.model_validate(valid_input)
    assert str(result.notification_uri) == MOCK_URL
    assert result.event_type == MOCK_EVENT_TYPE
    assert result.event_type_filter.addresses == [MOCK_ADDRESS]
    assert result.network_id == MOCK_NETWORK

    # Test ERC721 transfer webhook input
    another_valid_input = {
        "notification_uri": MOCK_URL,
        "event_type": "erc721_transfer",
        "event_filters": [{
            "from_address": MOCK_ADDRESS
        }],
        "network_id": MOCK_NETWORK
    }

    result = WebhookInput.model_validate(another_valid_input)
    assert str(result.notification_uri) == MOCK_URL
    assert result.event_type == "erc721_transfer"
    assert result.event_filters[0].from_address == MOCK_ADDRESS

def test_webhook_input_invalid_parsing():
    """Test parsing failure for invalid webhook input."""
    empty_input = {}
    with pytest.raises(ValueError):
        WebhookInput.model_validate(empty_input)

def test_create_wallet_activity_webhook(mock_webhook):
    """Test creating wallet activity webhook."""
    args = {
        "notification_uri": MOCK_URL,
        "event_type": MOCK_EVENT_TYPE,
        "event_type_filter": {
            "addresses": [MOCK_ADDRESS]
        },
        "network_id": MOCK_NETWORK
    }

    response = create_webhook(**args)

    assert mock_webhook.create.call_count == 1
    assert SUCCESS_MESSAGE in response

def test_create_smart_contract_activity_webhook(mock_webhook):
    """Test creating smart contract activity webhook."""
    args = {
        "notification_uri": MOCK_URL,
        "event_type": "smart_contract_event_activity",
        "event_type_filter": {
            "addresses": [MOCK_ADDRESS]
        },
        "network_id": MOCK_NETWORK
    }

    response = create_webhook(**args)

    assert mock_webhook.create.call_count == 1
    assert SUCCESS_MESSAGE in response

def test_create_erc20_transfer_webhook(mock_webhook):
    """Test creating ERC20 transfer webhook."""
    args = {
        "notification_uri": MOCK_URL,
        "event_type": "erc20_transfer",
        "event_type_filter": {
            "addresses": [MOCK_ADDRESS]
        },
        "event_filters": [{
            "from_address": MOCK_ADDRESS
        }],
        "network_id": MOCK_NETWORK
    }

    response = create_webhook(**args)

    assert mock_webhook.create.call_count == 1
    assert SUCCESS_MESSAGE in response

def test_create_erc721_transfer_webhook(mock_webhook):
    """Test creating ERC721 transfer webhook."""
    args = {
        "notification_uri": MOCK_URL,
        "event_type": "erc721_transfer",
        "event_filters": [{
            "from_address": MOCK_ADDRESS
        }],
        "network_id": MOCK_NETWORK
    }

    response = create_webhook(**args)

    assert mock_webhook.create.call_count == 1
    assert SUCCESS_MESSAGE in response

def test_create_webhook_error_handling(mock_webhook):
    """Test error handling when creating webhook fails."""
    error_msg = "Failed to create webhook"
    mock_webhook.create.side_effect = Exception(error_msg)

    args = {
        "notification_uri": MOCK_URL,
        "event_type": MOCK_EVENT_TYPE,
        "event_type_filter": {
            "addresses": ["test"]
        },
        "network_id": MOCK_NETWORK
    }

    response = create_webhook(**args)

    assert mock_webhook.create.call_count == 1
    assert f"Error: {error_msg}" in response
