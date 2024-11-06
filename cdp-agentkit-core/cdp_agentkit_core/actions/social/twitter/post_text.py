from typing import Any
import tweepy

from pydantic import BaseModel, Field

TWITTER_POST_TEXT_PROMPT = """
This tool will post a text on Twitter."""

class TwitterPostTextInput(BaseModel):
    """Input argument schema for twitter post text actions."""

    client: Any = Field(
        ...,
        description="The tweepy client used to interface with the Twitter API",
    )

    text: str = Field(
        ...,
        description="The text to post to twitter",
    )

def twitter_post_text(client: tweepy.Client, text: str) -> str:
    """Post text to Twitter.

    Args:
        text (str): The text to post.

    Returns:
        str: A text containing the result of the post text to twitter response.

    """

    message = ""

    try:
        client.create_tweet(text=text)
        message = f"Successfully posted!"
    except tweepy.error.TweepError as e:
        message = f"Error posting: {e}"

    return text
