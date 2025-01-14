from enum import Enum
from typing import Any

from cdp import Webhook
from cdp.client.models.webhook import WebhookEventTypeFilter
from cdp.client.models.webhook_smart_contract_event_filter import WebhookSmartContractEventFilter
from cdp.client.models.webhook_wallet_activity_filter import WebhookWalletActivityFilter
from pydantic import BaseModel, Field, HttpUrl, field_validator, model_validator

from cdp_agentkit_core.actions import CdpAction

CREATE_WEBHOOK_PROMPT = """
Create a new webhook to receive real-time updates for on-chain events.
Supports monitoring wallet activity or smart contract events by specifying:
- Callback URL for receiving events
- Event type (wallet_activity, smart_contract_event_activity, erc20_transfer or erc721_transfer)
- wallet or contract addresses to listen
Also supports monitoring erc20_transfer or erc721_transfer, when those are defined at least one of these filters needs to be provided (only one of them is required):
- Contract address to listen for token transfers
- Sender address for erc20_transfer and erc721_transfer (listen on transfers originating from this address)
- Recipient address for erc20_transfer and erc721_transfer (listen on transfers being made to this address)
Ensure event_type_filter is only sent when eventy_type is wallet_activity or smart_contract_event_activity and event_filters is only sent when event_type is erc20_transfer or erc721_transfer
"""

class WebhookEventType(str, Enum):
    """Valid webhook event types."""

    WALLET_ACTIVITY = "wallet_activity"
    SMART_CONTRACT_EVENT_ACTIVITY = "smart_contract_event_activity"
    ERC20_TRANSFER = "erc20_transfer"
    ERC721_TRANSFER = "erc721_transfer"

class WebhookNetworks(str, Enum):
    """Networks available for creating webhooks."""

    BASE_MAINNET = "base-mainnet"
    BASE_SEPOLIA = "base-sepolia"

class EventFilter(BaseModel):
    """Schema for event filters."""

    from_address: str | None = Field(None, description="Sender address for token transfers")
    to_address: str | None = Field(None, description="Recipient address for token transfers")
    contract_address: str | None = Field(None, description="Contract address for token transfers")

    @model_validator(mode='after')
    def validate_at_least_one_filter(self) -> 'EventFilter':
        """Ensure at least one filter is provided."""
        if not any([self.from_address, self.to_address, self.contract_address]):
            raise ValueError("At least one filter must be provided")
        return self

class EventTypeFilter(BaseModel):
    """Schema for event type filter."""

    addresses: list[str] | None = Field(None, description="List of wallet or contract addresses to monitor")

    @field_validator('addresses')
    @classmethod
    def validate_addresses_not_empty(cls, v: list[str] | None) -> list[str] | None:
        """Ensure addresses list is not empty when provided."""
        if v is not None and len(v) == 0:
            raise ValueError("addresses must contain at least one value when provided")
        return v

class WebhookInput(BaseModel):
    """Input schema for create webhook action."""

    notification_uri: HttpUrl = Field(..., description="The callback URL where webhook events will be sent")
    event_type: WebhookEventType
    event_type_filter: EventTypeFilter | None = None
    event_filters: list[EventFilter] | None = None
    network_id: WebhookNetworks

    @model_validator(mode='after')
    def validate_filters(self) -> 'WebhookInput':
        """Validate that the correct filter is provided based on event type."""
        if self.event_type in [WebhookEventType.WALLET_ACTIVITY, WebhookEventType.SMART_CONTRACT_EVENT_ACTIVITY]:
            if self.event_filters is not None:
                raise ValueError(
                    f"event_filters should not be provided when event_type is {self.event_type}. "
                    "Use event_type_filter instead."
                )
            if self.event_type_filter is None:
                raise ValueError(
                    f"event_type_filter must be provided when event_type is {self.event_type}"
                )

        if self.event_type in [WebhookEventType.ERC20_TRANSFER, WebhookEventType.ERC721_TRANSFER]:
            if self.event_type_filter is not None:
                raise ValueError(
                    f"event_type_filter should not be provided when event_type is {self.event_type}. "
                    "Use event_filters instead."
                )
            if not self.event_filters:
                raise ValueError(
                    f"event_filters must be provided when event_type is {self.event_type}"
                )

        return self

def create_webhook(
    notification_uri: str | HttpUrl,
    event_type: str,
    network_id: str,
    event_type_filter: dict[str, Any] | None = None,
    event_filters: list[dict[str, Any]] | None = None,
) -> str:
    """Create a new webhook for monitoring on-chain events.

    Args:
        notification_uri: The callback URL where webhook events will be sent
        event_type: Type of events to monitor
        network_id: Network to monitor
        event_type_filter: Filter for event types, this will only be used when eventy_type is wallet_activity or smart_contract_event_activity
        event_filters: Filters for events, this filter will only be used when event_type is erc20_transfer or erc721_transfer

    Returns:
        str: Details of the created webhook

    """
    print(f"notification_uri: {notification_uri}")
    print(f"event_type_filter: {event_type_filter}")
    print(f"event_filters: {event_filters}")
    try:
        webhook_options = {
            "notification_uri": str(notification_uri),
            "event_type": event_type,
            "network_id": network_id,
        }

        # Handle different event types with appropriate filtering
        if event_type == WebhookEventType.WALLET_ACTIVITY:
            wallet_activity_filter = WebhookWalletActivityFilter(
                addresses=event_type_filter.get("addresses", []) if event_type_filter else [],
                wallet_id=""
            )
            webhook_options["event_type_filter"] = WebhookEventTypeFilter(actual_instance=wallet_activity_filter)

        elif event_type == WebhookEventType.SMART_CONTRACT_EVENT_ACTIVITY:
            contract_activity_filter = WebhookSmartContractEventFilter(
                contract_addresses=event_type_filter.get("addresses", []) if event_type_filter else [],
            )
            webhook_options["event_type_filter"] = WebhookEventTypeFilter(actual_instance=contract_activity_filter)

        elif event_type in [WebhookEventType.ERC20_TRANSFER, WebhookEventType.ERC721_TRANSFER]:
            if event_filters and event_filters[0]:
                filter_dict = {}
                if event_filters[0].get("contract_address"):
                    filter_dict["contract_address"] = event_filters[0]["contract_address"]
                if event_filters[0].get("from_address"):
                    filter_dict["from_address"] = event_filters[0]["from_address"]
                if event_filters[0].get("to_address"):
                    filter_dict["to_address"] = event_filters[0]["to_address"]
                webhook_options["event_filters"] = [filter_dict]
        else:
            raise ValueError(f"Unsupported event type: {event_type}")

        # Create webhook using Webhook.create()
        print(f"webhook_options: {webhook_options}")
        webhook = Webhook.create(**webhook_options)
        return f"The webhook was successfully created: {webhook}\n\n"

    except Exception as error:
        return f"Error: {error!s}"

class CreateWebhookAction(CdpAction):
    """Create webhook action."""

    name: str = "create_webhook"
    description: str = CREATE_WEBHOOK_PROMPT
    args_schema: type[BaseModel] = WebhookInput
    func = create_webhook
