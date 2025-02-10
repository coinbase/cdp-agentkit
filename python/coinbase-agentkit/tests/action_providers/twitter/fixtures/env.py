"""Environment fixtures for Twitter tests."""
from dataclasses import dataclass
import pytest


@dataclass
class TwitterCredentials:
    """Mock Twitter API credentials."""
    api_key: str = "mock_api_key"
    api_secret: str = "mock_api_secret"
    access_token: str = "mock_access_token"
    access_token_secret: str = "mock_access_token_secret"


@pytest.fixture
def mock_env(monkeypatch):
    """Set up mock environment variables for Twitter credentials.
    
    Returns:
        TwitterCredentials: The mock credentials that were set.
    """
    creds = TwitterCredentials()
    monkeypatch.setenv("TWITTER_API_KEY", creds.api_key)
    monkeypatch.setenv("TWITTER_API_SECRET", creds.api_secret)
    monkeypatch.setenv("TWITTER_ACCESS_TOKEN", creds.access_token)
    monkeypatch.setenv("TWITTER_ACCESS_TOKEN_SECRET", creds.access_token_secret)
    return creds
