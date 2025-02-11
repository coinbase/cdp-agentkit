from pydantic import BaseModel, Field
from typing import Optional
from tools.dalle_nft import dalle_nft, initialize_wallet

class DalleNftInput(BaseModel):
    """Input schema for DALL-E NFT generation."""
    prompt: str = Field(
        ...,
        description="Text prompt for DALL-E image generation",
        example="A majestic dragon soaring through a cyberpunk city"
    )
    collection_name: Optional[str] = Field(
        None,
        description="Name of the NFT collection (required if contract_address not provided)",
        example="CyberDragons"
    )
    collection_symbol: Optional[str] = Field(
        None,
        description="Symbol of the NFT collection (required if contract_address not provided)",
        example="CDRG"
    )
    contract_address: Optional[str] = Field(
        None,
        description="Optional existing NFT contract address",
        example="0x123..."
    )

DALLE_NFT_PROMPT = """
Generates an image using DALL-E based on a text prompt and mint it as an NFT.
The NFT will be minted to your wallet address on Base Sepolia testnet.

Required environment variables:
- OPENAI_API_KEY: For DALL-E image generation
- PINATA_JWT: For IPFS uploads

The NFT will be viewable on OpenSea's testnet.
"""

def create_dalle_nft_tool():
    """Create a DALL-E NFT generation tool."""
    wallet = initialize_wallet()
    
    def _run(prompt: str, collection_name: Optional[str] = None, 
             collection_symbol: Optional[str] = None, 
             contract_address: Optional[str] = None) -> str:
        return dalle_nft(
            wallet=wallet,
            prompt=prompt,
            destination=wallet.default_address.address_id,
            collection_name=collection_name,
            collection_symbol=collection_symbol,
            contract_address=contract_address
        )

    return {
        "name": "dalle_nft",
        "description": DALLE_NFT_PROMPT,
        "args_schema": DalleNftInput,
        "func": _run
    }

