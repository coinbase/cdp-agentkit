
from pydantic import BaseModel, Field, field_validator

from .validators import eth_address_validator, positive_decimal_validator


class GetWalletDetailsInput(BaseModel):
    """Input schema for getting wallet details."""

    # No additional fields needed as this action doesn't require any input parameters
    pass


class GetBalanceInput(BaseModel):
    """Input schema for getting native currency balance."""

    # No additional fields needed as this action doesn't require any input parameters
    pass


class NativeTransferInput(BaseModel):
    """Input schema for native asset transfer."""

    to: str = Field(..., description="The destination address to transfer to (e.g. '0x5154eae861cac3aa757d6016babaf972341354cf')")
    value: str = Field(..., description="The amount to transfer in whole units (e.g. '1.5' for 1.5 ETH)")

    @field_validator("to")
    @classmethod
    def validate_address(cls, v: str) -> str:
        """Validate the Ethereum address format."""
        return eth_address_validator(v)

    @field_validator("value")
    @classmethod
    def validate_value(cls, v: str) -> str:
        """Validate the transfer value."""
        return positive_decimal_validator(v)
