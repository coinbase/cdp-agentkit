"""Tests for the CDP Action tool."""

from typing import Any
from unittest.mock import Mock, patch

import pytest
from langchain_core.callbacks import CallbackManager
from pydantic import BaseModel

from cdp_langchain.tools import CdpAction
from cdp_langchain.utils import CdpAgentkitWrapper


class TestArgsSchema(BaseModel):
    """Test schema for validating input arguments."""

    test_param: str


@pytest.fixture
def mock_cdp_agentkit_wrapper():
    """Fixture for mocked CDP Agentkit wrapper."""
    with patch("langchain_cdp.tools.cdp_action.CdpAgentkitWrapper") as mock:
        cdp_agentkit_wrapper = Mock(spec=CdpAgentkitWrapper)
        mock.return_value = cdp_agentkit_wrapper
        yield cdp_agentkit_wrapper


@pytest.fixture
def cdp_action(mock_cdp_agentkit_wrapper):
    """Fixture for CDP Action tool."""
    return CdpAction(
        cdp_agentkit_wrapper=mock_cdp_agentkit_wrapper,
        mode="test_action",
        name="test_action",
        description="Test CDP Action",
    )


@pytest.fixture
def cdp_action_with_schema(mock_cdp_agentkit_wrapper):
    """Fixture for CDP Action tool with args schema."""
    return CdpAction(
        cdp_agentkit_wrapper=mock_cdp_agentkit_wrapper,
        mode="test_action_with_schema",
        name="test_action_with_schema",
        description="Test CDP Action",
        args_schema=TestArgsSchema,
    )


def test_initialization(mock_cdp_agentkit_wrapper):
    """Test basic initialization of CDP Action."""
    action = CdpAction(
        cdp_agentkit_wrapper=mock_cdp_agentkit_wrapper,
        mode="test_action",
    )
    assert action.mode == "test_action"


def test_run_with_instructions(cdp_action):
    """Test running CDP Action with instructions."""
    cdp_action.cdp_agentkit_wrapper.run.return_value = "success"
    result = cdp_action._run(instructions="test instructions")

    cdp_action.cdp_agentkit_wrapper.run.assert_called_once_with(
        "test_action", instructions="test instructions"
    )
    assert result == "success"


def test_run_with_empty_instructions(cdp_action):
    """Test running CDP Action with empty instructions."""
    cdp_action.cdp_agentkit_wrapper.run.return_value = "success"

    # Test various empty input scenarios
    empty_inputs = ["", "{}", None]
    for empty_input in empty_inputs:
        result = cdp_action._run(instructions=empty_input)
        cdp_action.cdp_agentkit_wrapper.run.assert_called_with("test_action", instructions="")
        assert result == "success"


def test_run_with_schema(cdp_action_with_schema):
    """Test running CDP Action with args schema."""
    cdp_action_with_schema.cdp_agentkit_wrapper.run.return_value = "success"

    result = cdp_action_with_schema._run(test_param="test")

    cdp_action_with_schema.cdp_agentkit_wrapper.run.assert_called_once_with(
        "test_action_with_schema", test_param="test"
    )
    assert result == "success"


def test_run_with_callback_manager(cdp_action):
    """Test running CDP Action with callback manager."""
    cdp_action.cdp_agentkit_wrapper.run.return_value = "success"
    callback_manager = CallbackManager([])

    result = cdp_action._run(instructions="test", run_manager=callback_manager)

    cdp_action.cdp_agentkit_wrapper.run.assert_called_once_with("test_action", instructions="test")
    assert result == "success"


def test_run_with_invalid_schema_data(cdp_action_with_schema):
    """Test running CDP Action with invalid schema data."""
    with pytest.raises(ValueError):
        cdp_action_with_schema._run(invalid_param="test")


@pytest.mark.parametrize(
    "input_data",
    [
        {"test_param": "test"},
        {"test_param": "another_test"},
    ],
)
def test_run_with_different_valid_inputs(cdp_action_with_schema, input_data: dict[str, Any]):
    """Test running CDP Action with different valid inputs."""
    cdp_action_with_schema.cdp_agentkit_wrapper.run.return_value = "success"

    result = cdp_action_with_schema._run(**input_data)

    cdp_action_with_schema.cdp_agentkit_wrapper.run.assert_called_once_with(
        "test_action_with_schema", **input_data
    )
    assert result == "success"
