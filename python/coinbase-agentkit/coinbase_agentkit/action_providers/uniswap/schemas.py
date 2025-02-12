"""Input/Output schemas for Uniswap action provider."""
from typing import Literal

from pydantic import BaseModel, Field

# from ...validators.eth import validate_eth_address


class UniswapQuoteInput(BaseModel):
    """Input schema for getting Uniswap quotes."""
    token_address: str = Field(..., description="The token contract address")
    amount: str = Field(..., description="Amount of tokens (in wei)", pattern=r"^\d+$")
    quote_type: str = Field(..., description="Type of quote to get ('buy' or 'sell')")
    pool_address: str = Field(..., description="The Uniswap V3 pool contract address")

    # def validate_token_address(cls, v: str) -> str:
    #     """Validate that the token address is a valid Ethereum address."""
    #     return validate_eth_address(v)
