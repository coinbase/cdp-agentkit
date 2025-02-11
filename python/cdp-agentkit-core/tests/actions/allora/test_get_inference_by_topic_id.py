import json
from unittest.mock import AsyncMock, MagicMock

import pytest

from cdp_agentkit_core.actions.allora.get_inference_by_topic_id import (
    GET_INFERENCE_BY_TOPIC_ID_PROMPT,
    GetInferenceByTopicIdAction,
    GetInferenceByTopicIdInput,
    get_inference_by_topic_id,
)


def test_get_inference_by_topic_id_input_schema() -> None:
    """Test get inference by topic ID input schema."""
    # Test valid inputs
    valid_inputs = [
        {"topic_id": 1},
        {"topic_id": 100},
        {"topic_id": 999999},
    ]
    for input_data in valid_inputs:
        parsed_input = GetInferenceByTopicIdInput(**input_data)
        assert parsed_input.topic_id == input_data["topic_id"]

    # Test invalid topic IDs
    invalid_topic_ids = [
        0,  # Zero is not allowed
        -1,  # Negative numbers not allowed
        "1",  # String not allowed
        1.5,  # Float not allowed
    ]
    for topic_id in invalid_topic_ids:
        with pytest.raises(ValueError) as exc_info:
            GetInferenceByTopicIdInput(topic_id=topic_id)
        error_msg = str(exc_info.value)
        if isinstance(topic_id, int | float) and topic_id <= 0:
            assert "greater than 0" in error_msg
        else:
            assert "must be an integer" in error_msg

    # Test missing required fields
    with pytest.raises(ValueError, match="1 validation error"):
        GetInferenceByTopicIdInput()


@pytest.mark.asyncio
async def test_get_inference_by_topic_id_success() -> None:
    """Test get inference by topic ID success case."""
    mock_client = AsyncMock()
    mock_inference_data = MagicMock()
    mock_inference_data.inference_data = {
        "network_inference": "0.5",
        "network_inference_normalized": "0.5",
        "confidence_interval_percentiles": ["0.1", "0.5", "0.9"],
        "confidence_interval_percentiles_normalized": ["0.1", "0.5", "0.9"],
        "confidence_interval_values": ["0.1", "0.5", "0.9"],
        "confidence_interval_values_normalized": ["0.1", "0.5", "0.9"],
        "topic_id": "1",
        "timestamp": 1718198400,
        "extra_data": "extra_data",
    }
    mock_client.get_inference_by_topic_id.return_value = mock_inference_data

    topic_id = 1
    result = await get_inference_by_topic_id(mock_client, topic_id)

    mock_client.get_inference_by_topic_id.assert_called_once_with(topic_id)
    assert f"The inference for topic {topic_id} is:" in result
    assert json.dumps(mock_inference_data.inference_data, indent=2) in result


@pytest.mark.asyncio
async def test_get_inference_by_topic_id_error() -> None:
    """Test get inference by topic ID error case."""
    mock_client = AsyncMock()
    mock_client.get_inference_by_topic_id.side_effect = Exception("API Error")

    topic_id = 1
    result = await get_inference_by_topic_id(mock_client, topic_id)

    mock_client.get_inference_by_topic_id.assert_called_once_with(topic_id)
    assert f"Error getting inference for topic {topic_id}: API Error" in result


def test_get_inference_by_topic_id_action() -> None:
    """Test get inference by topic ID action class."""
    action = GetInferenceByTopicIdAction(
        name="get_inference_by_topic_id",
        description=GET_INFERENCE_BY_TOPIC_ID_PROMPT,
        args_schema=GetInferenceByTopicIdInput,
        func=get_inference_by_topic_id,
    )

    assert action.name == "get_inference_by_topic_id"
    assert action.args_schema == GetInferenceByTopicIdInput
    assert action.func == get_inference_by_topic_id
    assert "network_inference field is the inference for the topic" in action.description
