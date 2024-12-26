"""Util that calls Warpcast API."""

import inspect
from collections.abc import Callable
from typing import Any
import requests

from langchain_core.utils import get_from_dict_or_env
from pydantic import BaseModel, model_validator


class WarpcastApiWrapper(BaseModel):
    """Wrapper for Warpcast API."""

    api_key: str
    base_url: str = "https://api.warpcast.com/v2"

    @model_validator(mode="before")
    @classmethod
    def validate_environment(cls, values: dict) -> Any:
        """Validate that Warpcast API key exists in the environment."""
        api_key = get_from_dict_or_env(values, "warpcast_api_key", "WARPCAST_API_KEY")
        values["api_key"] = api_key
        return values

    def _make_request(self, method: str, endpoint: str, **kwargs) -> dict:
        """Make a request to the Warpcast API."""
        headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        url = f"{self.base_url}/{endpoint}"
        response = requests.request(method, url, headers=headers, **kwargs)
        response.raise_for_status()
        return response.json()

    def run_action(self, func: Callable[..., str], **kwargs) -> str:
        """Run a Warpcast Action."""
        func_signature = inspect.signature(func)
        first_kwarg = next(iter(func_signature.parameters.values()), None)

        # Check if the function expects a client as its first parameter
        if first_kwarg and first_kwarg.name == "client":
            return func(self, **kwargs)
        else:
            return func(**kwargs)

    def cast(self, text: str) -> str:
        """Post a cast to Warpcast.

        Args:
            text (str): The text to cast. Maximum 320 characters.

        Returns:
            str: A message containing the result of the cast action.
        """
        if len(text) > 320:
            raise ValueError("Cast text must be 320 characters or less")

        try:
            response = self._make_request("POST", "casts", json={"text": text})
            return f"Successfully posted cast: {text}"
        except Exception as e:
            return f"Failed to post cast: {str(e)}"

    def reply_to_cast(self, cast_hash: str, text: str) -> str:
        """Reply to an existing cast.

        Args:
            cast_hash (str): The hash of the cast to reply to.
            text (str): The text of the reply. Maximum 320 characters.

        Returns:
            str: A message containing the result of the reply action.
        """
        if len(text) > 320:
            raise ValueError("Reply text must be 320 characters or less")

        try:
            response = self._make_request(
                "POST", 
                f"casts/{cast_hash}/replies", 
                json={"text": text}
            )
            return f"Successfully replied to cast {cast_hash}: {text}"
        except Exception as e:
            return f"Failed to reply to cast: {str(e)}"

    def get_user_details(self, fid: str) -> str:
        """Get details about a Warpcast user.

        Args:
            fid (str): The FID (Farcaster ID) of the user.

        Returns:
            str: User details in a formatted string.
        """
        try:
            response = self._make_request("GET", f"users/{fid}")
            return f"Retrieved user details for FID {fid}"
        except Exception as e:
            return f"Failed to get user details: {str(e)}"

    def get_user_casts(self, fid: str, limit: int = 10) -> str:
        """Get recent casts from a user.

        Args:
            fid (str): The FID (Farcaster ID) of the user.
            limit (int): Number of casts to retrieve (max 100).

        Returns:
            str: A message containing the retrieved casts.
        """
        if limit > 100:
            raise ValueError("Cannot retrieve more than 100 casts at once")

        try:
            response = self._make_request("GET", f"users/{fid}/casts", params={"limit": limit})
            return f"Retrieved {len(response.get('data', []))} casts from user {fid}"
        except Exception as e:
            return f"Failed to get user casts: {str(e)}" 