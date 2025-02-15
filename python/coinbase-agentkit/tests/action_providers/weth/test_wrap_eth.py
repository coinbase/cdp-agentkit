"""Tests for WETH action provider."""

from decimal import Decimal
from unittest.mock import MagicMock, patch

import pytest
from pydantic import ValidationError

from coinbase_agentkit.action_providers.weth.constants import MIN_WRAP_AMOUNT
from coinbase_agentkit.action_providers.weth.schemas import WrapEthInput
from coinbase_agentkit.action_providers.weth.weth_action_provider import (
    WETH_ABI,
    WETH_ADDRESS,
    WethActionProvider,
)
from coinbase_agentkit.network import Network

from .conftest import (
    MOCK_RECEIPT,
    MOCK_TX_HASH,
)

# Use human-readable ETH amount for testing (convert from wei to ETH)
MOCK_AMOUNT = str(MIN_WRAP_AMOUNT / 10**18)  # "0.0001"


def test_wrap_eth_input_model_valid():
    """Test that WrapEthInput accepts valid parameters."""
    input_model = WrapEthInput(amount_to_wrap=MOCK_AMOUNT)

    assert isinstance(input_model, WrapEthInput)
    assert input_model.amount_to_wrap == MOCK_AMOUNT


def test_wrap_eth_input_model_invalid_format():
    """Test that WrapEthInput rejects invalid format inputs."""
    invalid_inputs = [
        "abc",
        "123abc",
        "abc123",
        "!@#",
        "-1.5",  # negative number
        "0",     # zero
        "-0",    # negative zero
        "0.0",   # zero as decimal
    ]
    for invalid_input in invalid_inputs:
        with pytest.raises(ValidationError) as exc_info:
            WrapEthInput(amount_to_wrap=invalid_input)
        error_msg = str(exc_info.value)
        assert any([
            "Amount must be a valid decimal number" in error_msg,
            "Amount must be greater than 0" in error_msg
        ])


def test_wrap_eth_input_model_missing_params():
    """Test that WrapEthInput raises error when params are missing."""
    with pytest.raises(ValidationError):
        WrapEthInput()


def test_wrap_eth_success():
    """Test successful ETH wrapping."""
    with (
        patch("coinbase_agentkit.action_providers.weth.weth_action_provider.Web3") as mock_web3,
    ):
        mock_contract = mock_web3.return_value.eth.contract.return_value
        mock_contract.encode_abi.return_value = "0xencoded"
        mock_wallet = MagicMock()
        mock_wallet.send_transaction.return_value = MOCK_TX_HASH
        mock_wallet.wait_for_transaction_receipt.return_value = MOCK_RECEIPT

        provider = WethActionProvider()
        args = {"amount_to_wrap": MOCK_AMOUNT}
        response = provider.wrap_eth(mock_wallet, args)

        expected_response = f"Wrapped {MOCK_AMOUNT} ETH with transaction hash: {MOCK_TX_HASH}"
        assert response == expected_response

        mock_web3.return_value.eth.contract.assert_called_once_with(
            address=WETH_ADDRESS,
            abi=WETH_ABI,
        )

        mock_contract.encode_abi.assert_called_once_with(
            "deposit",
            args=[],
        )

        mock_wallet.send_transaction.assert_called_once()
        tx = mock_wallet.send_transaction.call_args[0][0]
        assert tx["to"] == WETH_ADDRESS
        assert tx["data"] == "0xencoded"
        # Convert human-readable amount to wei
        expected_wei = str(int(Decimal(MOCK_AMOUNT) * Decimal(10**18)))
        assert tx["value"] == expected_wei

        mock_wallet.wait_for_transaction_receipt.assert_called_once_with(MOCK_TX_HASH)


def test_wrap_eth_validation_error():
    """Test wrap_eth with invalid input."""
    provider = WethActionProvider()
    mock_wallet = MagicMock()

    invalid_inputs = [
        {},  # Missing required field
        {"amount_to_wrap": "abc"},  # Invalid number format
    ]

    for invalid_input in invalid_inputs:
        response = provider.wrap_eth(mock_wallet, invalid_input)
        assert "Error wrapping ETH: " in response
        assert "validation error" in response.lower()


def test_wrap_eth_transaction_error():
    """Test wrap_eth when transaction fails."""
    with (
        patch("coinbase_agentkit.action_providers.weth.weth_action_provider.Web3") as mock_web3,
    ):
        mock_contract = mock_web3.return_value.eth.contract.return_value
        mock_contract.encode_abi.return_value = "0xencoded"
        mock_wallet = MagicMock()
        mock_wallet.send_transaction.side_effect = Exception("Transaction failed")

        provider = WethActionProvider()
        args = {"amount_to_wrap": MOCK_AMOUNT}
        response = provider.wrap_eth(mock_wallet, args)

        expected_response = "Error wrapping ETH: Transaction failed"
        assert response == expected_response

        mock_web3.return_value.eth.contract.assert_called_once_with(
            address=WETH_ADDRESS,
            abi=WETH_ABI,
        )


def test_supports_network():
    """Test network support validation."""
    provider = WethActionProvider()

    test_cases = [
        ("base-mainnet", "8453", "evm", True),
        ("base-sepolia", "84532", "evm", True),
        ("ethereum-mainnet", "1", "evm", False),
        ("arbitrum-one", "42161", "evm", False),
        ("optimism", "10", "evm", False),
        ("base-goerli", "84531", "evm", False),
        ("mainnet", None, "bitcoin", False),
        ("mainnet", None, "solana", False),
    ]

    for network_id, chain_id, protocol_family, expected_result in test_cases:
        network = Network(protocol_family=protocol_family, chain_id=chain_id, network_id=network_id)
        result = provider.supports_network(network)
        assert (
            result is expected_result
        ), f"Network {network_id} (chain_id: {chain_id}) should{' ' if expected_result else ' not '}be supported"


def test_action_provider_setup():
    """Test action provider initialization."""
    provider = WethActionProvider()
    assert provider.name == "weth"
    assert provider.action_providers == []
