"""Util that calls Twitter API."""

from typing import Any

from pydantic import BaseModel, model_validator


class TwitterApiWrapper(BaseModel):
    """Wrapper for Twitter API."""

    @model_validator(mode="before")
    @classmethod
    def validate_environment(cls, values: dict) -> Any:
        """TODO: Implement."""
        pass

    def run(self, mode: str, **kwargs) -> str:
        """Run the action via the Twitter API."""
        raise ValueError("Invalid mode" + mode)
