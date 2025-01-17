from collections.abc import Callable

from cdp import Address
from pydantic import BaseModel, Field, field_validator
import re

from cdp_agentkit_core.actions import CdpAction

#  TODO: ask John what he thinks about standardizing responses to be the json API responses
ADDRESS_REPUTATION_PROMPT = """
This tool checks the reputation of an address on a given network. It takes:

- network: The network the address is on (e.g. "base-sepolia")
- address: The Ethereum address to check

and returns:
"""


class AddressReputationInput(BaseModel):
    """Input argument schema for checking address reputation."""

    address: str = Field(
        ...,
        description="The Ethereum address to check",
    )

    network: str = Field(
        ...,
        description="The network to check the address on",
    )

    @field_validator("address")
    def validate_address(cls, v: str) -> str:
        if not re.match(r"^0x[a-fA-F0-9]{40}$", v):
            raise ValueError("Invalid Ethereum address format")
        return v


def check_address_reputation(address: str, network: str) -> str:
    """Check the reputation of an address.

    Args:
        address (str): The Ethereum address to check
        network (str): The network the address is on

    Returns:
        str: A string containing the reputation json data or error message
    """
    try:
        address = Address(network, address)
        reputation = address.reputation()
        return str(reputation)
    except Exception as e:
        return f"Error checking address reputation: {e!s}"


class AddressReputationAction(CdpAction):
    """Address reputation check action."""

    name: str = "address_reputation"
    description: str = ADDRESS_REPUTATION_PROMPT
    args_schema: type[BaseModel] | None = AddressReputationInput
    func: Callable[..., str] = check_address_reputation
