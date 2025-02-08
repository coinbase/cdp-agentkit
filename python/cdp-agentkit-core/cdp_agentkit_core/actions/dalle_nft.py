import os
import requests
from collections.abc import Callable
from openai import OpenAI
from cdp import Wallet
from pydantic import BaseModel, Field
from typing import Optional
import json
import io

from cdp_agentkit_core.actions import CdpAction

DALLE_NFT_PROMPT = """
Takes a text prompt and creates a DALL-E image and mints an NFT to a specified destination address.
1. Generate an image using DALL-E based on a text prompt
2. Upload the image to IPFS via Pinata
3. Create and upload NFT metadata to IPFS
4. Deploy a new NFT contract if no existing contract address is provided
5. Mint the NFT to the specified destination address

Required environment variables:
- OPENAI_API_KEY: For accessing DALL-E API
- PINATA_JWT: For uploading to IPFS
"""

class DalleNftInput(BaseModel):
    """Input argument schema for DALL-E NFT integration."""
    prompt: str = Field(
        ...,
        description="Text prompt for DALL-E image generation",
        json_schema_extra={"example": "A majestic dragon soaring through a cyberpunk city"}
    )
    destination: str = Field(
        ...,
        description="Destination address to mint the NFT to",
        json_schema_extra={"example": "0x036CbD53842c5426634e7929541eC2318f3dCF7e"}
    )
    contract_address: Optional[str] = Field(
        None,
        description="Optional: Existing NFT contract address. If not provided, a new collection will be deployed",
    )
    collection_name: Optional[str] = Field(
        None,
        description="Required if contract_address is not provided: Name of the NFT collection",
        json_schema_extra={"example": "DALL-E Warriors"}
    )
    collection_symbol: Optional[str] = Field(
        None,
        description="Required if contract_address is not provided: Symbol of the NFT collection",
        json_schema_extra={"example": "DWAR"}
    )

def get_openai_client() -> OpenAI:
    """Get OpenAI client instance."""
    return OpenAI()

def generate_dalle_image(prompt: str, client: OpenAI | None = None) -> str:
    """Generate an image using DALL-E-3."""
    if client is None:
        client = get_openai_client()
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        return response.data[0].url
    except Exception as e:
        raise Exception(f"Error generating DALL-E image: {e}") from e

def upload_to_ipfs(image_url: str) -> tuple[str, str]:
    """Upload an image to IPFS via Pinata."""
    # TODO
    pass

def create_and_upload_metadata(prompt: str, image_ipfs_url: str) -> str:
    """Create and upload NFT metadata to IPFS."""
    # TODO
    pass

def dalle_nft(
    wallet: Wallet,
    prompt: str,
    destination: str,
    contract_address: Optional[str] = None,
    collection_name: Optional[str] = None,
    collection_symbol: Optional[str] = None,
) -> str:
    """Generate DALL-E image and mint it as NFT."""
    # Check for missing collection info at start
    if not contract_address and (not collection_name or not collection_symbol):
        raise ValueError("collection_name and collection_symbol required when contract_address not provided")

    try:
        print("🎨 Generating image with DALL-E...")
        image_url = generate_dalle_image(prompt)

        print("📤 Uploading image to IPFS...")
        ipfs_url, gateway_url = upload_to_ipfs(image_url)

        print("📝 Creating NFT metadata...")
        metadata_uri = create_and_upload_metadata(prompt, ipfs_url)
        base_uri = metadata_uri.rsplit('/', 1)[0] + '/'

        if not contract_address:
            print("📝 Deploying new NFT contract...")
            deploy_result = wallet.deploy_nft(
                name=collection_name,
                symbol=collection_symbol,
                base_uri=base_uri
            ).wait()
            contract_address = deploy_result.contract_address
            deploy_tx = f"Deploy Transaction: {deploy_result.transaction.transaction_link}\n"
        else:
            deploy_tx = ""

        print("🎯 Minting NFT...")
        mint_args = {"to": destination, "quantity": "1"}
        mint_result = wallet.invoke_contract(
            contract_address=contract_address,
            method="mint",
            args=mint_args
        ).wait()

        print("✨ Success! NFT minted!")
        
        # Add OpenSea link
        opensea_url = f"https://testnets.opensea.io/assets/base_sepolia/{contract_address}/0"
        
        return (
            f"Successfully created and minted DALL-E NFT!\n"
            f"Contract Address: {contract_address}\n"
            f"DALL-E Image URL: {image_url}\n"
            f"IPFS Gateway URL: {gateway_url}\n"
            f"Metadata URI: {metadata_uri}\n"
            f"Mint Transaction: {mint_result.transaction.transaction_link}\n"
            f"{deploy_tx}"
            f"View on OpenSea: {opensea_url}\n"
        )
    except Exception as e:
        if isinstance(e, ValueError):
            raise
        return f"Error in DALL-E NFT process: {e}"

class DalleNftAction(CdpAction):
    """DALL-E NFT integration action."""
    name: str = "dalle_nft"
    description: str = DALLE_NFT_PROMPT
    args_schema: type[BaseModel] | None = DalleNftInput
    func: Callable[..., str] = dalle_nft

__all__ = ["DalleNftAction"]
