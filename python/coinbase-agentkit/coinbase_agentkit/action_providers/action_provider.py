from abc import ABC, abstractmethod
from collections.abc import Callable
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field

from ..network import Network
from ..wallet_providers import WalletProvider

TWalletProvider = TypeVar("TWalletProvider", bound=WalletProvider)


class Action(BaseModel):
    """Represents an action that can be performed by an agent."""

    name: str
    description: str
    schema: type[BaseModel] | None = None
    invoke: Callable = Field(
        ..., exclude=True
    )  # exclude=True prevents serialization issues with callable

    model_config = ConfigDict(arbitrary_types_allowed=True)  # Updated Config syntax for Pydantic v2


class ActionProvider(Generic[TWalletProvider], ABC):
    """Base class for all action providers."""

    def __init__(
        self, name: str, action_providers: list["ActionProvider[TWalletProvider]"]
    ) -> None:
        self.name = name
        self.action_providers = action_providers

    def get_actions(self, wallet_provider: TWalletProvider) -> list[Action]:
        """Get all actions from this provider and its sub-providers."""
        actions: list[Action] = []

        action_providers = [self, *self.action_providers]

        for provider in action_providers:
            provider_actions = getattr(provider, "_actions", [])

            for action_metadata in provider_actions:
                actions.append(
                    Action(
                        name=action_metadata.name,
                        description=action_metadata.description,
                        schema=action_metadata.schema,
                        invoke=lambda args, m=action_metadata: (
                            m.invoke(wallet_provider, args) if m.wallet_provider else m.invoke(args)
                        ),
                    )
                )

        return actions

    @abstractmethod
    def supports_network(self, network: Network) -> bool:
        """Check if this provider supports the given network."""
        pass
