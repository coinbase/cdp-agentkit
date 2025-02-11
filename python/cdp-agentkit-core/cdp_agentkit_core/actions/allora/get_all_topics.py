import json
from collections.abc import Callable

from allora_sdk.v2.api_client import AlloraAPIClient
from pydantic import BaseModel

from cdp_agentkit_core.actions.allora.action import AlloraAction

GET_ALL_TOPICS_PROMPT = """
This tool will get all available inference topics from Allora Network.
A successful response will return a message with a list of available topics from Allora Network in JSON format. Example:
    [
        {
            "topic_id": 1,
            "topic_name": "Bitcoin 8h",
            "description": "Bitcoin price prediction for the next 8 hours",
            "epoch_length": 100,
            "ground_truth_lag": 10,
            "loss_method": "method1",
            "worker_submission_window": 50,
            "worker_count": 5,
            "reputer_count": 3,
            "total_staked_allo": 1000,
            "total_emissions_allo": 500,
            "is_active": true,
            "updated_at": "2023-01-01T00:00:00Z"
        }
    ]
The description field is a short description of the topic, and the topic_name is the name of the topic. These fields can be used to understand the topic and its purpose.
The topic_id field is the unique identifier for the topic, and can be used to get the inference data for the topic using the get_inference_by_topic_id action.
The is_active field indicates if the topic is currently active and accepting submissions.
The updated_at field is the timestamp of the last update for the topic.

A failure response will return an error message with details.
"""


async def get_all_topics(client: AlloraAPIClient) -> str:
    """Get all available topics from Allora Network.

    Args:
        client (AlloraAPIClient): The Allora API client.

    Returns:
        str: A list of available topics from Allora Network in JSON format

    """
    try:
        topics = await client.get_all_topics()
        topics_json = json.dumps(topics, indent=4)
        return f"The available topics at Allora Network are:\n{topics_json}"
    except Exception as e:
        return f"Error getting all topics: {e}"


class GetAllTopicsAction(AlloraAction):
    """Get all topics action."""

    name: str = "get_all_topics"
    description: str = GET_ALL_TOPICS_PROMPT
    args_schema: type[BaseModel] | None = None
    func: Callable[..., str] = get_all_topics
