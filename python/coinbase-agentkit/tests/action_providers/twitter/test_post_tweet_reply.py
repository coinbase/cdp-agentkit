"""Tests for Twitter post tweet reply action."""
from json import dumps
from unittest.mock import Mock, patch

import pytest
import tweepy

from coinbase_agentkit.action_providers.twitter.schemas import PostTweetReplyInput
from coinbase_agentkit.action_providers.twitter.twitter_action_provider import (
    twitter_action_provider,
)

MOCK_TWEET_ID = "1234"
MOCK_TWEET_REPLY = "So good to be here!"


def test_post_tweet_reply_input_model_valid():
    """Test that PostTweetReplyInput accepts valid parameters."""
    input_model = PostTweetReplyInput(
        tweet_id=MOCK_TWEET_ID,
        tweet_reply=MOCK_TWEET_REPLY,
    )
    assert input_model.tweet_id == MOCK_TWEET_ID
    assert input_model.tweet_reply == MOCK_TWEET_REPLY


def test_post_tweet_reply_input_model_missing_params():
    """Test that PostTweetReplyInput raises error when params are missing."""
    with pytest.raises(ValueError):
        PostTweetReplyInput()


@pytest.mark.usefixtures("mock_env")
def test_post_tweet_reply_success():
    """Test successful reply to a Twitter (X) post."""
    provider = twitter_action_provider()
    mock_response = Mock()
    mock_response.data = {
        "id": "0123456789012345678",
        "text": MOCK_TWEET_REPLY,
        "edit_history_tweet_ids": ["1234567890123456789"],
    }

    expected_result = {"data": mock_response.data}
    expected_response = f"Successfully posted reply to Twitter:\n{dumps(expected_result)}"

    with patch.object(provider.client, "create_tweet", return_value=mock_response) as mock_create_tweet:
        args = PostTweetReplyInput(tweet_id=MOCK_TWEET_ID, tweet_reply=MOCK_TWEET_REPLY)
        response = provider.post_tweet_reply(args)
        assert response == expected_response
        mock_create_tweet.assert_called_once_with(
            text=MOCK_TWEET_REPLY,
            in_reply_to_tweet_id=MOCK_TWEET_ID
        )


@pytest.mark.usefixtures("mock_env")
def test_post_tweet_reply_failure():
    """Test failure when an API error occurs."""
    provider = twitter_action_provider()
    error = tweepy.errors.TweepyException("Tweepy Error")
    expected_response = f"Error posting reply to Twitter:\n{error}"

    with patch.object(provider.client, "create_tweet", side_effect=error) as mock_create_tweet:
        args = PostTweetReplyInput(tweet_id=MOCK_TWEET_ID, tweet_reply=MOCK_TWEET_REPLY)
        response = provider.post_tweet_reply(args)
        assert response == expected_response
        mock_create_tweet.assert_called_once_with(
            text=MOCK_TWEET_REPLY,
            in_reply_to_tweet_id=MOCK_TWEET_ID
        )
