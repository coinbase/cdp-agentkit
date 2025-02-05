from typing import Optional
from pydantic import BaseModel

class Network(BaseModel):
    """Represents a blockchain network."""
    protocol_family: str
    network_id: Optional[str] = None
    chain_id: Optional[int] = None 