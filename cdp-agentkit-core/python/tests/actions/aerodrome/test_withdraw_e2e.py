import json
import os
import time
from decimal import Decimal

import pytest
from cdp import Asset, Cdp, Wallet, WalletData
from eth_utils import to_checksum_address

from cdp_agentkit_core.actions.aerodrome.constants import AERODROME_ROUTER_ADDRESS
from cdp_agentkit_core.actions.aerodrome.utils import (
    get_lp_token_address,
    get_token_balance,
    get_reserves,
    get_total_supply
)
from cdp_agentkit_core.actions.aerodrome.withdraw import remove_liquidity

# Test constants
NETWORK = "base-mainnet"
WETH = to_checksum_address("0x4200000000000000000000000000000000000006")
USDC = to_checksum_address("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")
STABLE_PAIR = True
DEADLINE = str(int(time.time()) + 1200)  # 20 minutes from now

@pytest.fixture
def wallet():
    """Load base-mainnet wallet for testing."""
    Cdp.configure(
        api_key_name=os.getenv("CDP_API_KEY_NAME"),
        private_key=os.getenv("CDP_API_KEY_PRIVATE_KEY").replace("\\n", "\n"),
        source="cdp-langchain",
        source_version="0.0.13",
    )

    wallet_data = WalletData.from_dict(json.loads(os.getenv("WALLET_DATA")))
    wallet = Wallet.import_data(wallet_data)
    return wallet

@pytest.mark.e2e
def test_remove_liquidity_e2e(wallet):
    """Test removing liquidity from Aerodrome pool end-to-end."""
    print("\nStarting remove liquidity test...")

    # Get LP token address
    lp_token_address = get_lp_token_address(wallet, WETH, USDC, STABLE_PAIR)
    print(f"\nLP token address: {lp_token_address}")

    # Get initial balances
    initial_weth_balance = get_token_balance(wallet, WETH, wallet.default_address.address_id)
    initial_usdc_balance = get_token_balance(wallet, USDC, wallet.default_address.address_id)
    initial_lp_balance = get_token_balance(wallet, lp_token_address, wallet.default_address.address_id)

    print(f"\nInitial balances:")
    print(f"WETH: {initial_weth_balance}")
    print(f"USDC: {initial_usdc_balance}")
    print(f"LP tokens: {initial_lp_balance}")

    if initial_lp_balance == 0:
        pytest.skip("No LP tokens available for testing")

    # Get current reserves and calculate expected amounts
    reserve_a, reserve_b = get_reserves(wallet, WETH, USDC, STABLE_PAIR, AERODROME_ROUTER_ADDRESS)
    total_supply = get_total_supply(wallet, lp_token_address)

    print(f"\nPool state:")
    print(f"Reserve A: {reserve_a}")
    print(f"Reserve B: {reserve_b}")
    print(f"Total Supply: {total_supply}")

    if total_supply == 0:
        pytest.skip("Pool has no liquidity (total supply is 0)")

    # Try to remove 10% of current LP balance
    lp_token_asset = Asset.fetch(wallet.network_id, lp_token_address)
    withdraw_amount = Decimal(initial_lp_balance) / Decimal(10)
    human_withdraw = str(withdraw_amount / Decimal(10 ** lp_token_asset.decimals))

    # Calculate expected amounts based on reserves
    atomic_liquidity = int(withdraw_amount)
    expected_a = (atomic_liquidity * reserve_a) // total_supply
    expected_b = (atomic_liquidity * reserve_b) // total_supply

    # Set minimum amounts to 99% of expected (1% slippage)
    slippage = Decimal("0.99")  # 1% slippage tolerance
    min_amount_a = str(int(expected_a * slippage))
    min_amount_b = str(int(expected_b * slippage))

    print(f"\nWithdraw parameters:")
    print(f"LP amount: {human_withdraw}")
    print(f"Expected amount A: {expected_a}")
    print(f"Expected amount B: {expected_b}")
    print(f"Min amount A (1% slippage): {min_amount_a}")
    print(f"Min amount B (1% slippage): {min_amount_b}")

    # Execute remove liquidity with 1% slippage protection
    result = remove_liquidity(
        wallet=wallet,
        token_a=WETH,
        token_b=USDC,
        stable=STABLE_PAIR,
        liquidity=human_withdraw,
        amount_a_min=min_amount_a,
        amount_b_min=min_amount_b,
        to=wallet.default_address.address_id,
        deadline=DEADLINE,
    )

    print(f"\nRemove liquidity result: {result}")

    # Verify the transaction was successful
    assert "Successfully removed liquidity" in result, f"Transaction failed: {result}"

    # Wait for transaction to be mined
    time.sleep(5)

    # Get final balances
    final_weth_balance = get_token_balance(wallet, WETH, wallet.default_address.address_id)
    final_usdc_balance = get_token_balance(wallet, USDC, wallet.default_address.address_id)
    final_lp_balance = get_token_balance(wallet, lp_token_address, wallet.default_address.address_id)

    print(f"\nFinal balances:")
    print(f"WETH: {final_weth_balance}")
    print(f"USDC: {final_usdc_balance}")
    print(f"LP tokens: {final_lp_balance}")

    # Verify balances changed correctly
    assert final_weth_balance > initial_weth_balance, "WETH balance did not increase"
    assert final_usdc_balance > initial_usdc_balance, "USDC balance did not increase"
    assert final_lp_balance < initial_lp_balance, "LP token balance did not decrease"

    # Verify LP token decrease matches input (within 1% tolerance)
    lp_decrease = initial_lp_balance - final_lp_balance
    expected_lp_decrease = int(withdraw_amount)
    tolerance = Decimal("0.01")  # 1%
    assert abs(Decimal(lp_decrease) - expected_lp_decrease) <= expected_lp_decrease * tolerance, \
        f"Unexpected LP token decrease. Expected ~{expected_lp_decrease}, got {lp_decrease}"

#  @pytest.mark.e2e
#  def test_remove_liquidity_invalid_amounts(wallet):
#      """Test remove liquidity with invalid amounts."""
#      result = remove_liquidity(
#          wallet=wallet,
#          token_a=WETH,
#          token_b=USDC,
#          stable=STABLE_PAIR,
#          liquidity="0",
#          amount_a_min="0",
#          amount_b_min="0",
#          to=wallet.default_address.address_id,
#          deadline=DEADLINE,
#      )

#      assert result.startswith("Error"), "Expected error for zero amounts"


#  @pytest.mark.e2e
#  def test_remove_liquidity_expired_deadline(wallet):
#      """Test remove liquidity with expired deadline."""
#      expired_deadline = str(int(time.time()) - 3600)  # 1 hour ago

#      result = remove_liquidity(
#          wallet=wallet,
#          token_a=WETH,
#          token_b=USDC,
#          stable=STABLE_PAIR,
#          liquidity=LIQUIDITY,
#          amount_a_min=AMOUNT_A_MIN,
#          amount_b_min=AMOUNT_B_MIN,
#          to=wallet.default_address.address_id,
#          deadline=expired_deadline,
#      )

#      assert result.startswith("Error"), "Expected error for expired deadline"


if __name__ == "__main__":
    wallet = wallet()
    test_remove_liquidity_e2e(wallet)
    # test_remove_liquidity_invalid_amounts(wallet)
    # test_remove_liquidity_expired_deadline(wallet)
