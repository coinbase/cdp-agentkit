import json
from collections.abc import Callable
from typing import Any

from allora_sdk.v2.api_client import AlloraAPIClient
from pydantic import BaseModel, Field, field_validator

from cdp_agentkit_core.actions.allora.action import AlloraAction

GET_INFERENCE_BY_TOPIC_ID_PROMPT = """
This tool will get inference for a specific topic from Allora Network.
It requires a topic ID as input, which can be obtained from the get_all_topics action.

A successful response will return a message with the inference data in JSON format. Example:
    {
        "network_inference": "0.5",
        "network_inference_normalized": "0.5",
        "confidence_interval_percentiles": ["0.1", "0.5", "0.9"],
        "confidence_interval_percentiles_normalized": ["0.1", "0.5", "0.9"],
        "confidence_interval_values": ["0.1", "0.5", "0.9"],
        "confidence_interval_values_normalized": ["0.1", "0.5", "0.9"],
        "topic_id": "1",
        "timestamp": 1718198400,
        "extra_data": "extra_data"
    }

The network_inference field is the inference for the topic.
The network_inference_normalized field is the normalized inference for the topic.

A failure response will return an error message with details about what went wrong,
such as invalid topic ID or API errors.
"""


class GetInferenceByTopicIdInput(BaseModel):
    """Input argument schema for get inference by topic ID action."""

    topic_id: int = Field(
        ...,
        description="The ID of the topic to get inference data for",
        gt=0,  # Must be greater than 0
    )

    @field_validator("topic_id", mode="before")
    @classmethod
    def validate_topic_id(cls, v: Any) -> int:
        """Validate topic_id is a positive integer."""
        if not isinstance(v, int) or isinstance(v, bool):
            raise ValueError("topic_id must be an integer")
        if v <= 0:
            raise ValueError("topic_id must be greater than 0")
        return v


async def get_inference_by_topic_id(client: AlloraAPIClient, topic_id: int) -> str:
    """Get inference data for a specific topic from Allora Network.

    Args:
        client (AlloraAPIClient): The Allora API client.
        topic_id (int): The ID of the topic to get inference for

    Returns:
        str: A message containing the inference data in JSON format, including:
            - network_inference: The raw inference value
            - network_inference_normalized: The normalized inference value
            - confidence_interval_percentiles: List of confidence interval percentiles
            - confidence_interval_values: List of confidence interval values
            - topic_id: The topic ID
            - timestamp: Unix timestamp of the inference
            - extra_data: Additional data if available

    Raises:
        Exception: If there's an error getting the inference from the API

    """
    try:
        inference = await client.get_inference_by_topic_id(topic_id)
        response_json = json.dumps(inference.inference_data, indent=2)
        return f"The inference for topic {topic_id} is:\n{response_json}"
    except Exception as e:
        return f"Error getting inference for topic {topic_id}: {e}"


class GetInferenceByTopicIdAction(AlloraAction):
    """Get inference by topic ID action."""

    name: str = "get_inference_by_topic_id"
    description: str = GET_INFERENCE_BY_TOPIC_ID_PROMPT
    args_schema: type[BaseModel] | None = GetInferenceByTopicIdInput
    func: Callable[..., str] = get_inference_by_topic_id
