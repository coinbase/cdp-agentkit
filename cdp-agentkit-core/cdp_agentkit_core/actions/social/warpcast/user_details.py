from collections.abc import Callable
from json import dumps
from typing import Any

from pydantic import BaseModel, Field

from cdp_agentkit_core.actions.social.warpcast.action import WarpcastAction

USER_DETAILS_PROMPT = """
This tool will return user details for a Warpcast user by their FID.

A successful response will return a message with the api response as a json payload:
    {"data": {"fid": "1234", "username": "example", "displayName": "Example User", "pfp": "..."}}

A failure response will return a message with the error:
    Error retrieving user details: User not found
"""


class UserDetailsInput(BaseModel):
    """Input argument schema for Warpcast user details action."""

    fid: str = Field(
        ...,
        description="The FID (Farcaster ID) of the user to get details for",
    )


def user_details(client: Any, fid: str) -> str:
    """Get details for a Warpcast user.

    Args:
        client: The Warpcast API wrapper.
        fid (str): The FID of the user to get details for.

    Returns:
        str: A message containing user details.
    """
    try:
        response = client._make_request("GET", f"users/{fid}")
        return f"Successfully retrieved user details:\n{dumps(response)}"
    except Exception as e:
        return f"Error retrieving user details:\n{e}"


class UserDetailsAction(WarpcastAction):
    """Warpcast user details action."""

    name: str = "user_details"
    description: str = USER_DETAILS_PROMPT
    args_schema: type[BaseModel] | None = UserDetailsInput
    func: Callable[..., str] = user_details 