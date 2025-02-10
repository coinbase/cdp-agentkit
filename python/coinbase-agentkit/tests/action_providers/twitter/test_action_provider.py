"""Tests for Twitter action provider initialization."""
import pytest

from coinbase_agentkit.action_providers.twitter.twitter_action_provider import (
    twitter_action_provider,
)


def test_provider_init_with_env_vars(mock_env):
    """Test provider initialization with environment variables."""
    provider = twitter_action_provider()
    assert provider.api_key == "mock_api_key"
    assert provider.api_secret == "mock_api_secret"
    assert provider.access_token == "mock_access_token"
    assert provider.access_token_secret == "mock_access_token_secret"


def test_provider_init_with_args():
    """Test provider initialization with explicit arguments."""
    provider = twitter_action_provider(
        api_key="test_key",
        api_secret="test_secret",
        access_token="test_token",
        access_token_secret="test_token_secret"
    )
    assert provider.api_key == "test_key"
    assert provider.api_secret == "test_secret"
    assert provider.access_token == "test_token"
    assert provider.access_token_secret == "test_token_secret"


def test_provider_init_missing_credentials():
    """Test provider initialization fails with missing credentials."""
    with pytest.raises(ValueError, match="TWITTER_API_KEY is not configured"):
        twitter_action_provider()
