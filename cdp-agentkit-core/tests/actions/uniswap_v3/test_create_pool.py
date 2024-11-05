from unittest.mock import patch

import pytest

from cdp_agentkit_core.actions.uniswap_v3.constants import UNISWAP_V3_FACTORY_ABI
from cdp_agentkit_core.actions.uniswap_v3.create_pool import (
    UniswapV3CreatePoolInput,
    uniswap_v3_create_pool,
)

MOCK_TOKEN_A = "0x4200000000000000000000000000000000000006"
MOCK_TOKEN_B = "0x1234567890123456789012345678901234567890"
MOCK_FEE = "3000"


def test_create_pool_input_model_valid():
    """Test that CreatePoolInput accepts valid parameters."""
    input_model = UniswapV3CreatePoolInput(
        token_a=MOCK_TOKEN_A,
        token_b=MOCK_TOKEN_B,
        fee=MOCK_FEE,
    )

    assert input_model.token_a == MOCK_TOKEN_A
    assert input_model.token_b == MOCK_TOKEN_B
    assert input_model.fee == MOCK_FEE


def test_create_pool_input_model_missing_params():
    """Test that CreatePoolInput raises error when params are missing."""
    with pytest.raises(ValueError):
        UniswapV3CreatePoolInput()


def test_create_pool_success(wallet_factory, contract_invocation_factory):
    """Test successful pool creation with valid parameters."""
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
        action_response = uniswap_v3_create_pool(mock_wallet, MOCK_TOKEN_A, MOCK_TOKEN_B, MOCK_FEE)

        expected_response = f"Created pool for {MOCK_TOKEN_A} and {MOCK_TOKEN_B} with fee {MOCK_FEE} on network {mock_wallet.network_id}.\nTransaction hash for the pool creation: {mock_contract_instance.transaction.transaction_hash}\nTransaction link for the pool creation: {mock_contract_instance.transaction.transaction_link}"
        assert action_response == expected_response

        mock_invoke.assert_called_once_with(
            contract_address="0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
            method="createPool",
            abi=UNISWAP_V3_FACTORY_ABI,
            args={
                "tokenA": MOCK_TOKEN_A,
                "tokenB": MOCK_TOKEN_B,
                "fee": MOCK_FEE,
            },
        )
        mock_contract_wait.assert_called_once_with()


def test_create_pool_api_error(wallet_factory):
    """Test create_pool when API error occurs."""
    mock_wallet = wallet_factory()

    with patch.object(
        mock_wallet, "invoke_contract", side_effect=Exception("API error")
    ) as mock_invoke:
        with pytest.raises(Exception, match="API error"):
            uniswap_v3_create_pool(mock_wallet, MOCK_TOKEN_A, MOCK_TOKEN_B, MOCK_FEE)

        mock_invoke.assert_called_once_with(
            contract_address="0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
            method="createPool",
            abi=UNISWAP_V3_FACTORY_ABI,
            args={
                "tokenA": MOCK_TOKEN_A,
                "tokenB": MOCK_TOKEN_B,
                "fee": MOCK_FEE,
            },
        )
