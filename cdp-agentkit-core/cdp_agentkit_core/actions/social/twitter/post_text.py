import tweepy
from pydantic import BaseModel, Field

POST_TEXT_PROMPT = """
This tool will post text on Twitter."""

class PostTextInput(BaseModel):
    """Input argument schema for twitter post text actions."""

    text: str = Field(
        ...,
        description="The text to post to twitter",
    )

def post_text(client: tweepy.Client, text: str) -> str:
    """Post text to Twitter.

    Args:
        client (tweepy.Client): The tweepy client to use.
        text (str): The text to post.

    Returns:
        str: A text containing the result of the post text to twitter response.

    """
    message = ""

    try:
        client.create_tweet(text=text)
        message = "Successfully posted!"
    except tweepy.errors.TweepyException as e:
        message = f"Error posting: {e}"

    return message
