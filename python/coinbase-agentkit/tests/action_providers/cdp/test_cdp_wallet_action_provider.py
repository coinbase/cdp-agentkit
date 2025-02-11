"""Tests for CDP wallet action provider."""

from unittest.mock import Mock

import pytest

from coinbase_agentkit.action_providers.cdp.cdp_wallet_action_provider import (
    cdp_wallet_action_provider,
)

from .conftest import (
    MOCK_EXPLORER_URL,
    MOCK_TX_HASH,
)

MOCK_CONTRACT_ADDRESS = "0x123456789abcdef"
MOCK_NFT_BASE_URI = "https://www.test.xyz/metadata/"
MOCK_NFT_NAME = "Test Token"
MOCK_NFT_SYMBOL = "TEST"
MOCK_CONTRACT_NAME = "Test Contract"
MOCK_SOLIDITY_VERSION = "0.8.0"
MOCK_SOLIDITY_INPUT_JSON = "{}"
MOCK_CONSTRUCTOR_ARGS = {"arg1": "value1", "arg2": "value2"}
MOCK_TOKEN_SUPPLY = "1000000000000000000"


@pytest.fixture
def mock_contract_result():
    """Create a mock contract deployment result."""
    result = Mock()
    result.contract_address = MOCK_CONTRACT_ADDRESS

    transaction = Mock()
    transaction.transaction_hash = MOCK_TX_HASH
    transaction.transaction_link = f"{MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"

    result.transaction = transaction

    return result


@pytest.fixture
def mock_wallet():
    """Create a mock wallet."""
    wallet = Mock()
    wallet.network_id = "test-network"
    return wallet


@pytest.mark.usefixtures("mock_env")
class TestCdpWalletActionProvider:
    """Test CDP wallet action provider."""

    def test_deploy_contract(self, mock_wallet, mock_contract_result):
        """Test contract deployment."""
        provider = cdp_wallet_action_provider()

        contract = Mock()
        contract.wait.return_value = mock_contract_result
        mock_wallet.deploy_contract.return_value = contract

        args = {
            "solidity_version": MOCK_SOLIDITY_VERSION,
            "solidity_input_json": MOCK_SOLIDITY_INPUT_JSON,
            "contract_name": MOCK_CONTRACT_NAME,
            "constructor_args": MOCK_CONSTRUCTOR_ARGS,
        }

        result = provider.deploy_contract(mock_wallet, args)

        mock_wallet.deploy_contract.assert_called_once()
        assert f"Deployed contract {MOCK_CONTRACT_NAME}" in result
        assert f"at address {MOCK_CONTRACT_ADDRESS}" in result
        assert f"Transaction link: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}" in result

    def test_deploy_contract_error(self, mock_wallet):
        """Test contract deployment error handling."""
        provider = cdp_wallet_action_provider()

        error_message = "Contract deployment failed"
        mock_wallet.deploy_contract.side_effect = Exception(error_message)

        args = {
            "solidity_version": MOCK_SOLIDITY_VERSION,
            "solidity_input_json": MOCK_SOLIDITY_INPUT_JSON,
            "contract_name": MOCK_CONTRACT_NAME,
            "constructor_args": MOCK_CONSTRUCTOR_ARGS,
        }

        result = provider.deploy_contract(mock_wallet, args)
        assert f"Error deploying contract: {error_message}" in result

    def test_deploy_nft(self, mock_wallet, mock_contract_result):
        """Test NFT deployment."""
        provider = cdp_wallet_action_provider()

        mock_wallet.deploy_nft.return_value.wait.return_value = mock_contract_result

        args = {
            "name": MOCK_NFT_NAME,
            "symbol": MOCK_NFT_SYMBOL,
            "base_uri": MOCK_NFT_BASE_URI,
        }

        result = provider.deploy_nft(mock_wallet, args)

        mock_wallet.deploy_nft.assert_called_once_with(
            name=MOCK_NFT_NAME,
            symbol=MOCK_NFT_SYMBOL,
            base_uri=MOCK_NFT_BASE_URI,
        )
        assert f"Deployed NFT Collection {MOCK_NFT_NAME}" in result
        assert f"to address {MOCK_CONTRACT_ADDRESS}" in result
        assert f"Transaction hash for the deployment: {MOCK_TX_HASH}" in result
        assert f"Transaction link for the deployment: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}" in result

    def test_deploy_nft_error(self, mock_wallet):
        """Test NFT deployment error handling."""
        provider = cdp_wallet_action_provider()

        error_message = "NFT deployment failed"
        mock_wallet.deploy_nft.side_effect = Exception(error_message)

        args = {
            "name": MOCK_NFT_NAME,
            "symbol": MOCK_NFT_SYMBOL,
            "base_uri": MOCK_NFT_BASE_URI,
        }

        result = provider.deploy_nft(mock_wallet, args)
        assert f"Error deploying NFT {error_message}" in result

    def test_deploy_token(self, mock_wallet):
        """Test token deployment."""
        provider = cdp_wallet_action_provider()

        contract = Mock()
        contract.contract_address = MOCK_CONTRACT_ADDRESS
        contract.transaction = Mock(
            transaction_link=f"{MOCK_EXPLORER_URL}/{MOCK_TX_HASH}", transaction_hash=MOCK_TX_HASH
        )
        contract.wait.return_value = contract
        mock_wallet.deploy_token.return_value = contract

        args = {
            "name": MOCK_NFT_NAME,
            "symbol": MOCK_NFT_SYMBOL,
            "total_supply": MOCK_TOKEN_SUPPLY,
        }

        result = provider.deploy_token(mock_wallet, args)

        mock_wallet.deploy_token.assert_called_once_with(
            name=MOCK_NFT_NAME,
            symbol=MOCK_NFT_SYMBOL,
            total_supply=MOCK_TOKEN_SUPPLY,
        )
        assert f"Deployed ERC20 token contract {MOCK_NFT_NAME}" in result
        assert f"({MOCK_NFT_SYMBOL})" in result
        assert f"with total supply of {MOCK_TOKEN_SUPPLY} tokens" in result
        assert f"at address {MOCK_CONTRACT_ADDRESS}" in result
        assert f"Transaction link: {MOCK_EXPLORER_URL}/{MOCK_TX_HASH}" in result

    def test_deploy_token_error(self, mock_wallet):
        """Test token deployment error handling."""
        provider = cdp_wallet_action_provider()

        error_message = "Token deployment failed"
        mock_wallet.deploy_token.side_effect = Exception(error_message)

        args = {
            "name": MOCK_NFT_NAME,
            "symbol": MOCK_NFT_SYMBOL,
            "total_supply": MOCK_TOKEN_SUPPLY,
        }

        result = provider.deploy_token(mock_wallet, args)
        assert f"Error deploying token {error_message}" in result
