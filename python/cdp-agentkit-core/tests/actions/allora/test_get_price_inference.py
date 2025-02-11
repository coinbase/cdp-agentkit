import json
from unittest.mock import AsyncMock, MagicMock

import pytest
from allora_sdk.v2.api_client import PriceInferenceToken

from cdp_agentkit_core.actions.allora.get_price_inference import (
    GET_PRICE_INFERENCE_PROMPT,
    GetPriceInferenceAction,
    GetPriceInferenceInput,
    get_price_inference,
)


def test_get_price_inference_input_schema() -> None:
    """Test get price inference input schema."""
    # Test valid inputs
    valid_inputs = [
        # Hour-based timeframes
        {"asset": PriceInferenceToken.BTC, "timeframe": "8h"},
        {"asset": PriceInferenceToken.ETH, "timeframe": "24h"},
        # Minute-based timeframes
        {"asset": PriceInferenceToken.BTC, "timeframe": "5m"},
        {"asset": PriceInferenceToken.ETH, "timeframe": "15m"},
    ]
    for input_data in valid_inputs:
        parsed_input = GetPriceInferenceInput(**input_data)
        assert parsed_input.asset == input_data["asset"]
        assert parsed_input.timeframe == input_data["timeframe"]

    # Test invalid timeframe formats
    invalid_timeframes = [
        # Invalid formats
        "8",  # Missing unit
        "8H",  # Wrong case
        "8hr",  # Wrong suffix
        "h8",  # Wrong order
        "eight_hours",  # Not numeric
        "-8h",  # Negative number
        # Invalid ranges for minutes
        "0m",  # Too small
        "61m",  # Too large
        # Invalid ranges for hours
        "0h",  # Too small
        "25h",  # Too large
    ]
    for timeframe in invalid_timeframes:
        with pytest.raises(ValueError) as exc_info:
            GetPriceInferenceInput(asset=PriceInferenceToken.BTC, timeframe=timeframe)
        error_msg = str(exc_info.value)
        assert any(
            [
                "Timeframe must be in format" in error_msg,
                "Minutes must be between 1 and 60" in error_msg,
                "Hours must be between 1 and 24" in error_msg,
            ]
        ), f"Unexpected error message for timeframe {timeframe}: {error_msg}"

    # Test missing required fields
    with pytest.raises(ValueError, match="2 validation errors"):
        GetPriceInferenceInput()

    with pytest.raises(ValueError, match="1 validation error"):
        GetPriceInferenceInput(asset=PriceInferenceToken.BTC)

    with pytest.raises(ValueError, match="1 validation error"):
        GetPriceInferenceInput(timeframe="8h")


@pytest.mark.asyncio
async def test_get_price_inference_success() -> None:
    """Test get price inference success case."""
    test_cases = [
        # Hour-based case
        {
            "asset": PriceInferenceToken.BTC,
            "timeframe": "8h",
            "price": "50000.00",
            "timestamp": 1718198400,
        },
        # Minute-based case
        {
            "asset": PriceInferenceToken.ETH,
            "timeframe": "5m",
            "price": "3000.00",
            "timestamp": 1718198400,
        },
    ]

    for case in test_cases:
        mock_client = AsyncMock()
        mock_inference_data = MagicMock()
        mock_inference_data.inference_data.network_inference_normalized = case["price"]
        mock_inference_data.inference_data.timestamp = case["timestamp"]
        mock_client.get_price_inference.return_value = mock_inference_data

        expected_response = {
            "price": case["price"],
            "timestamp": case["timestamp"],
            "asset": case["asset"],
            "timeframe": case["timeframe"],
        }

        result = await get_price_inference(mock_client, case["asset"], case["timeframe"])

        mock_client.get_price_inference.assert_called_once_with(case["asset"], case["timeframe"])
        assert f"The price inference for {case['asset']} ({case['timeframe']}) is:" in result
        assert json.dumps(expected_response, indent=2) in result


@pytest.mark.asyncio
async def test_get_price_inference_error() -> None:
    """Test get price inference error case."""
    test_cases = [
        (PriceInferenceToken.BTC, "8h"),  # Hour-based case
        (PriceInferenceToken.ETH, "5m"),  # Minute-based case
    ]

    for asset, timeframe in test_cases:
        mock_client = AsyncMock()
        mock_client.get_price_inference.side_effect = Exception("API Error")

        result = await get_price_inference(mock_client, asset, timeframe)

        mock_client.get_price_inference.assert_called_once_with(asset, timeframe)
        assert f"Error getting price inference for {asset} ({timeframe}): API Error" in result


def test_get_price_inference_action() -> None:
    """Test get price inference action class."""
    action = GetPriceInferenceAction(
        name="get_price_inference",
        description=GET_PRICE_INFERENCE_PROMPT,
        args_schema=GetPriceInferenceInput,
        func=get_price_inference,
    )

    assert action.name == "get_price_inference"
    assert action.args_schema == GetPriceInferenceInput
    assert action.func == get_price_inference
    assert "Minutes: a number followed by 'm'" in action.description
    assert "Hours: a number followed by 'h'" in action.description
