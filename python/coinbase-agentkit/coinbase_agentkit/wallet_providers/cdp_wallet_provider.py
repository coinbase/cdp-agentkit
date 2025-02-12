"""CDP wallet provider."""

import json
import os
from decimal import Decimal
from typing import Any

from cdp import (
    Cdp,
    ExternalAddress,
    MnemonicSeedPhrase,
    Wallet,
    WalletData,
    hash_message,
    hash_typed_data_message,
)
from eth_account.typed_transactions import DynamicFeeTransaction
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
            raise ImportError(
                "Failed to import cdp. Please install it with 'pip install cdp-sdk'."
            ) from e
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
                destination=Web3.to_checksum_address(to),
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
        contract = self._web3.eth.contract(address=contract_address, abi=abi)
        func = contract.functions[function_name]
        if args is None:
            args = []
        return func(*args).call(block_identifier=block_identifier)

    def sign_message(self, message: str | bytes) -> HexStr:
        """Sign a message using the wallet's private key."""
        if not self._wallet:
            raise Exception("Wallet not initialized")

        message_hash = hash_message(message)
        payload_signature = self._wallet.sign_payload(message_hash)

        return payload_signature.signature

    def sign_typed_data(self, typed_data: dict[str, Any]) -> HexStr:
        """Sign typed data according to EIP-712 standard."""
        if not self._wallet:
            raise Exception("Wallet not initialized")

        typed_data_message_hash = hash_typed_data_message(typed_data)

        payload_signature = self._wallet.sign_payload(typed_data_message_hash)

        return payload_signature.signature

    def sign_transaction(self, transaction: TxParams) -> HexStr:
        """Sign an EVM transaction."""
        if not self._wallet:
            raise Exception("Wallet not initialized")

        dynamic_fee_tx = DynamicFeeTransaction.from_dict(transaction)

        tx_hash_bytes = dynamic_fee_tx.hash()
        tx_hash_hex = tx_hash_bytes.hex()

        payload_signature = self._wallet.sign_payload(tx_hash_hex)
        return payload_signature.signature

    def send_transaction(self, transaction: TxParams) -> HexStr:
        """Send a signed transaction to the network."""
        self._prepare_transaction(transaction)

        signature = self.sign_transaction(transaction)

        transaction["r"] = int(signature[2:66], 16)
        transaction["s"] = int(signature[66:130], 16)
        transaction["v"] = int(signature[130:132], 16) - 27

        signed_dynamic_fee_tx = DynamicFeeTransaction.from_dict(transaction)

        signed_bytes = signed_dynamic_fee_tx.payload()

        external_address = ExternalAddress(
            self._wallet.network_id, self._wallet.default_address.address_id
        )
        broadcasted_transaction = external_address.broadcast_external_transaction(
            "02" + signed_bytes.hex()
        )

        return broadcasted_transaction.transaction_hash

    def get_transaction_receipt(self, tx_hash: HexStr) -> dict[str, Any]:
        """Get the transaction receipt for a given transaction hash."""
        raise NotImplementedError

    def wait_for_transaction_receipt(
        self, tx_hash: HexStr, timeout: float = 120, poll_latency: float = 0.1
    ) -> dict[str, Any]:
        """Wait for transaction confirmation and return receipt."""
        return self._web3.eth.wait_for_transaction_receipt(
            tx_hash, timeout=timeout, poll_latency=poll_latency
        )

    def _prepare_transaction(self, transaction: TxParams) -> TxParams:
        """Prepare EIP-1559 transaction for signing."""
        if transaction["to"]:
            transaction["to"] = Web3.to_bytes(hexstr=transaction["to"])
        else:
            transaction["to"] = b""

        transaction["from"] = self._address
        transaction["value"] = int(transaction.get("value", 0))
        transaction["type"] = 2
        transaction["chainId"] = self._network.chain_id

        nonce = self._web3.eth.get_transaction_count(self._address)
        transaction["nonce"] = nonce

        data_field = transaction.get("data", b"")
        if isinstance(data_field, str) and data_field.startswith("0x"):
            data_bytes = bytes.fromhex(data_field[2:])

        transaction["data"] = data_bytes

        max_priority_fee_per_gas, max_fee_per_gas = self._estimate_fees()
        transaction["maxPriorityFeePerGas"] = max_priority_fee_per_gas
        transaction["maxFeePerGas"] = max_fee_per_gas

        gas = self._web3.eth.estimate_gas(transaction)
        transaction["gas"] = gas

        del transaction["from"]

        return transaction

    def _estimate_fees(self, multiplier=1.2):
        """Estimate fees."""

        def get_base_fee():
            latest_block = self._web3.eth.get_block("latest")
            base_fee = latest_block["baseFeePerGas"]
            # Multiply by 1.2 to give some buffer
            return int(base_fee * multiplier)

        base_fee_per_gas = get_base_fee()
        max_priority_fee_per_gas = Web3.to_wei(0.1, "gwei")
        max_fee_per_gas = base_fee_per_gas + max_priority_fee_per_gas

        return (max_priority_fee_per_gas, max_fee_per_gas)

    def export_wallet(self) -> WalletData:
        """Export the wallet.

        Returns:
            The wallet data.

        """
        if not self._wallet:
            raise Exception("Wallet not initialized")

        return self._wallet.export_data()

    def deploy_contract(
        self,
        solidity_version: str,
        solidity_input_json: str,
        contract_name: str,
        constructor_args: dict[str, Any],
    ) -> Any:
        """Deploy a smart contract.

        Args:
            solidity_version: The version of the Solidity compiler to use
            solidity_input_json: The JSON input for the Solidity compiler
            contract_name: The name of the contract to deploy
            constructor_args: Key-value map of constructor args

        Returns:
            The deployed contract instance

        Raises:
            Exception: If wallet is not initialized or deployment fails

        """
        if not self._wallet:
            raise Exception("Wallet not initialized")

        try:
            return self._wallet.deploy_contract(
                solidity_version=solidity_version,
                solidity_input_json=solidity_input_json,
                contract_name=contract_name,
                constructor_args=constructor_args,
            )
        except Exception as e:
            raise Exception(f"Failed to deploy contract: {e!s}") from e

    def deploy_nft(self, name: str, symbol: str, base_uri: str) -> Any:
        """Deploy a new NFT (ERC-721) smart contract.

        Args:
            name: The name of the collection
            symbol: The token symbol for the collection
            base_uri: The base URI for token metadata

        Returns:
            The deployed NFT contract instance

        Raises:
            Exception: If wallet is not initialized or deployment fails

        """
        if not self._wallet:
            raise Exception("Wallet not initialized")

        try:
            return self._wallet.deploy_nft(
                name=name,
                symbol=symbol,
                base_uri=base_uri,
            )
        except Exception as e:
            raise Exception(f"Failed to deploy NFT: {e!s}") from e

    def deploy_token(self, name: str, symbol: str, total_supply: str) -> Any:
        """Deploy an ERC20 token contract.

        Args:
            name: The name of the token
            symbol: The symbol of the token
            total_supply: The total supply of the token

        Returns:
            The deployed token contract instance

        Raises:
            Exception: If wallet is not initialized or deployment fails

        """
        if not self._wallet:
            raise Exception("Wallet not initialized")

        try:
            return self._wallet.deploy_token(
                name=name,
                symbol=symbol,
                total_supply=total_supply,
            )
        except Exception as e:
            raise Exception(f"Failed to deploy token: {e!s}") from e

    def trade(self, amount: str, from_asset_id: str, to_asset_id: str) -> str:
        """Trade a specified amount of a from asset to a to asset for the wallet.

        Args:
            amount (str): The amount of the from asset to trade, e.g. `15`, `0.000001`.
            from_asset_id (str): The from asset ID to trade (e.g., "eth", "usdc", or a valid contract address).
            to_asset_id (str): The to asset ID to trade (e.g., "eth", "usdc", or a valid contract address).

        Returns:
            str: A message containing the trade details.

        Raises:
            Exception: If the trade fails or if the wallet is not initialized.

        """
        if not self._wallet:
            raise Exception("Wallet not initialized")

        try:
            trade_result = self._wallet.trade(
                amount=amount,
                from_asset_id=from_asset_id,
                to_asset_id=to_asset_id,
            ).wait()

            return "\n".join(
                [
                    f"Traded {amount} of {from_asset_id} for {trade_result.to_amount} of {to_asset_id}.",
                    f"Transaction hash for the trade: {trade_result.transaction.transaction_hash}",
                    f"Transaction link for the trade: {trade_result.transaction.transaction_link}",
                ]
            )
        except Exception as e:
            raise Exception(f"Error trading assets: {e!s}") from e
