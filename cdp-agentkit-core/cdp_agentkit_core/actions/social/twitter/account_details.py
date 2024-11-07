
import tweepy
from pydantic import BaseModel

ACCOUNT_DETAILS_PROMPT = """
This tool will return account details for the authenticated user context."""

class AccountDetailsInput(BaseModel):
    """Input argument schema for twitter account details action."""

def account_details(client: tweepy.Client) -> str:
    """.

    Returns:
        str: A message containing account details for the authenticated user context.

    """
    message = ""

    try:
        response = client.get_me()
        user = response.data
        #  user_id, user_name, username  = itemgetter('id', 'name', 'username')

        message = f"""Successfully retrieved authenticated user account details. Please present the following as json and not markdown:
            id: {user.id}
            name: {user.name}
            username: {user.username}
            link: https://x.com/{user.username}"""
    except tweepy.errors.TweepyException as e:
        message = f"Error retrieving authenticated user account details: {e}"

    return message
