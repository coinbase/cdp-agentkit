"""CDP wallet provider."""
import json
import os
from decimal import Decimal
from typing import Any

from pydantic import BaseModel, Field
from web3 import Web3
from web3.types import BlockIdentifier, ChecksumAddress, HexStr, TxParams

from ..network import Network
from .evm_wallet_provider import EvmWalletProvider


class CdpProviderConfig(BaseModel):
    """Configuration options for CDP providers."""

    api_key_name: str | None = Field(None, description="The CDP API key name")
    api_key_private_key: str | None = Field(None, description="The CDP API private key")


class CdpWalletProviderConfig(CdpProviderConfig):
    """Configuration options for CDP wallet provider."""

    chain_id: int | None = Field(None, description="The chain id")
    network_id: str | None = Field("base-sepolia", description="The network id")
    mnemonic_phrase: str | None = Field(None, description="The mnemonic phrase of the wallet")
    rpc_url: str | None = Field(None, description="The RPC URL")
    wallet_data: str | None = Field(None, description="The data of the CDP Wallet as a JSON string")


class CdpWalletProvider(EvmWalletProvider):
    """A wallet provider that uses the CDP SDK."""

    def __init__(self, config: CdpWalletProviderConfig | None = None):
        """Initialize CDP wallet provider.

        Args:
            config: Configuration options for the CDP provider.

        """
        if not config:
            config = CdpWalletProviderConfig()

        try:
            from cdp import Cdp, MnemonicSeedPhrase, Wallet, WalletData

            api_key_name = config.api_key_name or os.getenv("CDP_API_KEY_NAME")
            api_key_private_key = config.api_key_private_key or os.getenv("CDP_API_KEY_PRIVATE_KEY")

            if api_key_name and api_key_private_key:
                Cdp.configure(
                    api_key_name=api_key_name,
                    private_key=api_key_private_key.replace("\\n", "\n"),
                )
            else:
                Cdp.configure_from_json()

            network_id = config.network_id or os.getenv("NETWORK_ID", "base-sepolia")
            chain_id = config.chain_id or os.getenv("CHAIN_ID", "84532")
            rpc_url = config.rpc_url or os.getenv("RPC_URL", "https://sepolia.base.org")

            if not network_id:
                raise ValueError("NETWORK_ID is required")

            if not chain_id:
                raise ValueError("CHAIN_ID is required")

            if not rpc_url:
                raise ValueError("RPC_URL is required")

            if config.wallet_data:
                wallet_data = WalletData.from_dict(json.loads(config.wallet_data))
                self._wallet = Wallet.import_data(wallet_data)
            elif config.mnemonic_phrase:
                phrase = MnemonicSeedPhrase(config.mnemonic_phrase)
                self._wallet = Wallet.import_wallet(phrase, network_id)
            else:
                self._wallet = Wallet.create(network_id=network_id)

            self._address = self._wallet.default_address.address_id
            self._network = Network(
                protocol_family="evm",
                network_id=network_id,
                chain_id=chain_id,
            )
            self._web3 = Web3(Web3.HTTPProvider(rpc_url))

        except ImportError as e:
            raise ImportError("Failed to import cdp. Please install it with 'pip install cdp-sdk'.") from e
        except Exception as e:
            raise ValueError(f"Failed to initialize CDP wallet: {e!s}") from e

    def get_address(self) -> str:
        """Get the wallet address."""
        return self._address

    def get_balance(self) -> Decimal:
        """Get the wallet balance in native currency."""
        if not self._wallet:
            raise Exception("Wallet not initialized")

        balance = self._wallet.balance("eth")
        return Decimal(str(Web3.to_wei(balance, "ether")))

    def get_name(self) -> str:
        """Get the name of the wallet provider."""
        return "cdp_wallet_provider"

    def get_network(self) -> Network:
        """Get the current network."""
        return self._network

    def native_transfer(self, to: str, value: Decimal) -> str:
        """Transfer the native asset of the network.

        Args:
            to: The destination address
            value: The amount to transfer in whole units (e.g. '1.5' for 1.5 ETH)

        Returns:
            The transaction hash as a string

        """
        if not self._wallet:
            raise Exception("Wallet not initialized")

        try:
            transfer_result = self._wallet.transfer(
                amount=value,
                asset_id="eth",
                destination=to,
                gasless=False,
            )

            transfer_result.wait()
            tx_hash = transfer_result.transaction_hash

            if not tx_hash:
                raise Exception("Transaction hash not found")

            return tx_hash
        except Exception as e:
            raise Exception(f"Failed to transfer native tokens: {e!s}") from e

    def read_contract(
        self,
        contract_address: ChecksumAddress,
        abi: list[dict[str, Any]],
        function_name: str,
        args: list[Any] | None = None,
        block_identifier: BlockIdentifier = "latest",
    ) -> Any:
        """Read data from a smart contract."""
        raise NotImplementedError

    def sign_message(self, message: str | bytes) -> HexStr:
        """Sign a message using the wallet's private key."""
        raise NotImplementedError

    def sign_typed_data(
        self, domain: dict[str, Any], types: dict[str, Any], data: dict[str, Any]
    ) -> HexStr:
        """Sign typed data according to EIP-712 standard."""
        raise NotImplementedError

    def sign_transaction(self, transaction: TxParams) -> Any:
        """Sign an EVM transaction."""
        raise NotImplementedError

    def send_transaction(self, transaction: TxParams) -> HexStr:
        """Send a signed transaction to the network."""
        raise NotImplementedError

    def wait_for_transaction_receipt(
        self, tx_hash: HexStr, timeout: float = 120, poll_latency: float = 0.1
    ) -> dict[str, Any]:
        """Wait for transaction confirmation and return receipt."""
        raise NotImplementedError
