import json
import os
from decimal import Decimal

import pytest
from cdp import Asset, Cdp, Wallet, WalletData
from eth_utils import to_checksum_address

from cdp_agentkit_core.actions.aerodrome.quote import quote_add_liquidity_action
from cdp_agentkit_core.actions.aerodrome.utils import get_lp_token_address, get_token_balance

# Test constants
NETWORK = "base-mainnet"
WETH = to_checksum_address("0x4200000000000000000000000000000000000006")
USDC = to_checksum_address("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")
STABLE_PAIR = True
AMOUNT_A = "0.000001"  # ETH amount
AMOUNT_B = "0.903444"  # USDC amount

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
def test_quote_add_liquidity_e2e(wallet):
    """Test getting quote for adding liquidity to Aerodrome pool end-to-end."""
    print("\nExecuting quoteAddLiquidity query...")
    
    # Get LP token address to verify pool exists
    lp_token_address = get_lp_token_address(wallet, WETH, USDC, STABLE_PAIR)
    print(f"\nLP token address: {lp_token_address}")

    # Get initial pool balances
    weth_balance = get_token_balance(wallet, WETH, lp_token_address)
    usdc_balance = get_token_balance(wallet, USDC, lp_token_address)
    print(f"\nPool balances - WETH: {weth_balance}, USDC: {usdc_balance}")

    # Get quote
    result = quote_add_liquidity_action(
        wallet=wallet,
        token_a=WETH,
        token_b=USDC,
        stable=STABLE_PAIR,
        amount_a_desired=AMOUNT_A,
        amount_b_desired=AMOUNT_B,
    )

    print(f"\nQuote result: {result}")

    # Verify the quote was successful
    assert not result.startswith("Error"), f"Quote failed: {result}"
    assert "Quote for adding liquidity to Aerodrome pool" in result, "Expected quote information not found"
    assert "Token A amount" in result, "Token A amount not found in quote"
    assert "Token B amount" in result, "Token B amount not found in quote"
    assert "Expected liquidity tokens" in result, "Liquidity tokens not found in quote"

    # Parse the quoted amounts
    lines = result.split('\n')
    token_a_amount = Decimal(lines[1].split(': ')[1])
    token_b_amount = Decimal(lines[2].split(': ')[1])
    liquidity = Decimal(lines[3].split(': ')[1])

    # Verify the quoted amounts are reasonable
    assert token_a_amount > 0, "Token A amount should be greater than 0"
    assert token_b_amount > 0, "Token B amount should be greater than 0"
    assert liquidity > 0, "Liquidity tokens should be greater than 0"

    # For stable pairs, verify the ratio is close to expected
    if STABLE_PAIR:
        # Get token decimals
        token_a_asset = Asset.fetch(wallet.network_id, WETH)
        token_b_asset = Asset.fetch(wallet.network_id, USDC)
        
        # Calculate the ratio in USD terms (assuming 1 ETH ≈ 3000 USDC)
        eth_usd_value = token_a_amount * 3000
        usdc_value = token_b_amount
        ratio = eth_usd_value / usdc_value if usdc_value else 0
        
        print(f"\nRatio check:")
        print(f"ETH amount: {token_a_amount}")
        print(f"USDC amount: {token_b_amount}")
        print(f"Calculated ratio: {ratio}")
        
        # Allow for a wider range due to market fluctuations
        assert 0.1 <= ratio <= 10, f"Ratio {ratio} is outside expected range for stable pair"

@pytest.mark.e2e
def test_quote_add_liquidity_invalid_amounts(wallet):
    """Test quote with invalid amounts."""
    result = quote_add_liquidity_action(
        wallet=wallet,
        token_a=WETH,
        token_b=USDC,
        stable=STABLE_PAIR,
        amount_a_desired="0",
        amount_b_desired="0",
    )

    assert result.startswith("Error"), "Expected error for zero amounts"
    assert "Desired amounts must be greater than 0" in result

@pytest.mark.e2e
def test_quote_add_liquidity_invalid_tokens(wallet):
    """Test quote with invalid token addresses."""
    invalid_token = to_checksum_address("0x0000000000000000000000000000000000000000")

    result = quote_add_liquidity_action(
        wallet=wallet,
        token_a=invalid_token,
        token_b=USDC,
        stable=STABLE_PAIR,
        amount_a_desired=AMOUNT_A,
        amount_b_desired=AMOUNT_B,
    )

    assert result.startswith("Error"), "Expected error for invalid token address"

if __name__ == "__main__":
    wallet = wallet()
    test_quote_add_liquidity_e2e(wallet)
    test_quote_add_liquidity_invalid_amounts(wallet)
    test_quote_add_liquidity_invalid_tokens(wallet)
