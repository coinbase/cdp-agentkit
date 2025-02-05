from typing import List, Optional
from pydantic import BaseModel, ConfigDict

from .wallet_providers import WalletProvider
from .action_providers import ActionProvider, Action

class AgentKitOptions(BaseModel):
    """Configuration options for AgentKit."""
    cdp_api_key_name: Optional[str] = None
    cdp_api_key_private: Optional[str] = None
    wallet_provider: Optional[WalletProvider] = None
    action_providers: Optional[List[ActionProvider]] = None

    model_config = ConfigDict(arbitrary_types_allowed=True)

class AgentKit:
    """Main AgentKit class for managing wallet and action providers."""
    
    def __init__(self, options: AgentKitOptions):
        self.wallet_provider = options.wallet_provider
        self.action_providers = options.action_providers or []

    @classmethod
    def from_options(cls, options: AgentKitOptions) -> "AgentKit":
        """Create an AgentKit instance from options."""
        return cls(options)

    def get_actions(self) -> List[Action]:
        """Get all available actions."""
        if not self.wallet_provider:
            raise ValueError("No wallet provider configured")
            
        actions: List[Action] = []
        for provider in self.action_providers:
            if provider.supports_network(self.wallet_provider.get_network()):
                actions.extend(provider.get_actions(self.wallet_provider))
                
        return actions 