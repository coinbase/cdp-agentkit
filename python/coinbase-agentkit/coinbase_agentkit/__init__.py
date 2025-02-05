"""Coinbase AgentKit - Framework for enabling AI agents to take actions onchain."""

from .agentkit import AgentKit, AgentKitOptions
from .action_providers import ActionProvider, CreateAction, pyth_action_provider
from .wallet_providers import WalletProvider, EvmWalletProvider, EthAccountWalletProvider, EthAccountWalletProviderConfig

__version__ = "0.1.0"

__all__ = [
    "AgentKit",
    "AgentKitOptions",
    "ActionProvider",
    "CreateAction",
    "WalletProvider",
    "EvmWalletProvider", 
    "EthAccountWalletProvider",
    "EthAccountWalletProviderConfig",
    "pyth_action_provider"
] 