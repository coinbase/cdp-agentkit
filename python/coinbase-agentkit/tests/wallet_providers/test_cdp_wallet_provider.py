"""Tests for CDP wallet provider."""

from decimal import Decimal
from unittest.mock import Mock, patch

import pytest
from web3 import Web3

from coinbase_agentkit.network import Network
from coinbase_agentkit.wallet_providers.cdp_wallet_provider import (
    CdpProviderConfig,
    CdpWalletProvider,
    CdpWalletProviderConfig,
)

MOCK_API_KEY_NAME = "test_key"
MOCK_API_KEY_PRIVATE_KEY = "test_private_key"

MOCK_NETWORK_ID = "base-sepolia"
MOCK_CHAIN_ID = 84532
MOCK_RPC_URL = "https://sepolia.base.org"

MOCK_MNEMONIC_PHRASE = "mesh north fiber sauce occur obey leisure hungry tenant vacant hurdle talk resist grape electric"

MOCK_WALLET_ID = "86324540-4dba-4856-a120-702f70737204"
MOCK_WALLET_SEED = "0xbea184c08988a12229a53c762531b426b2b233b6152e1374f63404207141f26d"
MOCK_WALLET_DEFAULT_ADDRESS = "0x2c84938D3Ca551A476e540297A40d36736948eA1"

MOCK_WALLET_DATA = f'{{"wallet_id": "{MOCK_WALLET_ID}", "seed": "{MOCK_WALLET_SEED}", "network_id": "{MOCK_NETWORK_ID}", "default_address_id": "{MOCK_WALLET_DEFAULT_ADDRESS}"}}'

MOCK_ETH_AMOUNT = Decimal("0.01")
MOCK_ETH_BALANCE = Decimal("1.0")
MOCK_BALANCE = Decimal("1000000000000000000")

MOCK_FROM_ADDRESS = MOCK_WALLET_DEFAULT_ADDRESS
MOCK_TO_ADDRESS = "0x5154eae861cac3aa757d6016babaf972341354cf"
MOCK_TX_HASH = "0xffcc5fb66fd40f25af7a412025043096577d8c1e00f5fa2c95861a1ba6832a37"


@pytest.fixture
def mock_wallet():
    """Create a mock wallet for testing."""
    wallet = Mock()
    wallet.default_address = Mock()
    wallet.default_address.network_id = MOCK_NETWORK_ID
    wallet.default_address.address_id = MOCK_FROM_ADDRESS
    wallet.balance.return_value = MOCK_ETH_BALANCE
    return wallet


@pytest.fixture
def mock_cdp():
    """Create a mock CDP instance."""
    with patch("cdp.Cdp") as mock_cdp:
        mock_cdp_instance = Mock()
        mock_cdp.configure.return_value = mock_cdp_instance
        mock_cdp.configure_from_json.return_value = mock_cdp_instance
        yield mock_cdp


@pytest.fixture
def mock_wallet_class(mock_wallet):
    """Create a mock Wallet class."""
    with patch("cdp.Wallet") as mock_class:
        mock_class.create.return_value = mock_wallet
        mock_class.import_data.return_value = mock_wallet
        mock_class.import_wallet.return_value = mock_wallet
        yield mock_class


@pytest.fixture
def provider_factory(mock_wallet, mock_cdp, mock_wallet_class):
    """Create a provider factory with mock wallet."""

    def _factory():
        with patch.dict(
            "os.environ",
            {
                "CDP_API_KEY_NAME": MOCK_API_KEY_NAME,
                "CDP_API_KEY_PRIVATE_KEY": MOCK_API_KEY_PRIVATE_KEY,
            },
        ):
            config = CdpWalletProviderConfig(
                network_id=MOCK_NETWORK_ID, chain_id=MOCK_CHAIN_ID, rpc_url=MOCK_RPC_URL
            )
            provider = CdpWalletProvider(config)
            provider._wallet = mock_wallet
            provider._network = Network(
                protocol_family="evm",
                network_id=MOCK_NETWORK_ID,
                chain_id=MOCK_CHAIN_ID,
            )
            provider._web3 = Web3()
            return provider

    return _factory


def test_get_address(provider_factory, mock_wallet):
    """Test getting wallet address."""
    provider = provider_factory()
    address = provider.get_address()
    assert address == MOCK_FROM_ADDRESS


def test_get_network(provider_factory):
    """Test getting network information."""
    provider = provider_factory()
    network = provider.get_network()
    assert network.protocol_family == "evm"
    assert network.network_id == MOCK_NETWORK_ID
    assert network.chain_id == MOCK_CHAIN_ID


def test_get_balance(provider_factory, mock_wallet):
    """Test getting wallet balance."""
    provider = provider_factory()
    balance = provider.get_balance()
    assert balance == MOCK_BALANCE
    mock_wallet.balance.assert_called_once_with("eth")


def test_get_name(provider_factory):
    """Test getting provider name."""
    provider = provider_factory()
    assert provider.get_name() == "cdp_wallet_provider"


def test_provider_config_with_api_keys():
    """Test CDP provider config with API keys."""
    config = CdpProviderConfig(
        api_key_name=MOCK_API_KEY_NAME,
        api_key_private_key=MOCK_API_KEY_PRIVATE_KEY,
    )
    assert config.api_key_name == MOCK_API_KEY_NAME
    assert config.api_key_private_key == MOCK_API_KEY_PRIVATE_KEY


def test_provider_config_without_api_keys():
    """Test CDP provider config without API keys."""
    config = CdpProviderConfig()
    assert config.api_key_name is None
    assert config.api_key_private_key is None


def test_wallet_provider_config_with_mnemonic():
    """Test CDP wallet provider config with mnemonic."""
    config = CdpWalletProviderConfig(
        network_id=MOCK_NETWORK_ID,
        mnemonic_phrase=MOCK_MNEMONIC_PHRASE,
    )
    assert config.network_id == MOCK_NETWORK_ID
    assert config.mnemonic_phrase == MOCK_MNEMONIC_PHRASE
    assert config.wallet_data is None


def test_wallet_provider_config_with_wallet_data():
    """Test CDP wallet provider config with wallet data."""
    config = CdpWalletProviderConfig(
        network_id=MOCK_NETWORK_ID,
        wallet_data=MOCK_WALLET_DATA,
    )
    assert config.network_id == MOCK_NETWORK_ID
    assert config.mnemonic_phrase is None
    assert config.wallet_data == MOCK_WALLET_DATA


def test_provider_initialization(mock_cdp, mock_wallet_class):
    """Test CDP wallet provider initialization."""
    config = CdpWalletProviderConfig(
        api_key_name=MOCK_API_KEY_NAME,
        api_key_private_key=MOCK_API_KEY_PRIVATE_KEY,
        network_id=MOCK_NETWORK_ID,
        chain_id=MOCK_CHAIN_ID,
        rpc_url=MOCK_RPC_URL,
    )

    _ = CdpWalletProvider(config)

    mock_cdp.configure.assert_called_once_with(
        api_key_name=MOCK_API_KEY_NAME,
        private_key=MOCK_API_KEY_PRIVATE_KEY,
    )
    mock_cdp.configure_from_json.assert_not_called()


def test_configure_with_new_wallet(mock_cdp, mock_wallet_class):
    """Test configuring provider with new wallet creation."""
    with patch.dict(
        "os.environ",
        {
            "CDP_API_KEY_NAME": MOCK_API_KEY_NAME,
            "CDP_API_KEY_PRIVATE_KEY": MOCK_API_KEY_PRIVATE_KEY,
        },
    ):
        config = CdpWalletProviderConfig(
            network_id=MOCK_NETWORK_ID, chain_id=MOCK_CHAIN_ID, rpc_url=MOCK_RPC_URL
        )
        provider = CdpWalletProvider(config)

        mock_wallet_class.create.assert_called_once_with(network_id=MOCK_NETWORK_ID)

        assert provider._address is not None
        assert provider._network is not None
        assert provider._network.chain_id == MOCK_CHAIN_ID
        assert provider._network.network_id == MOCK_NETWORK_ID
        assert provider._network.protocol_family == "evm"
        assert provider._wallet is not None
        assert provider._web3 is not None
        assert isinstance(provider._web3, Web3)


def test_configure_with_wallet_data(mock_wallet_class):
    """Test configuring provider with existing wallet data."""
    with (
        patch("cdp.WalletData") as mock_wallet_data_class,
        patch.dict(
            "os.environ",
            {
                "CDP_API_KEY_NAME": MOCK_API_KEY_NAME,
                "CDP_API_KEY_PRIVATE_KEY": MOCK_API_KEY_PRIVATE_KEY,
            },
        ),
    ):
        mock_wallet_data = Mock()
        mock_wallet_data_class.from_dict.return_value = mock_wallet_data

        config = CdpWalletProviderConfig(
            network_id=MOCK_NETWORK_ID,
            chain_id=MOCK_CHAIN_ID,
            rpc_url=MOCK_RPC_URL,
            wallet_data=MOCK_WALLET_DATA,
        )
        provider = CdpWalletProvider(config)

        mock_wallet_data_class.from_dict.assert_called_once_with(
            {
                "wallet_id": MOCK_WALLET_ID,
                "seed": MOCK_WALLET_SEED,
                "network_id": MOCK_NETWORK_ID,
                "default_address_id": MOCK_WALLET_DEFAULT_ADDRESS,
            }
        )

        mock_wallet_class.import_data.assert_called_once_with(mock_wallet_data)

        assert provider._address is not None
        assert provider._address == MOCK_WALLET_DEFAULT_ADDRESS
        assert provider._network is not None
        assert provider._network.chain_id == MOCK_CHAIN_ID
        assert provider._network.network_id == MOCK_NETWORK_ID
        assert provider._network.protocol_family == "evm"
        assert provider._wallet is not None
        assert provider._web3 is not None
        assert isinstance(provider._web3, Web3)

        mock_wallet_class.create.assert_not_called()
        mock_wallet_class.import_wallet.assert_not_called()


def test_configure_with_mnemonic_phrase(mock_wallet_class):
    """Test configuring provider with mnemonic phrase."""
    with (
        patch("cdp.MnemonicSeedPhrase") as mock_mnemonic_class,
        patch.dict(
            "os.environ",
            {
                "CDP_API_KEY_NAME": MOCK_API_KEY_NAME,
                "CDP_API_KEY_PRIVATE_KEY": MOCK_API_KEY_PRIVATE_KEY,
            },
        ),
    ):
        mock_mnemonic = Mock()
        mock_mnemonic_class.return_value = mock_mnemonic

        config = CdpWalletProviderConfig(
            network_id=MOCK_NETWORK_ID,
            chain_id=MOCK_CHAIN_ID,
            rpc_url=MOCK_RPC_URL,
            mnemonic_phrase=MOCK_MNEMONIC_PHRASE,
        )
        provider = CdpWalletProvider(config)

        mock_mnemonic_class.assert_called_once_with(MOCK_MNEMONIC_PHRASE)
        mock_wallet_class.import_wallet.assert_called_once_with(mock_mnemonic, MOCK_NETWORK_ID)

        assert provider._address is not None
        assert provider._address == MOCK_WALLET_DEFAULT_ADDRESS
        assert provider._network is not None
        assert provider._network.chain_id == MOCK_CHAIN_ID
        assert provider._network.network_id == MOCK_NETWORK_ID
        assert provider._network.protocol_family == "evm"
        assert provider._wallet is not None
        assert provider._web3 is not None
        assert isinstance(provider._web3, Web3)

        mock_wallet_class.create.assert_not_called()
        mock_wallet_class.import_data.assert_not_called()


def test_native_transfer_success(provider_factory, mock_wallet):
    """Test successful native ETH transfer."""
    transfer_result = Mock()
    transfer_result.transaction_hash = MOCK_TX_HASH
    transfer_result.wait.return_value = transfer_result
    mock_wallet.transfer.return_value = transfer_result

    provider = provider_factory()
    tx_hash = provider.native_transfer(to=MOCK_TO_ADDRESS, value=MOCK_ETH_AMOUNT)

    assert tx_hash == MOCK_TX_HASH
    mock_wallet.transfer.assert_called_once_with(
        amount=MOCK_ETH_AMOUNT,
        asset_id="eth",
        destination=Web3.to_checksum_address(MOCK_TO_ADDRESS),
        gasless=False,
    )


def test_native_transfer_failure(provider_factory, mock_wallet):
    """Test native transfer when error occurs."""
    provider = provider_factory()
    error_message = "Transfer failed"
    mock_wallet.transfer.side_effect = Exception(error_message)

    with pytest.raises(Exception) as exc_info:
        provider.native_transfer(to=MOCK_TO_ADDRESS, value=MOCK_ETH_AMOUNT)

    assert str(exc_info.value) == f"Failed to transfer native tokens: {error_message}"
    mock_wallet.transfer.assert_called_once_with(
        amount=MOCK_ETH_AMOUNT,
        asset_id="eth",
        destination=Web3.to_checksum_address(MOCK_TO_ADDRESS),
        gasless=False,
    )


def test_native_transfer_missing_tx_hash(provider_factory, mock_wallet):
    """Test native transfer when transaction hash is missing."""
    transfer_result = Mock()
    transfer_result.transaction_hash = None
    transfer_result.wait.return_value = transfer_result
    mock_wallet.transfer.return_value = transfer_result

    provider = provider_factory()
    with pytest.raises(Exception) as exc_info:
        provider.native_transfer(to=MOCK_TO_ADDRESS, value=MOCK_ETH_AMOUNT)

    assert str(exc_info.value) == "Failed to transfer native tokens: Transaction hash not found"
    mock_wallet.transfer.assert_called_once_with(
        amount=MOCK_ETH_AMOUNT,
        asset_id="eth",
        destination=Web3.to_checksum_address(MOCK_TO_ADDRESS),
        gasless=False,
    )
