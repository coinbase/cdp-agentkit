from collections.abc import ABC, abstractmethod
from typing import Optional
from decimal import Decimal

from ..network import Network

class WalletProvider(ABC):
    """Base class for all wallet providers."""
    
    @abstractmethod
    def get_address(self) -> str:
        """Get the wallet address."""
        pass
    
    @abstractmethod
    def get_network(self) -> Network:
        """Get the current network."""
        pass
    
    @abstractmethod
    async def get_balance(self) -> Decimal:
        """Get the wallet balance in native currency."""
        pass
    
    @abstractmethod
    async def sign_message(self, message: str) -> str:
        """Sign a message with the wallet."""
        pass
    
    @abstractmethod
    def get_name(self) -> str:
        """Get the name of the wallet provider."""
        pass 
