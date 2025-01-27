"""Tests for Compound schemas."""

import pytest
from pydantic import ValidationError

from coinbase_agentkit.action_providers.compound.schemas import (
    CompoundBorrowInput,
    CompoundPortfolioInput,
    CompoundRepayInput,
    CompoundSupplyInput,
    CompoundWithdrawInput,
)


def test_supply_input_model_valid():
    """Test that CompoundSupplyInput schema accepts valid parameters."""
    valid_inputs = [
        {"asset_id": "weth", "amount": "0.125"},
        {"asset_id": "cbeth", "amount": "1.0"},
        {"asset_id": "cbbtc", "amount": "0.01"},
        {"asset_id": "wsteth", "amount": "2.5"},
        {"asset_id": "usdc", "amount": "1000"},
    ]
    for valid_input in valid_inputs:
        input_model = CompoundSupplyInput(**valid_input)
        assert input_model.asset_id == valid_input["asset_id"]
        assert input_model.amount == valid_input["amount"]


def test_supply_input_model_missing_params():
    """Test that CompoundSupplyInput schema raises error when params are missing."""
    with pytest.raises(ValidationError):
        CompoundSupplyInput(amount="0.125")  # Missing asset_id
    with pytest.raises(ValidationError):
        CompoundSupplyInput(asset_id="weth")  # Missing amount


def test_supply_input_model_invalid_asset():
    """Test that CompoundSupplyInput schema raises error for invalid asset_id."""
    with pytest.raises(ValidationError):
        CompoundSupplyInput(asset_id="invalid", amount="0.125")


def test_withdraw_input_model_valid():
    """Test that CompoundWithdrawInput schema accepts valid parameters."""
    valid_inputs = [
        {"asset_id": "weth", "amount": "0.125"},
        {"asset_id": "cbeth", "amount": "1.0"},
        {"asset_id": "cbbtc", "amount": "0.01"},
        {"asset_id": "wsteth", "amount": "2.5"},
        {"asset_id": "usdc", "amount": "1000"},
    ]
    for valid_input in valid_inputs:
        input_model = CompoundWithdrawInput(**valid_input)
        assert input_model.asset_id == valid_input["asset_id"]
        assert input_model.amount == valid_input["amount"]


def test_withdraw_input_model_missing_params():
    """Test that CompoundWithdrawInput schema raises error when params are missing."""
    with pytest.raises(ValidationError):
        CompoundWithdrawInput(amount="0.125")  # Missing asset_id
    with pytest.raises(ValidationError):
        CompoundWithdrawInput(asset_id="weth")  # Missing amount


def test_withdraw_input_model_invalid_asset():
    """Test that CompoundWithdrawInput schema raises error for invalid asset_id."""
    with pytest.raises(ValidationError):
        CompoundWithdrawInput(asset_id="invalid", amount="0.125")


def test_borrow_input_model_valid():
    """Test that CompoundBorrowInput schema accepts valid parameters."""
    valid_inputs = [
        {"asset_id": "weth", "amount": "0.5"},
        {"asset_id": "usdc", "amount": "1000"},
    ]
    for valid_input in valid_inputs:
        input_model = CompoundBorrowInput(**valid_input)
        assert input_model.asset_id == valid_input["asset_id"]
        assert input_model.amount == valid_input["amount"]


def test_borrow_input_model_missing_params():
    """Test that CompoundBorrowInput schema raises error when params are missing."""
    with pytest.raises(ValidationError):
        CompoundBorrowInput(amount="0.5")  # Missing asset_id
    with pytest.raises(ValidationError):
        CompoundBorrowInput(asset_id="weth")  # Missing amount


def test_borrow_input_model_invalid_asset():
    """Test that CompoundBorrowInput schema raises error for invalid asset_id."""
    with pytest.raises(ValidationError):
        CompoundBorrowInput(asset_id="cbeth", amount="0.5")  # Only weth and usdc allowed
    with pytest.raises(ValidationError):
        CompoundBorrowInput(asset_id="invalid", amount="0.5")


def test_repay_input_model_valid():
    """Test that CompoundRepayInput schema accepts valid parameters."""
    valid_inputs = [
        {"asset_id": "weth", "amount": "0.5"},
        {"asset_id": "usdc", "amount": "1000"},
    ]
    for valid_input in valid_inputs:
        input_model = CompoundRepayInput(**valid_input)
        assert input_model.asset_id == valid_input["asset_id"]
        assert input_model.amount == valid_input["amount"]


def test_repay_input_model_missing_params():
    """Test that CompoundRepayInput schema raises error when params are missing."""
    with pytest.raises(ValidationError):
        CompoundRepayInput(amount="1000")  # Missing asset_id
    with pytest.raises(ValidationError):
        CompoundRepayInput(asset_id="usdc")  # Missing amount


def test_repay_input_model_invalid_asset():
    """Test that CompoundRepayInput schema raises error for invalid asset_id."""
    with pytest.raises(ValidationError):
        CompoundRepayInput(asset_id="cbeth", amount="1000")  # Only weth and usdc allowed
    with pytest.raises(ValidationError):
        CompoundRepayInput(asset_id="invalid", amount="1000")


def test_portfolio_input_model_valid():
    """Test that CompoundPortfolioInput works with no parameters required."""
    input_model = CompoundPortfolioInput()
    assert isinstance(input_model, CompoundPortfolioInput)
