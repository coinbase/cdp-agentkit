"""CDP wallet provider."""
from pydantic import BaseModel, Field


class CdpProviderConfig(BaseModel):
    """Configuration options for CDP providers."""

    api_key_name: str | None = Field(None, description="The CDP API key name")
    api_key_private_key: str | None = Field(None, description="The CDP API private key")
