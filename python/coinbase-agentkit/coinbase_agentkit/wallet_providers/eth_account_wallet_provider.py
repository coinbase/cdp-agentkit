from decimal import Decimal
from typing import Any

from eth_account import Account
from eth_account.datastructures import SignedTransaction
from eth_account.messages import encode_defunct
from pydantic import BaseModel
from web3 import Web3
from web3.middleware import SignAndSendRawMiddlewareBuilder
from web3.types import BlockIdentifier, ChecksumAddress, HexStr, TxParams

from ..network import Network
from .evm_wallet_provider import EvmWalletProvider


class EthAccountWalletProviderConfig(BaseModel):
    """Configuration for EthAccountWalletProvider."""

    private_key: str
    rpc_url: str
    chain_id: int


class EthAccountWalletProvider(EvmWalletProvider):
    """Implementation of EvmWalletProvider using eth-account and web3.py."""

    def __init__(self, config: EthAccountWalletProviderConfig):
        """Initialize the wallet provider with a private key and RPC URL."""
        self.config = config
        self.web3 = Web3(Web3.HTTPProvider(config.rpc_url))
        self.account = Account.from_key(config.private_key)
        self.web3.middleware_onion.inject(
            SignAndSendRawMiddlewareBuilder.build(self.account), layer=0
        )

    def get_address(self) -> str:
        """Get the wallet address."""
        return self.account.address

    def get_network(self) -> Network:
        """Get the current network."""
        return Network(
            protocol_family="evm",
            chain_id=self.config.chain_id,
            network_id=str(self.web3.net.version),
        )

    def get_balance(self) -> Decimal:
        """Get the wallet balance in native currency."""
        balance_wei = self.web3.eth.get_balance(self.account.address)
        return Decimal(str(balance_wei))

    def get_name(self) -> str:
        """Get the name of the wallet provider."""
        return "eth-account"

    def sign_message(self, message: str | bytes) -> HexStr:
        """Sign a message using the wallet's private key."""
        if isinstance(message, str):
            message = message.encode()
        message_obj = encode_defunct(message)
        signed = self.account.sign_message(message_obj)
        return HexStr(signed.signature.hex())

    def sign_typed_data(
        self, domain: dict[str, Any], types: dict[str, Any], data: dict[str, Any]
    ) -> HexStr:
        """Sign typed data according to EIP-712 standard."""
        signed = self.account.sign_typed_data(domain, types, data)
        return HexStr(signed.signature.hex())

    def sign_transaction(self, transaction: TxParams) -> SignedTransaction:
        """Sign an EVM transaction."""
        if "chainId" not in transaction:
            transaction["chainId"] = self.config.chain_id
        if "from" not in transaction:
            transaction["from"] = self.account.address

        return self.account.sign_transaction(transaction)

    def estimate_fees(self, multiplier=1.2):
        """Esimate fees."""

        def get_base_fee():
            latest_block = self.web3.eth.get_block("latest")
            base_fee = latest_block["baseFeePerGas"]
            # Multiply by 1.2 to give some buffer
            return int(base_fee * multiplier)

        base_fee_per_gas = get_base_fee()
        max_priority_fee_per_gas = Web3.to_wei(0.1, "gwei")
        max_fee_per_gas = base_fee_per_gas + max_priority_fee_per_gas

        return (max_priority_fee_per_gas, max_fee_per_gas)

    def send_transaction(self, transaction: TxParams) -> HexStr:
        """Send a signed transaction to the network."""
        transaction["from"] = self.account.address
        transaction["chainId"] = self.config.chain_id

        nonce = self.web3.eth.get_transaction_count(self.account.address)
        transaction["nonce"] = nonce

        max_priority_fee_per_gas, max_fee_per_gas = self.estimate_fees()
        transaction["maxPriorityFeePerGas"] = max_priority_fee_per_gas
        transaction["maxFeePerGas"] = max_fee_per_gas

        gas = self.web3.eth.estimate_gas(transaction)
        transaction["gas"] = gas

        hash = self.web3.eth.send_transaction(transaction)
        return Web3.to_hex(hash)

    def wait_for_transaction_receipt(
        self, tx_hash: HexStr, timeout: float = 120, poll_latency: float = 0.1
    ) -> dict[str, Any]:
        """Wait for transaction confirmation and return receipt."""
        return self.web3.eth.wait_for_transaction_receipt(
            tx_hash, timeout=timeout, poll_latency=poll_latency
        )

    def read_contract(
        self,
        contract_address: ChecksumAddress,
        abi: list[dict[str, Any]],
        function_name: str,
        args: list[Any] | None = None,
        block_identifier: BlockIdentifier = "latest",
    ) -> Any:
        """Read data from a smart contract."""
        contract = self.web3.eth.contract(address=contract_address, abi=abi)
        func = contract.functions[function_name]
        if args is None:
            args = []
        return func(*args).call(block_identifier=block_identifier)

    def native_transfer(self, to: HexStr, amount: Decimal) -> str:
        """Transfer the native asset of the network."""
        pass
