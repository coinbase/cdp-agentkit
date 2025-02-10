"""Coinbase AgentKit - Framework for enabling AI agents to take actions onchain."""

from .action_providers import (
    Action,
    ActionProvider,
    create_action,
    morpho_action_provider,
    pyth_action_provider,
    wallet_action_provider,
    weth_action_provider,
)
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
    "Action",
    "ActionProvider",
    "create_action",
    "WalletProvider",
    "EvmWalletProvider",
    "EthAccountWalletProvider",
    "EthAccountWalletProviderConfig",
    "morpho_action_provider",
    "pyth_action_provider",
    "wallet_action_provider",
    "weth_action_provider",
]
