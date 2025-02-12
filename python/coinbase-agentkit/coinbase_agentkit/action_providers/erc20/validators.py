"""Validators for ERC20 action inputs."""

import re

from pydantic_core import PydanticCustomError


def wei_amount_validator(value: str) -> str:
    """Validate that amount is a valid wei value (positive whole number as string)."""
    if not re.match(r"^[0-9]+$", value):
        raise PydanticCustomError(
            "wei_format",
            "Amount must be a positive whole number as a string",
            {"value": value},
        )

    if int(value) <= 0:
        raise PydanticCustomError(
            "positive_wei",
            "Amount must be greater than 0",
            {"value": value},
        )

    return value
