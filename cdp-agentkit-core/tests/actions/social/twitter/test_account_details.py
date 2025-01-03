from json import dumps
from unittest.mock import patch
import logging

import tweepy
from cdp_agentkit_core.actions.social.twitter.account_details import (
    account_details,
)

MOCK_ID = 1234
MOCK_NAME = "Test Account"
MOCK_USERNAME = "testaccount"


def test_account_details_success(tweepy_factory):
    """Test successful retrieval of the authenticated Twitter (X) account."""
    mock_client = tweepy_factory()
    mock_client_result = {
        "data": {
            "id": MOCK_ID,
            "name": MOCK_USERNAME,
            "username": MOCK_USERNAME,
        },
    }

    expected_result = mock_client_result.copy()
    expected_result["data"]["url"] = f"https://x.com/{MOCK_USERNAME}"
    expected_response = f"Successfully retrieved authenticated user account details:\n{dumps(expected_result)}"

    with patch.object(mock_client, "get_me", return_value=mock_client_result) as mock_tweepy_get_me:
        response = account_details(mock_client)

        assert response == expected_response
        mock_tweepy_get_me.assert_called_once_with()


def test_account_details_failure_too_many_requests(tweepy_factory):
    """Test failure when a TooManyRequests error occurs."""
    mock_client = tweepy_factory()

    expected_result = tweepy.errors.TooManyRequests("Too Many Requests")
    expected_response = f"Error retrieving authenticated user account details: Too Many Requests"

    with patch.object(mock_client, "get_me", side_effect=expected_result) as mock_tweepy_get_me:
        response = account_details(mock_client)

        assert response == expected_response
        mock_tweepy_get_me.assert_called_once_with()


def test_account_details_failure_unauthorized(tweepy_factory):
    """Test failure when an Unauthorized error occurs."""
    mock_client = tweepy_factory()

    expected_result = tweepy.errors.Unauthorized("Unauthorized")
    expected_response = f"Error retrieving authenticated user account details: Unauthorized"

    with patch.object(mock_client, "get_me", side_effect=expected_result) as mock_tweepy_get_me:
        response = account_details(mock_client)

        assert response == expected_response
        mock_tweepy_get_me.assert_called_once_with()


def test_account_details_failure_forbidden(tweepy_factory):
    """Test failure when a Forbidden error occurs."""
    mock_client = tweepy_factory()

    expected_result = tweepy.errors.Forbidden("Forbidden")
    expected_response = f"Error retrieving authenticated user account details: Forbidden"

    with patch.object(mock_client, "get_me", side_effect=expected_result) as mock_tweepy_get_me:
        response = account_details(mock_client)

        assert response == expected_response
        mock_tweepy_get_me.assert_called_once_with()


def test_account_details_logging(tweepy_factory, caplog):
    """Test logging functionality in account_details."""
    mock_client = tweepy_factory()
    mock_client_result = {
        "data": {
            "id": MOCK_ID,
            "name": MOCK_USERNAME,
            "username": MOCK_USERNAME,
        },
    }

    with patch.object(mock_client, "get_me", return_value=mock_client_result) as mock_tweepy_get_me:
        with caplog.at_level(logging.INFO):
            response = account_details(mock_client)

            assert "Successfully retrieved authenticated user account details" in caplog.text
            mock_tweepy_get_me.assert_called_once_with()
