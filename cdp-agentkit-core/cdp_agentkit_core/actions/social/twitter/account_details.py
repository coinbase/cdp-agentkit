from collections.abc import Callable
from json import dumps
import logging

import tweepy
from pydantic import BaseModel

from cdp_agentkit_core.actions.social.twitter.action import TwitterAction

ACCOUNT_DETAILS_PROMPT = """
This tool will return account details for the currently authenticated Twitter (X) user context.

A successful response will return a message with the api response as a json payload:
    {"data": {"id": "1853889445319331840", "name": "CDP AgentKit", "username": "CDPAgentKit"}}

A failure response will return a message with the tweepy client api request error:
    Error retrieving authenticated user account: 429 Too Many Requests


"""


class AccountDetailsInput(BaseModel):
    """Input argument schema for Twitter account details action."""
    pass


def account_details(client: tweepy.Client) -> str:
    """
    Get the authenticated Twitter (X) user account details.

    Args:
        client (tweepy.Client): The Twitter (X) client used to authenticate with.

    Returns:
        str: A message containing account details for the authenticated user context.

    Example:
        >>> client = tweepy.Client(bearer_token="YOUR_BEARER_TOKEN")
        >>> account_details(client)
        'Successfully retrieved authenticated user account details: {"data": {"id": "123456789", "name": "Your Name", "username": "yourusername", "url": "https://x.com/yourusername"}}'
    """
    message = ""

    try:
        # Retrieve the authenticated user's account details
        response = client.get_me()
        data = response['data']
        data['url'] = f"https://x.com/{data['username']}"

        message = f"""Successfully retrieved authenticated user account details:\n{dumps(response)}"""
        logging.info(message)
    except tweepy.errors.TweepyException as e:
        # Handle any exceptions raised by the tweepy library
        message = f"Error retrieving authenticated user account details:\n{e}"
        logging.error(message)

    return message


class AccountDetailsAction(TwitterAction):
    """Twitter (X) account details action."""

    name: str = "account_details"
    description: str = ACCOUNT_DETAILS_PROMPT
    args_schema: type[BaseModel] | None = AccountDetailsInput
    func: Callable[..., str] = account_details
