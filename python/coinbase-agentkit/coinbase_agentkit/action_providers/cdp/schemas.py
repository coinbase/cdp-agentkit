"""Schemas for CDP API actions."""

from pydantic import BaseModel, Field


class RequestFaucetFundsInput(BaseModel):
    """Input schema for requesting faucet funds."""

    asset_id: str | None = Field(
        None,
        description="The asset ID to request from the faucet (defaults to ETH if not specified)",
    )
