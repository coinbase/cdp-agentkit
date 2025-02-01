import json
import os
import time
from decimal import Decimal

import pytest
from cdp import Cdp, Wallet, WalletData
from eth_utils import to_checksum_address

from cdp_agentkit_core.actions.aerodrome.deposit import deposit

# Test constants
NETWORK = "base-mainnet"
WETH = to_checksum_address("0x4200000000000000000000000000000000000006")
USDC = to_checksum_address("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")
#  USDC_TESTNET = to_checksum_address("0x036CbD53842c5426634e7929541eC2318f3dCF7e")
#  WETH = "0x4200000000000000000000000000000000000006"
#  USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
STABLE_PAIR = True
AMOUNT_A = "0.000001"  # ETH amount
AMOUNT_B = "0.009303"    # USDC amount
SLIPPAGE = 0.01      # 1% slippage


@pytest.fixture
def wallet():
    """Load base-mainnet wallet for testing."""
    Cdp.configure(
        api_key_name=os.getenv("CDP_API_KEY_NAME"),
        private_key=os.getenv("CDP_API_KEY_PRIVATE_KEY").replace("\\n", "\n"),
        source="cdp-langchain",
        source_version="0.0.13",
    )
    # If running in CI, use environment variable for private key
    # private_key = os.getenv("MENMONIC_PHRASE")
    # if private_key:
    #  return Wallet.import({mnemonic_phrase: private_key}, network = NETWORK)

    wallet_data = WalletData.from_dict(json.loads(os.getenv("WALLET_DATA")))
    wallet = Wallet.import_data(wallet_data)

    # For local testing, create a new wallet and fund it
    #  wallet = Wallet.create(NETWORK)
    #  print(f"\nCreated test wallet: {wallet.default_address}")

    #  wallet.faucet().wait()
    #  print(f"\nFunded test wallet: {wallet.default_address}")

    return wallet


@pytest.mark.e2e
def test_add_liquidity_e2e(wallet):
    """Test adding liquidity to Aerodrome pool end-to-end."""

    print(f"MY ETH BALANCE:{wallet.balance('eth')}")
    print(f"MY USDC BALANCE:{wallet.balance('usdc')}")
    print(f"MY WETH BALANCE:{wallet.balance('weth')}")

    # Get initial balances
    #  initial_balance_a = Decimal(wallet.balance("weth"))
    #  initial_balance_b = Decimal(wallet.balance("usdc"))

    #  print(f"\nInitial WETH balance: {initial_balance_a}")
    #  print(f"Initial USDC balance: {initial_balance_b}")

    # Request funds from faucet if needed
    #  if initial_balance_a == 0 or initial_balance_b == 0:
    #      print("\nRequesting funds from faucet...")
    #      # Add faucet request logic here if needed
    #      time.sleep(5)  # Wait for faucet tx to complete

    # Calculate min amounts based on slippage
    amount_a_min = str(Decimal(AMOUNT_A) * Decimal((1 - SLIPPAGE)))
    amount_b_min = str(Decimal(AMOUNT_B) * Decimal((1 - SLIPPAGE)))

    # Set deadline 20 minutes in the future
    deadline = str(int(time.time() + 1200))

    print("\nExecuting addLiquidity transaction...")
    result = deposit(
        wallet=wallet,
        token_a=WETH,
        token_b=USDC,
        stable=STABLE_PAIR,
        amount_a_desired=AMOUNT_A,
        amount_b_desired=AMOUNT_B,
        amount_a_min=amount_a_min,
        amount_b_min=amount_b_min,
        to=wallet.default_address.address_id,
        deadline=deadline
    )

    print(f"\nTransaction result: {result}")

    # Verify the transaction was successful
    assert not result.startswith("Error"), f"Transaction failed: {result}"
    assert "transaction hash" in result, "No transaction hash in result"

    # Wait for transaction to be mined
    time.sleep(5)

    # Get final balances
    #  final_balance_a = Decimal(wallet.balance("weth"))
    #  final_balance_b = Decimal(wallet.balance("usdc"))

    #  print(f"\nFinal WETH balance: {final_balance_a}")
    #  print(f"Final USDC balance: {final_balance_b}")

    # Verify balances changed
    #  assert final_balance_a < initial_balance_a, "WETH balance did not decrease"
    #  assert final_balance_b < initial_balance_b, "USDC balance did not decrease"

    # Calculate expected balance changes
    #  expected_change_a = Decimal(AMOUNT_A)
    #  expected_change_b = Decimal(AMOUNT_B)

    #  actual_change_a = initial_balance_a - final_balance_a
    #  actual_change_b = initial_balance_b - final_balance_b

    #  # Allow for some deviation due to gas costs and slippage
    #  assert abs(actual_change_a - expected_change_a) <= expected_change_a * SLIPPAGE, \
    #      f"Unexpected WETH balance change. Expected ~{expected_change_a}, got {actual_change_a}"
    #  assert abs(actual_change_b - expected_change_b) <= expected_change_b * SLIPPAGE, \
    #      f"Unexpected USDC balance change. Expected ~{expected_change_b}, got {actual_change_b}"


if __name__ == "__main__":
    wallet = wallet()
    test_add_liquidity_e2e(wallet)
