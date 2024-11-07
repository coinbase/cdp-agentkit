from unittest.mock import patch

import pytest

from cdp_agentkit_core.actions.uniswap_v3.constants import UNISWAP_V3_POOL_ABI
from cdp_agentkit_core.actions.uniswap_v3.get_pool_slot0 import (
    UniswapV3GetPoolSlot0Input,
    uniswap_v3_get_pool_slot0,
)

MOCK_POOL_ADDRESS = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"
MOCK_NETWORK_ID = "base-sepolia"
MOCK_SLOT0_RESPONSE = (
    "1234567890",  # sqrtPriceX96
    "100",  # tick
    "1",  # observationIndex
    "50",  # observationCardinality
    "100",  # observationCardinalityNext
    "0",  # feeProtocol
    True,  # unlocked
)


def test_get_pool_slot0_input_model_valid():
    """Test that GetPoolSlot0Input accepts valid parameters."""
    input_model = UniswapV3GetPoolSlot0Input(
        network_id=MOCK_NETWORK_ID,
        pool_contract_address=MOCK_POOL_ADDRESS,
    )

    assert input_model.network_id == MOCK_NETWORK_ID
    assert input_model.pool_contract_address == MOCK_POOL_ADDRESS


def test_get_pool_slot0_input_model_missing_params():
    """Test that GetPoolSlot0Input raises error when params are missing."""
    with pytest.raises(ValueError):
        UniswapV3GetPoolSlot0Input()


def test_get_pool_slot0_success():
    """Test successful slot0 retrieval with valid parameters."""
    with patch(
        "cdp_agentkit_core.actions.uniswap_v3.get_pool_slot0.SmartContract.read",
        return_value=MOCK_SLOT0_RESPONSE,
    ) as mock_read:
        response = uniswap_v3_get_pool_slot0(MOCK_NETWORK_ID, MOCK_POOL_ADDRESS)

        expected_response = f"Slot0 for pool {MOCK_POOL_ADDRESS} is {MOCK_SLOT0_RESPONSE}."
        assert response == expected_response

        mock_read.assert_called_once_with(
            network_id=MOCK_NETWORK_ID,
            contract_address=MOCK_POOL_ADDRESS,
            method="slot0",
            abi=UNISWAP_V3_POOL_ABI,
            args={},
        )


def test_get_pool_slot0_api_error():
    """Test get_pool_slot0 when API error occurs."""
    with patch(
        "cdp_agentkit_core.actions.uniswap_v3.get_pool_slot0.SmartContract.read",
        side_effect=Exception("API error"),
    ) as mock_read:
        with pytest.raises(Exception, match="API error"):
            uniswap_v3_get_pool_slot0(MOCK_NETWORK_ID, MOCK_POOL_ADDRESS)

        mock_read.assert_called_once_with(
            network_id=MOCK_NETWORK_ID,
            contract_address=MOCK_POOL_ADDRESS,
            method="slot0",
            abi=UNISWAP_V3_POOL_ABI,
            args={},
        )
