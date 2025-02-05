"""Coinbase AgentKit - Framework for enabling AI agents to take actions onchain."""

from .agentkit import AgentKit
from .action_providers import ActionProvider, CreateAction, pyth_action_provider
from .wallet_providers import WalletProvider, EvmWalletProvider, CdpWalletProvider

__version__ = "0.1.0"

__all__ = [
    "AgentKit",
    "ActionProvider",
    "CreateAction",
    "WalletProvider",
    "EvmWalletProvider", 
    "CdpWalletProvider",
    "pyth_action_provider"
] 