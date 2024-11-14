from collections.abc import Callable
from json import dumps

import tweepy
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.social.twitter.action import TwitterAction

ACCOUNT_MENTIONS_PROMPT = """
This tool will return account mentions for the currently authenticated Twitter (X) user context."""


class AccountMentionsInput(BaseModel):
    """Input argument schema for Twitter account mentions action."""

    account_id: str = Field(
        ...,
        description="The account id for the Twitter (X) user to get mentions for",
    )


def account_mentions(client: tweepy.Client, account_id: str) -> str:
    """Get the authenticated Twitter (X) user account mentions.

    Args:
        client (tweepy.Client): The Twitter (X) client used to authenticate with.
        account_id (str): The Twitter (X) account id to  get mentions for.

    Returns:
        str: A message containing account mentions for the authenticated user context.

    """
    message = ""

    try:
        response = client.get_users_mentions(account_id)
        mentions = response.data

        message = f"Successfully retrieved authenticated user account mentions:{dumps(mentions)}"
    except tweepy.errors.TweepyException as e:
        message = f"Error retrieving authenticated user account mentions: {e}"

    return message


class AccountMentionsAction(TwitterAction):
    """Twitter (X) account mentions action."""

    name: str = "account_mentions"
    description: str = ACCOUNT_MENTIONS_PROMPT
    args_schema: type[BaseModel] | None = AccountMentionsInput
    func: Callable[..., str] = account_mentions
