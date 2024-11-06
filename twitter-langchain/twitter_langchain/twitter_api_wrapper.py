"""Util that calls Twitter API."""

import tweepy

from typing import Any

from pydantic import BaseModel, model_validator

from langchain_core.utils import get_from_dict_or_env

#  from cdp_agentkit_core.actions import (
#      twitter_post_text,
#  )

class TwitterApiWrapper(BaseModel):
    """Wrapper for Twitter API."""

    bearer_token: str | None = None
    client: Any | None = None

    @model_validator(mode="before")
    @classmethod
    def validate_environment(cls, values: dict) -> Any:
        """Validate that Twitter access token, token secret, and tweepy exists in the environment."""

        bearer_token = get_from_dict_or_env(values, "twitter_bearer_token", "TWITTER_BEARER_TOKEN")

        try:
            import tweepy
        except Exception:
            raise ImportError(
                "Tweepy Twitter SDK is not installed. " "Please install it with `pip install tweepy`"
            ) from None

        values["bearer_token"] = bearer_token
        client = tweepy.Client(bearer_token)

        return values

    def post_text_wrapper(self, text: str) -> str:
        """Post text to Twitter.

        Args:
            text (str): The text to post.

        Returns:
            str: A text containing the result of the post text to twitter response.

        """
        #  return twitter_post_text(client=self.client, text=text)
        return ""

    def run(self, mode: str, **kwargs) -> str:
        """Run the action via the Twitter API."""
        if mode == "post_text":
            return self.post_text_wrapper()
        else:
            raise ValueError("Invalid mode" + mode)
