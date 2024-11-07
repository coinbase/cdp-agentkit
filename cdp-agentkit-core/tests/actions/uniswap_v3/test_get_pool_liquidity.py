from unittest.mock import patch

import pytest

from cdp_agentkit_core.actions.uniswap_v3.constants import UNISWAP_V3_POOL_ABI
from cdp_agentkit_core.actions.uniswap_v3.get_pool_liquidity import (
    UniswapV3GetPoolLiquidityInput,
    uniswap_v3_get_pool_liquidity,
)

MOCK_POOL_ADDRESS = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"
MOCK_NETWORK_ID = "base-sepolia"
MOCK_LIQUIDITY = "1000000000000000000"


def test_get_pool_liquidity_input_model_valid():
    """Test that GetPoolLiquidityInput accepts valid parameters."""
    input_model = UniswapV3GetPoolLiquidityInput(
        network_id=MOCK_NETWORK_ID,
        pool_contract_address=MOCK_POOL_ADDRESS,
    )

    assert input_model.network_id == MOCK_NETWORK_ID
    assert input_model.pool_contract_address == MOCK_POOL_ADDRESS


def test_get_pool_liquidity_input_model_missing_params():
    """Test that GetPoolLiquidityInput raises error when params are missing."""
    with pytest.raises(ValueError):
        UniswapV3GetPoolLiquidityInput()


def test_get_pool_liquidity_success():
    """Test successful liquidity retrieval with valid parameters."""
    with patch(
        "cdp_agentkit_core.actions.uniswap_v3.get_pool_liquidity.SmartContract.read",
        return_value=MOCK_LIQUIDITY,
    ) as mock_read:
        response = uniswap_v3_get_pool_liquidity(MOCK_NETWORK_ID, MOCK_POOL_ADDRESS)

        expected_response = f"Liquidity for pool {MOCK_POOL_ADDRESS} is {MOCK_LIQUIDITY}."
        assert response == expected_response

        mock_read.assert_called_once_with(
            network_id=MOCK_NETWORK_ID,
            contract_address=MOCK_POOL_ADDRESS,
            method="liquidity",
            abi=UNISWAP_V3_POOL_ABI,
            args={},
        )


def test_get_pool_liquidity_api_error():
    """Test get_pool_liquidity when API error occurs."""
    with patch(
        "cdp_agentkit_core.actions.uniswap_v3.get_pool_liquidity.SmartContract.read",
        side_effect=Exception("API error"),
    ) as mock_read:
        with pytest.raises(Exception, match="API error"):
            uniswap_v3_get_pool_liquidity(MOCK_NETWORK_ID, MOCK_POOL_ADDRESS)

        mock_read.assert_called_once_with(
            network_id=MOCK_NETWORK_ID,
            contract_address=MOCK_POOL_ADDRESS,
            method="liquidity",
            abi=UNISWAP_V3_POOL_ABI,
            args={},
        )
