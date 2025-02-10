"""Tests for Twitter account mentions action."""
from json import dumps
from unittest.mock import Mock, patch

import pytest
import tweepy

from coinbase_agentkit.action_providers.twitter.schemas import AccountMentionsInput
from coinbase_agentkit.action_providers.twitter.twitter_action_provider import (
    twitter_action_provider,
)

MOCK_USER_ID = "1234"
MOCK_TWEET_ID = "1857479287504584856"
MOCK_TWEET_TEXT = "@CDPAgentKit reply"


def test_account_mentions_input_model_valid():
    """Test that AccountMentionsInput accepts valid parameters."""
    input_model = AccountMentionsInput(user_id=MOCK_USER_ID)
    assert input_model.user_id == MOCK_USER_ID


def test_account_mentions_input_model_missing_params():
    """Test that AccountMentionsInput raises error when params are missing."""
    with pytest.raises(ValueError):
        AccountMentionsInput()


def test_account_mentions_success(mock_env):
    """Test successful retrieval of the authenticated Twitter (X) account's mentions."""
    provider = twitter_action_provider()

    # Set up mock response
    mock_response = Mock()
    mock_response.data = [
        {
            "id": MOCK_TWEET_ID,
            "text": MOCK_TWEET_TEXT,
        }
    ]

    expected_result = {"data": mock_response.data}
    expected_response = f"Successfully retrieved account mentions:\n{dumps(expected_result)}"

    with patch.object(provider.client, "get_users_mentions", return_value=mock_response) as mock_get_mentions:
        # Execute action
        response = provider.account_mentions({"user_id": MOCK_USER_ID})

        # Verify response
        assert response == expected_response
        mock_get_mentions.assert_called_once_with(MOCK_USER_ID)


def test_account_mentions_failure(mock_env):
    """Test failure when an API error occurs."""
    provider = twitter_action_provider()
    error = tweepy.errors.TweepyException("Tweepy Error")
    expected_response = f"Error retrieving authenticated account mentions:\n{error}"

    with patch.object(provider.client, "get_users_mentions", side_effect=error) as mock_get_mentions:
        # Execute action
        response = provider.account_mentions({"user_id": MOCK_USER_ID})

        # Verify response
        assert response == expected_response
        mock_get_mentions.assert_called_once_with(MOCK_USER_ID)
