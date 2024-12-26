from collections.abc import Callable
from json import dumps
from typing import Any

from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.social.warpcast.action import WarpcastAction

CAST_PROMPT = """
This tool will post a new cast to Warpcast.

A successful response will return a message with the api response as a json payload:
    {"data": {"hash": "0x123...", "text": "Hello Farcaster!"}}

A failure response will return a message with the error:
    Error posting cast: Text exceeds maximum length
"""


class CastInput(BaseModel):
    """Input argument schema for Warpcast cast action."""

    text: str = Field(
        ...,
        description="The text to cast. Maximum 320 characters.",
    )


def cast(client: Any, text: str) -> str:
    """Post a cast to Warpcast.

    Args:
        client: The Warpcast API wrapper.
        text (str): The text to cast.

    Returns:
        str: A message containing the result of the cast action.
    """
    if len(text) > 320:
        return "Error posting cast: Text exceeds maximum length of 320 characters"

    try:
        response = client._make_request(
            "POST", 
            "casts", 
            json={"text": text}
        )
        return f"Successfully posted cast:\n{dumps(response)}"
    except Exception as e:
        return f"Error posting cast:\n{e}"


class CastAction(WarpcastAction):
    """Warpcast cast action."""

    name: str = "cast"
    description: str = CAST_PROMPT
    args_schema: type[BaseModel] | None = CastInput
    func: Callable[..., str] = cast 