from pydantic import BaseModel, ConfigDict

from .action_providers import Action, ActionProvider, wallet_action_provider
from .wallet_providers import CdpWalletProvider, CdpWalletProviderConfig, WalletProvider


class AgentKitConfig(BaseModel):
    """Configuration options for AgentKit."""

    cdp_api_key_name: str | None = None
    cdp_api_key_private_key: str | None = None
    wallet_provider: WalletProvider | None = None
    action_providers: list[ActionProvider] | None = None

    model_config = ConfigDict(arbitrary_types_allowed=True)


class AgentKit:
    """Main AgentKit class for managing wallet and action providers."""

    def __init__(self, config: AgentKitConfig | None = None):
        if not config:
            config = AgentKitConfig()

        self.wallet_provider = config.wallet_provider or CdpWalletProvider(
            CdpWalletProviderConfig(
                api_key_name=config.cdp_api_key_name,
                api_key_private_key=config.cdp_api_key_private_key,
            )
        )
        self.action_providers = config.action_providers or [wallet_action_provider()]

    def get_actions(self) -> list[Action]:
        """Get all available actions."""
        if not self.wallet_provider:
            raise ValueError("No wallet provider configured")

        actions: list[Action] = []
        for provider in self.action_providers:
            if provider.supports_network(self.wallet_provider.get_network()):
                actions.extend(provider.get_actions(self.wallet_provider))

        return actions
