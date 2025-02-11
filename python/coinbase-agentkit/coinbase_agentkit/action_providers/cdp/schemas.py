"""Schemas for CDP API actions."""

from typing import Any

from pydantic import BaseModel, Field


class RequestFaucetFundsInput(BaseModel):
    """Input schema for requesting faucet funds."""

    asset_id: str | None = Field(
        None,
        description="The asset ID to request from the faucet (defaults to ETH if not specified)",
    )


class DeployContractSchema(BaseModel):
    """Input argument schema for deploy contract action."""

    solidity_version: str = Field(..., description="The solidity compiler version")
    solidity_input_json: str = Field(..., description="The input json for the solidity compiler")
    contract_name: str = Field(..., description="The name of the contract class to be deployed")
    constructor_args: dict[str, Any] | None = Field(
        default=None, description="The constructor arguments for the contract"
    )


class DeployNftSchema(BaseModel):
    """Input argument schema for deploy NFT action."""

    name: str = Field(
        ...,
        description="The name of the NFT (ERC-721) token collection to deploy, e.g. `Helpful Hippos`",
    )
    symbol: str = Field(
        ...,
        description="The symbol of the NFT (ERC-721) token collection to deploy, e.g. `HIPPO`",
    )
    base_uri: str = Field(
        ...,
        description="The base URI for the NFT (ERC-721) token collection's metadata, e.g. `https://www.helpfulhippos.xyz/metadata/`",
    )


class DeployTokenSchema(BaseModel):
    """Input argument schema for deploy token action."""

    name: str = Field(..., description='The name of the token (e.g., "My Token")')
    symbol: str = Field(..., description='The token symbol (e.g., "USDC", "MEME", "SYM")')
    total_supply: str = Field(
        ..., description='The total supply of tokens to mint (e.g., "1000000")'
    )
