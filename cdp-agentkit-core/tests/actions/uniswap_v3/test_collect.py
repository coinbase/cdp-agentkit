from unittest.mock import patch

import pytest

from cdp_agentkit_core.actions.uniswap_v3.collect import (
    UniswapV3CollectInput,
    uniswap_v3_collect,
)
from cdp_agentkit_core.actions.uniswap_v3.constants import UNISWAP_V3_POOL_ABI

MOCK_POOL_ADDRESS = "0x4200000000000000000000000000000000000006"
MOCK_RECIPIENT_ADDRESS = "0x1234567890123456789012345678901234567890"
MOCK_TICK_LOWER = "100"
MOCK_TICK_UPPER = "200"
MOCK_AMOUNT0_REQUESTED = "1000"
MOCK_AMOUNT1_REQUESTED = "2000"


def test_collect_input_model_valid():
    """Test that CollectInput accepts valid parameters."""
    input_model = UniswapV3CollectInput(
        pool_address=MOCK_POOL_ADDRESS,
        recipient_address=MOCK_RECIPIENT_ADDRESS,
        tick_lower=MOCK_TICK_LOWER,
        tick_upper=MOCK_TICK_UPPER,
        amount0_requested=MOCK_AMOUNT0_REQUESTED,
        amount1_requested=MOCK_AMOUNT1_REQUESTED,
    )

    assert input_model.pool_address == MOCK_POOL_ADDRESS
    assert input_model.recipient_address == MOCK_RECIPIENT_ADDRESS
    assert input_model.tick_lower == MOCK_TICK_LOWER
    assert input_model.tick_upper == MOCK_TICK_UPPER
    assert input_model.amount0_requested == MOCK_AMOUNT0_REQUESTED
    assert input_model.amount1_requested == MOCK_AMOUNT1_REQUESTED


def test_collect_input_model_missing_params():
    """Test that CollectInput raises error when params are missing."""
    with pytest.raises(ValueError):
        UniswapV3CollectInput()


def test_collect_success(wallet_factory, contract_invocation_factory):
    """Test successful token collection with valid parameters."""
    mock_wallet = wallet_factory()
    mock_contract_instance = contract_invocation_factory()

    with (
        patch.object(
            mock_wallet, "invoke_contract", return_value=mock_contract_instance
        ) as mock_invoke,
        patch.object(
            mock_contract_instance, "wait", return_value=mock_contract_instance
        ) as mock_contract_wait,
    ):
        action_response = uniswap_v3_collect(
            mock_wallet,
            MOCK_POOL_ADDRESS,
            MOCK_RECIPIENT_ADDRESS,
            MOCK_TICK_LOWER,
            MOCK_TICK_UPPER,
            MOCK_AMOUNT0_REQUESTED,
            MOCK_AMOUNT1_REQUESTED,
        )

        expected_response = f"Requested collection of {MOCK_AMOUNT0_REQUESTED} of token0 and {MOCK_AMOUNT1_REQUESTED} of token1 from pool {MOCK_POOL_ADDRESS}.\nTransaction hash for the collection: {mock_contract_instance.transaction.transaction_hash}\nTransaction link for the collection: {mock_contract_instance.transaction.transaction_link}"
        assert action_response == expected_response

        mock_invoke.assert_called_once_with(
            contract_address=MOCK_POOL_ADDRESS,
            method="collect",
            abi=UNISWAP_V3_POOL_ABI,
            args={
                "recipient": MOCK_RECIPIENT_ADDRESS,
                "tickLower": MOCK_TICK_LOWER,
                "tickUpper": MOCK_TICK_UPPER,
                "amount0Requested": MOCK_AMOUNT0_REQUESTED,
                "amount1Requested": MOCK_AMOUNT1_REQUESTED,
            },
        )
        mock_contract_wait.assert_called_once_with()


def test_collect_api_error(wallet_factory):
    """Test collect when API error occurs."""
    mock_wallet = wallet_factory()

    with patch.object(
        mock_wallet, "invoke_contract", side_effect=Exception("API error")
    ) as mock_invoke:
        with pytest.raises(Exception, match="API error"):
            uniswap_v3_collect(
                mock_wallet,
                MOCK_POOL_ADDRESS,
                MOCK_RECIPIENT_ADDRESS,
                MOCK_TICK_LOWER,
                MOCK_TICK_UPPER,
                MOCK_AMOUNT0_REQUESTED,
                MOCK_AMOUNT1_REQUESTED,
            )

        mock_invoke.assert_called_once_with(
            contract_address=MOCK_POOL_ADDRESS,
            method="collect",
            abi=UNISWAP_V3_POOL_ABI,
            args={
                "recipient": MOCK_RECIPIENT_ADDRESS,
                "tickLower": MOCK_TICK_LOWER,
                "tickUpper": MOCK_TICK_UPPER,
                "amount0Requested": MOCK_AMOUNT0_REQUESTED,
                "amount1Requested": MOCK_AMOUNT1_REQUESTED,
            },
        )
