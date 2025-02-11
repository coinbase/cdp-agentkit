"""Validators for wallet action inputs."""
import re
from decimal import Decimal

from pydantic_core import PydanticCustomError


def eth_address_validator(value: str) -> str:
    """Validate Ethereum address format."""
    pattern = r"^0x[a-fA-F0-9]{40}$"
    if not re.match(pattern, value):
        raise PydanticCustomError(
            "eth_address",
            "Invalid Ethereum address format. Must be a 0x-prefixed hex string with 40 characters.",
            {"pattern": pattern},
        )
    return value


def positive_decimal_validator(value: str) -> str:
    """Validate positive decimal number format."""
    pattern = r"^[0-9]*\.?[0-9]+$"
    if not re.match(pattern, value):
        raise PydanticCustomError(
            "decimal_format",
            "Invalid decimal format. Must be a positive number.",
            {"pattern": pattern},
        )

    try:
        decimal_value = Decimal(value)
        if decimal_value <= 0:
            raise PydanticCustomError(
                "positive_decimal",
                "Value must be greater than 0",
                {"value": value},
            )
    except (ValueError, TypeError, ArithmeticError) as e:
        raise PydanticCustomError(
            "decimal_parse",
            "Failed to parse decimal value",
            {"error": str(e)},
        ) from e

    return value
