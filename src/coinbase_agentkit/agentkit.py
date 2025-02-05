from typing import List, Optional
from pydantic import BaseModel

from .wallet_providers import WalletProvider, CdpWalletProvider
from .action_providers import ActionProvider, Action

class AgentKitOptions(BaseModel):
    """Configuration options for AgentKit."""
    cdp_api_key_name: Optional[str] = None
    cdp_api_key_private: Optional[str] = None
    wallet_provider: Optional[WalletProvider] = None
    action_providers: Optional[List[ActionProvider]] = None

class AgentKit:
    """Main AgentKit class for managing wallet and action providers."""
    
    def __init__(self, options: AgentKitOptions):
        self.wallet_provider = options.wallet_provider
        self.action_providers = options.action_providers or []

    @classmethod
    async def from_options(cls, options: AgentKitOptions) -> "AgentKit":
        """Create an AgentKit instance from options."""
        if not options.wallet_provider and options.cdp_api_key_name and options.cdp_api_key_private:
            options.wallet_provider = await CdpWalletProvider.configure_with_wallet(
                api_key_name=options.cdp_api_key_name,
                api_key_private=options.cdp_api_key_private
            )
            
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