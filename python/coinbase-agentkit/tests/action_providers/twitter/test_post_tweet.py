"""Tests for Twitter post tweet action."""
from json import dumps
from unittest.mock import patch, Mock

import pytest
import tweepy

from coinbase_agentkit.action_providers.twitter.schemas import PostTweetInput
from coinbase_agentkit.action_providers.twitter.twitter_action_provider import twitter_action_provider
from tests.action_providers.twitter.fixtures.env import mock_env

MOCK_TWEET = "hello, world!"
MOCK_TWEET_ID = "0123456789012345678"


def test_post_tweet_input_model_valid():
    """Test that PostTweetInput accepts valid parameters."""
    input_model = PostTweetInput(tweet=MOCK_TWEET)
    assert input_model.tweet == MOCK_TWEET


def test_post_tweet_input_model_missing_params():
    """Test that PostTweetInput raises error when params are missing."""
    with pytest.raises(ValueError):
        PostTweetInput()


def test_post_tweet_success(mock_env):
    """Test successful tweet post to the authenticated Twitter (X) account."""
    provider = twitter_action_provider()
    
    # Set up mock response
    mock_response = Mock()
    mock_response.data = {
        "text": MOCK_TWEET,
        "id": MOCK_TWEET_ID,
        "edit_history_tweet_ids": [MOCK_TWEET_ID]
    }

    expected_result = {"data": mock_response.data}
    expected_response = f"Successfully posted to Twitter:\n{dumps(expected_result)}"

    with patch.object(provider.client, "create_tweet", return_value=mock_response) as mock_create_tweet:
        # Execute action
        response = provider.post_tweet({"tweet": MOCK_TWEET})

        # Verify response
        assert response == expected_response
        mock_create_tweet.assert_called_once_with(text=MOCK_TWEET)


def test_post_tweet_failure(mock_env):
    """Test failure when an API error occurs."""
    provider = twitter_action_provider()
    error = tweepy.errors.TweepyException("Tweepy Error")
    expected_response = f"Error posting to Twitter:\n{error}"

    with patch.object(provider.client, "create_tweet", side_effect=error) as mock_create_tweet:
        # Execute action
        response = provider.post_tweet({"tweet": MOCK_TWEET})

        # Verify response
        assert response == expected_response
        mock_create_tweet.assert_called_once_with(text=MOCK_TWEET)
