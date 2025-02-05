"""Coinbase AgentKit - Framework for enabling AI agents to take actions onchain."""

from .action_providers import ActionProvider, create_action, pyth_action_provider
from .agentkit import AgentKit, AgentKitOptions
from .wallet_providers import (
    EthAccountWalletProvider,
    EthAccountWalletProviderConfig,
    EvmWalletProvider,
    WalletProvider,
)

__version__ = "0.1.0"

__all__ = [
    "AgentKit",
    "AgentKitOptions",
    "ActionProvider",
    "create_action",
    "WalletProvider",
    "EvmWalletProvider",
    "EthAccountWalletProvider",
    "EthAccountWalletProviderConfig",
    "pyth_action_provider",
]
