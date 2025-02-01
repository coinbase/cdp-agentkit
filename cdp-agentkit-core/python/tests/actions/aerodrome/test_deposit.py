from decimal import Decimal
from unittest.mock import patch

import pytest
from eth_utils import to_checksum_address

from cdp_agentkit_core.actions.aerodrome.constants import AERODROME_ROUTER_ABI, AERODROME_ROUTER_ADDRESS
from cdp_agentkit_core.actions.aerodrome.deposit import (
    AerodromeAddLiquidityInput,
    add_liquidity_to_aerodrome,
)

# Test constants
MOCK_WETH = to_checksum_address("0x4200000000000000000000000000000000000006")
MOCK_USDC = to_checksum_address("0x036CbD53842c5426634e7929541eC2318f3dCF7e")
MOCK_NETWORK_ID = "base-sepolia"
MOCK_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890"
MOCK_AMOUNT_A = "0.001"  # WETH amount
MOCK_AMOUNT_B = "1"      # USDC amount
MOCK_AMOUNT_A_MIN = "0.00099"  # With 1% slippage
MOCK_AMOUNT_B_MIN = "0.99"     # With 1% slippage
MOCK_DEADLINE = "1735689600"   # Future timestamp
MOCK_WETH_DECIMALS = 18
MOCK_USDC_DECIMALS = 6

def test_add_liquidity_input_model_valid():
    """Test that AerodromeAddLiquidityInput accepts valid parameters."""
    input_model = AerodromeAddLiquidityInput(
        token_a=MOCK_WETH,
        token_b=MOCK_USDC,
        stable=True,
        amount_a_desired=MOCK_AMOUNT_A,
        amount_b_desired=MOCK_AMOUNT_B,
        amount_a_min=MOCK_AMOUNT_A_MIN,
        amount_b_min=MOCK_AMOUNT_B_MIN,
        to=MOCK_WALLET_ADDRESS,
        deadline=MOCK_DEADLINE,
    )

    assert input_model.token_a == MOCK_WETH
    assert input_model.token_b == MOCK_USDC
    assert input_model.stable is True
    assert input_model.amount_a_desired == MOCK_AMOUNT_A
    assert input_model.amount_b_desired == MOCK_AMOUNT_B
    assert input_model.amount_a_min == MOCK_AMOUNT_A_MIN
    assert input_model.amount_b_min == MOCK_AMOUNT_B_MIN
    assert input_model.to == MOCK_WALLET_ADDRESS
    assert input_model.deadline == MOCK_DEADLINE


def test_add_liquidity_input_model_missing_params():
    """Test that AerodromeAddLiquidityInput raises error when params are missing."""
    with pytest.raises(ValueError):
        AerodromeAddLiquidityInput()


def test_add_liquidity_success(wallet_factory, contract_invocation_factory, asset_factory):
    """Test successful liquidity addition with valid parameters."""
    mock_wallet = wallet_factory()
    mock_contract_instance = contract_invocation_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    
    # Create mock assets for both tokens
    mock_asset_a = asset_factory(decimals=MOCK_WETH_DECIMALS)
    mock_asset_b = asset_factory(decimals=MOCK_USDC_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.aerodrome.deposit.approve",
            return_value="Approval successful"
        ) as mock_approve,
        patch(
            "cdp_agentkit_core.actions.aerodrome.deposit.Asset.fetch",
            side_effect=[mock_asset_a, mock_asset_b]
        ) as mock_get_asset,
        patch.object(
            mock_asset_a,
            "to_atomic_amount",
            side_effect=["1000000000000000", "990000000000000"]  # Desired and min amounts for token A
        ) as mock_to_atomic_amount_a,
        patch.object(
            mock_asset_b,
            "to_atomic_amount",
            side_effect=["1000000", "990000"]  # Desired and min amounts for token B
        ) as mock_to_atomic_amount_b,
        patch.object(
            mock_wallet,
            "invoke_contract",
            return_value=mock_contract_instance
        ) as mock_invoke,
        patch.object(
            mock_contract_instance,
            "wait",
            return_value=mock_contract_instance
        ) as mock_contract_wait,
    ):
        action_response = add_liquidity_to_aerodrome(
            mock_wallet,
            MOCK_WETH,
            MOCK_USDC,
            True,  # stable pair
            MOCK_AMOUNT_A,
            MOCK_AMOUNT_B,
            MOCK_AMOUNT_A_MIN,
            MOCK_AMOUNT_B_MIN,
            MOCK_WALLET_ADDRESS,
            MOCK_DEADLINE,
        )

        expected_response = f"Added liquidity to Aerodrome pool with transaction hash: {mock_contract_instance.transaction_hash} and transaction link: {mock_contract_instance.transaction_link}"
        assert action_response == expected_response

        # Verify approvals were called for both tokens
        assert mock_approve.call_count == 2
        mock_approve.assert_any_call(
            mock_wallet, MOCK_WETH, AERODROME_ROUTER_ADDRESS, "1000000000000000"
        )
        mock_approve.assert_any_call(
            mock_wallet, MOCK_USDC, AERODROME_ROUTER_ADDRESS, "1000000"
        )

        # Verify asset fetching
        assert mock_get_asset.call_count == 2
        mock_get_asset.assert_any_call(MOCK_NETWORK_ID, MOCK_WETH)
        mock_get_asset.assert_any_call(MOCK_NETWORK_ID, MOCK_USDC)

        # Verify amount conversions
        assert mock_to_atomic_amount_a.call_count == 2
        assert mock_to_atomic_amount_b.call_count == 2

        # Verify contract invocation
        mock_invoke.assert_called_once()
        mock_contract_wait.assert_called_once()


def test_add_liquidity_api_error(wallet_factory, asset_factory):
    """Test liquidity addition when API error occurs."""
    mock_wallet = wallet_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    mock_asset_a = asset_factory(decimals=MOCK_WETH_DECIMALS)
    mock_asset_b = asset_factory(decimals=MOCK_USDC_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.aerodrome.deposit.approve",
            return_value="Approval successful"
        ),
        patch(
            "cdp_agentkit_core.actions.aerodrome.deposit.Asset.fetch",
            side_effect=[mock_asset_a, mock_asset_b]
        ),
        patch.object(
            mock_asset_a,
            "to_atomic_amount",
            side_effect=["1000000000000000", "990000000000000"]
        ),
        patch.object(
            mock_asset_b,
            "to_atomic_amount",
            side_effect=["1000000", "990000"]
        ),
        patch.object(
            mock_wallet,
            "invoke_contract",
            side_effect=Exception("API error")
        ),
    ):
        action_response = add_liquidity_to_aerodrome(
            mock_wallet,
            MOCK_WETH,
            MOCK_USDC,
            True,
            MOCK_AMOUNT_A,
            MOCK_AMOUNT_B,
            MOCK_AMOUNT_A_MIN,
            MOCK_AMOUNT_B_MIN,
            MOCK_WALLET_ADDRESS,
            MOCK_DEADLINE,
        )

        expected_response = "Error adding liquidity to Aerodrome: API error"
        assert action_response == expected_response


def test_add_liquidity_approval_failure(wallet_factory, asset_factory):
    """Test liquidity addition when approval fails."""
    mock_wallet = wallet_factory()
    mock_wallet.default_address.address_id = MOCK_WALLET_ADDRESS
    mock_wallet.network_id = MOCK_NETWORK_ID
    mock_asset_a = asset_factory(decimals=MOCK_WETH_DECIMALS)
    mock_asset_b = asset_factory(decimals=MOCK_USDC_DECIMALS)

    with (
        patch(
            "cdp_agentkit_core.actions.aerodrome.deposit.approve",
            return_value="Error: Approval failed"
        ) as mock_approve,
        patch(
            "cdp_agentkit_core.actions.aerodrome.deposit.Asset.fetch",
            side_effect=[mock_asset_a, mock_asset_b]
        ) as mock_get_asset,
        patch.object(
            mock_asset_a,
            "to_atomic_amount",
            return_value="1000000000000000"
        ),
    ):
        action_response = add_liquidity_to_aerodrome(
            mock_wallet,
            MOCK_WETH,
            MOCK_USDC,
            True,
            MOCK_AMOUNT_A,
            MOCK_AMOUNT_B,
            MOCK_AMOUNT_A_MIN,
            MOCK_AMOUNT_B_MIN,
            MOCK_WALLET_ADDRESS,
            MOCK_DEADLINE,
        )

        expected_response = "Error approving token A: Error: Approval failed"
        assert action_response == expected_response

        mock_approve.assert_called_once()
        mock_get_asset.assert_called_once()