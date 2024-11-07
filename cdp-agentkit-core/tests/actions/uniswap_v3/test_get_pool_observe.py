from unittest.mock import patch

import pytest

from cdp_agentkit_core.actions.uniswap_v3.constants import UNISWAP_V3_POOL_ABI
from cdp_agentkit_core.actions.uniswap_v3.get_pool_observe import (
    UniswapV3GetPoolObserveInput,
    uniswap_v3_get_pool_observe,
)

MOCK_POOL_ADDRESS = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"
MOCK_NETWORK_ID = "base-sepolia"
MOCK_SECONDS_AGO = ["60", "120"]
MOCK_OBSERVATIONS = (
    ["1000000", "2000000"],  # tickCumulatives
    ["500000", "1000000"],  # secondsPerLiquidityCumulativeX128s
)


def test_get_pool_observe_input_model_valid():
    """Test that GetPoolObserveInput accepts valid parameters."""
    input_model = UniswapV3GetPoolObserveInput(
        network_id=MOCK_NETWORK_ID,
        pool_contract_address=MOCK_POOL_ADDRESS,
        seconds_ago=MOCK_SECONDS_AGO,
    )

    assert input_model.network_id == MOCK_NETWORK_ID
    assert input_model.pool_contract_address == MOCK_POOL_ADDRESS
    assert input_model.seconds_ago == MOCK_SECONDS_AGO


def test_get_pool_observe_input_model_missing_params():
    """Test that GetPoolObserveInput raises error when params are missing."""
    with pytest.raises(ValueError):
        UniswapV3GetPoolObserveInput()


def test_get_pool_observe_success():
    """Test successful observation retrieval with valid parameters."""
    with patch(
        "cdp_agentkit_core.actions.uniswap_v3.get_pool_observe.SmartContract.read",
        return_value=MOCK_OBSERVATIONS,
    ) as mock_read:
        response = uniswap_v3_get_pool_observe(MOCK_NETWORK_ID, MOCK_POOL_ADDRESS, MOCK_SECONDS_AGO)

        expected_response = f"Observations for pool {MOCK_POOL_ADDRESS} are {MOCK_OBSERVATIONS}."
        assert response == expected_response

        mock_read.assert_called_once_with(
            network_id=MOCK_NETWORK_ID,
            contract_address=MOCK_POOL_ADDRESS,
            method="observe",
            abi=UNISWAP_V3_POOL_ABI,
            args={"secondsAgos": MOCK_SECONDS_AGO},
        )


def test_get_pool_observe_api_error():
    """Test get_pool_observe when API error occurs."""
    with patch(
        "cdp_agentkit_core.actions.uniswap_v3.get_pool_observe.SmartContract.read",
        side_effect=Exception("API error"),
    ) as mock_read:
        with pytest.raises(Exception, match="API error"):
            uniswap_v3_get_pool_observe(MOCK_NETWORK_ID, MOCK_POOL_ADDRESS, MOCK_SECONDS_AGO)

        mock_read.assert_called_once_with(
            network_id=MOCK_NETWORK_ID,
            contract_address=MOCK_POOL_ADDRESS,
            method="observe",
            abi=UNISWAP_V3_POOL_ABI,
            args={"secondsAgos": MOCK_SECONDS_AGO},
        )
