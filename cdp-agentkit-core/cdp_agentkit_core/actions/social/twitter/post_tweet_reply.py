from collections.abc import Callable
from json import dumps

import tweepy
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.social.twitter import TwitterAction

POST_TWEET_REPLY_REPLY_PROMPT = """
This tool will post a reply to a tweet on Twitter. The tool takes the text of the tweet as input and the tweet id to reply to. Tweets can be maximum 280 characters."""


class PostTweetReplyInput(BaseModel):
    """Input argument schema for twitter post tweet reply action."""

    tweet_id: str = Field(
        ...,
        description="The tweet id to post a reply to twitter",
    )

    tweet_reply: str = Field(
        ...,
        description="The text of the tweet to post in reply to another tweet on twitter. Tweets can be maximum 280 characters.",
    )


def post_tweet_reply(client: tweepy.Client, tweet_id: str, tweet_reply: str) -> str:
    """post tweet reply to Twitter.

    Args:
        client (tweepy.Client): The tweepy client to use.
        tweet (str): The text of the tweet to post to twitter. Tweets can be maximum 280 characters.

    Returns:
        str: A message containing the result of the post action and the tweet.

    """
    message = ""

    try:
        response = client.create_tweet(text=tweet_reply, in_reply_to_tweet_id=tweet_id)
        data = response.data

        message = f"Successfully posted reply to Twitter:\n{dumps(data)}"
    except tweepy.errors.TweepyException as e:
        message = f"Error posting reply to Twitter: {e}"

    return message


class PostTweetReplyAction(TwitterAction):
    """Twitter (X) post tweet reply action."""

    name: str = "post_tweet_reply"
    description: str = POST_TWEET_REPLY_REPLY_PROMPT
    args_schema: type[BaseModel] | None = PostTweetReplyInput
    func: Callable[..., str] = post_tweet_reply
