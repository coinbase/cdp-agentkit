import json
import re
from collections.abc import Callable

from allora_sdk.v2.api_client import AlloraAPIClient, PriceInferenceToken
from pydantic import BaseModel, Field, field_validator

from cdp_agentkit_core.actions.allora.action import AlloraAction

GET_PRICE_INFERENCE_PROMPT = """
This tool will get price inference for a specific token and timeframe from Allora Network.
It requires an asset symbol (e.g., 'BTC', 'ETH') and a timeframe (e.g., '5m', '8h') as input.

The asset must be one of the supported tokens. For example:
- BTC for Bitcoin
- ETH for Ethereum
- SOL for Solana

The timeframe must be in one of these formats:
- Minutes: a number followed by 'm' (e.g., '5m', '15m', '30m')
- Hours: a number followed by 'h' (e.g., '8h', '24h')

Examples of valid timeframes:
- '5m' for 5 minutes prediction
- '15m' for 15 minutes prediction
- '8h' for 8 hours prediction
- '24h' for 24 hours prediction

A successful response will return a message with the price inference data in JSON format. Example:
    {
        "price": "50000.00",
        "timestamp": 1718198400,
        "asset": "BTC",
        "timeframe": "8h"
    }

A failure response will return an error message with details about what went wrong,
such as invalid token, invalid timeframe format, or API errors.
"""


class GetPriceInferenceInput(BaseModel):
    """Input argument schema for get price inference action."""

    asset: str = Field(
        ...,
        description="The token to get price inference for. Must be a supported token (e.g., BTC, ETH, SOL)",
    )
    timeframe: str = Field(
        ...,
        description="The timeframe for the prediction. Must be in format 'Nm' for minutes or 'Nh' for hours (e.g., '5m', '15m', '8h', '24h')",
    )

    @field_validator("timeframe")
    @classmethod
    def validate_timeframe(cls, v: str) -> str:
        """Validate timeframe format."""
        if not re.match(r"^\d+[mh]$", v):
            raise ValueError(
                "Timeframe must be in format 'Nm' for minutes or 'Nh' for hours (e.g., '5m', '15m', '8h', '24h')"
            )

        # Extract number and unit
        number = int(v[:-1])
        unit = v[-1]

        # Additional validation for reasonable ranges
        if unit == "m" and (number < 1 or number > 60):
            raise ValueError("Minutes must be between 1 and 60")
        if unit == "h" and (number < 1 or number > 24):
            raise ValueError("Hours must be between 1 and 24")

        return v


async def get_price_inference(
    client: AlloraAPIClient, asset: PriceInferenceToken, timeframe: str
) -> str:
    """Get price inference for a specific token and timeframe from Allora Network.

    Args:
        client (AlloraAPIClient): The Allora API client.
        asset (PriceInferenceToken): The token to get price inference for (e.g., BTC, ETH)
        timeframe (str): The timeframe for the prediction. Can be minutes (e.g., '5m', '15m') or hours (e.g., '8h', '24h')

    Returns:
        str: A message containing the price inference data in JSON format, including:
            - price: The normalized price inference
            - timestamp: Unix timestamp of the inference
            - asset: The token symbol
            - timeframe: The prediction timeframe

    Raises:
        Exception: If there's an error getting the inference from the API

    """
    try:
        inference = await client.get_price_inference(asset, timeframe)
        response = {
            "price": inference.inference_data.network_inference_normalized,
            "timestamp": inference.inference_data.timestamp,
            "asset": asset,
            "timeframe": timeframe,
        }
        response_json = json.dumps(response, indent=2)
        return f"The price inference for {asset} ({timeframe}) is:\n{response_json}"
    except Exception as e:
        return f"Error getting price inference for {asset} ({timeframe}): {e}"


class GetPriceInferenceAction(AlloraAction):
    """Get price inference action."""

    name: str = "get_price_inference"
    description: str = GET_PRICE_INFERENCE_PROMPT
    args_schema: type[BaseModel] | None = GetPriceInferenceInput
    func: Callable[..., str] = get_price_inference
