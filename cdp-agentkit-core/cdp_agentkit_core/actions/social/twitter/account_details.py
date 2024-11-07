import tweepy
from pydantic import BaseModel, Field

ACCOUNT_DETAILS_PROMPT = """
This tool will return account details for the currently authenticated Twitter (X) user context."""


class AccountDetailsInput(BaseModel):
    """Input argument schema for Twitter account details action."""

    no_input: str = Field(
        "",
        description="No input required, e.g. `` (empty string).",
    )


def account_details(client: tweepy.Client) -> str:
    """Get the authenticated Twitter (X) user account details.

    Returns:
        str: A message containing account details for the authenticated user context.

    """
    message = ""

    try:
        response = client.get_me()
        user = response.data

        message = f"""Successfully retrieved authenticated user account details. Please present the following as json and not markdown:
            id: {user.id}
            name: {user.name}
            username: {user.username}
            link: https://x.com/{user.username}"""
    except tweepy.errors.TweepyException as e:
        message = f"Error retrieving authenticated user account details: {e}"

    return message
