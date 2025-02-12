"""WOW action provider implementation."""
import json
import math
from typing import Any

from web3 import Web3

from ...network import Network
from ...wallet_providers import EvmWalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider
from .constants import (
    GENERIC_TOKEN_METADATA_URI,
    WOW_ABI,
    WOW_FACTORY_ABI,
)
from .schemas import WowBuyTokenInput, WowCreateTokenInput, WowSellTokenInput
from .utils import (
    get_buy_quote,
    get_factory_address,
    get_has_graduated,
    get_sell_quote,
)


SUPPORTED_CHAINS = [8453, 84532]  # Base Mainnet and Base Sepolia chain IDs

class WowActionProvider(ActionProvider[EvmWalletProvider]):
    """Provides actions for interacting with WOW protocol."""

    def __init__(self):
        """Initialize WOW action provider."""
        super().__init__("wow", [])

    @create_action(
        name="buy_token",
        description="""
This tool can only be used to buy a Zora Wow ERC20 memecoin (also can be referred to as a bonding curve token) with ETH.
Do not use this tool for any other purpose, or trading other assets.

Inputs:
- WOW token contract address
- Amount of ETH to spend (in wei)

Important notes:
- The amount is a string and cannot have any decimal points, since the unit of measurement is wei.
- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action.
- 1 wei = 0.000000000000000001 ETH
- Minimum purchase amount is 100000000000000 wei (0.0000001 ETH)
- Only supported on the following networks:
  - Base Sepolia(84532) (ie, 'base-sepolia')
  - Base Mainnet(8453) (ie, 'base', 'base-mainnet')""",
        schema=WowBuyTokenInput,
    )
    def buy_token(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Buy WOW tokens with ETH."""
        try:
            validated_args = WowBuyTokenInput(**args)
            token_quote = get_buy_quote(wallet_provider, validated_args.contract_address, validated_args.amount_eth_in_wei)
            has_graduated = get_has_graduated(wallet_provider, validated_args.contract_address)

            min_tokens = math.floor(float(token_quote) * 0.99)

            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(validated_args.contract_address),
                abi=WOW_ABI
            )

            encoded_data = contract.encode_abi(
                "buy",
                [
                    wallet_provider.get_address(),
                    wallet_provider.get_address(),
                    "0x0000000000000000000000000000000000000000",
                    "",
                    1 if has_graduated else 0,
                    min_tokens,
                    0,
                ]
            )

            tx_hash = wallet_provider.send_transaction({
                "to": Web3.to_checksum_address(validated_args.contract_address),
                "data": encoded_data,
                "value": int(validated_args.amount_eth_in_wei),
            })
            receipt = wallet_provider.wait_for_transaction_receipt(tx_hash)
            
            if receipt["status"] == 0:
                return f"Transaction failed with hash: {tx_hash}. The transaction was mined but failed to execute."

            return f"Purchased WoW ERC20 memecoin with transaction hash: {tx_hash}"
        except Exception as e:
            return f"Error buying Zora Wow ERC20 memecoin: {e!s}"

    @create_action(
        name="create_token",
        description="""
This tool can only be used to create a Zora Wow ERC20 memecoin (also can be referred to as a bonding curve token) using the WOW factory.
Do not use this tool for any other purpose, or for creating other types of tokens.

Inputs:
- Token name (e.g. WowCoin)
- Token symbol (e.g. WOW)
- Token URI (optional) - Contains metadata about the token

Important notes:
- Uses a bonding curve - no upfront liquidity needed""",
        schema=WowCreateTokenInput,
    )
    def create_token(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Create a new WOW token."""
        try:
            validated_args = WowCreateTokenInput(**args)
            factory_address = get_factory_address(wallet_provider.get_network().chain_id)
            print(f"Using factory address: {factory_address}")

            # Validate factory address
            if not Web3.is_address(factory_address):
                return f"Invalid factory address: {factory_address}"

            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(factory_address),
                abi=WOW_FACTORY_ABI
            )

            # Prepare arguments
            creator_address = wallet_provider.get_address()
            token_uri = validated_args.token_uri or GENERIC_TOKEN_METADATA_URI
            deploy_args = [
                creator_address,  # _tokenCreator
                "0x0000000000000000000000000000000000000000",  # _platformReferrer
                token_uri,  # _tokenURI
                validated_args.name,  # _name
                validated_args.symbol,  # _symbol
            ]
            print(f"Deploy arguments: {deploy_args}")

            encoded_data = contract.encode_abi(
                "deploy",
                deploy_args
            )

            # Prepare transaction
            tx = {
                "to": Web3.to_checksum_address(factory_address),
                "data": encoded_data,
            }
            print(f"Transaction data: {tx}")

            tx_hash = wallet_provider.send_transaction(tx)
            print(f"Transaction hash: {tx_hash}")

            receipt = wallet_provider.wait_for_transaction_receipt(tx_hash)
            if receipt["status"] == 0:
                # Try to get more detailed error information
                try:
                    # Simulate the transaction to get the revert reason
                    wallet_provider.read_contract(
                        contract_address=factory_address,
                        abi=WOW_FACTORY_ABI,
                        function_name="deploy",
                        args=deploy_args
                    )
                except Exception as sim_error:
                    return f"Transaction failed: {str(sim_error)}"
                return f"Transaction failed with hash: {tx_hash}. The transaction was mined but failed to execute."

            return (
                f"Created WoW ERC20 memecoin {validated_args.name} "
                f"with symbol {validated_args.symbol} "
                f"at contract address {receipt['contractAddress']}\n"
                f"on network {wallet_provider.get_network().network_id}.\n"
                f"Transaction hash: {tx_hash}"
            )
        except Exception as e:
            return f"Error creating Zora Wow ERC20 memecoin: {str(e)}"

    @create_action(
        name="sell_token",
        description="""
This tool can only be used to sell a Zora Wow ERC20 memecoin (also can be referred to as a bonding curve token) for ETH.
Do not use this tool for any other purpose, or trading other assets.

Inputs:
- WOW token contract address
- Amount of tokens to sell (in wei)

Important notes:
- The amount is a string and cannot have any decimal points, since the unit of measurement is wei.
- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action.
- 1 wei = 0.000000000000000001 ETH
- Minimum purchase amount to account for slippage is 100000000000000 wei (0.0000001 ETH)
- Only supported on the following networks:
  - Base Sepolia(chainid: 84532) (ie, 'base-sepolia')
  - Base Mainnet(chainid: 8453) (ie, 'base', 'base-mainnet')""",
        schema=WowSellTokenInput,
    )
    def sell_token(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Sell WOW tokens for ETH."""
        try:
            validated_args = WowSellTokenInput(**args)
            eth_quote = get_sell_quote(wallet_provider, validated_args.contract_address, validated_args.amount_tokens_in_wei)
            has_graduated = get_has_graduated(wallet_provider, validated_args.contract_address)

            min_eth = math.floor(float(eth_quote) * 0.98)

            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(validated_args.contract_address),
                abi=WOW_ABI
            )

            encoded_data = contract.encode_abi(
                "sell",
                [
                    int(validated_args.amount_tokens_in_wei),
                    wallet_provider.get_address(),
                    "0x0000000000000000000000000000000000000000",
                    "",
                    1 if has_graduated else 0,
                    min_eth,
                    0,
                ]
            )

            tx_hash = wallet_provider.send_transaction({
                "to": Web3.to_checksum_address(validated_args.contract_address),
                "data": encoded_data,
            })

            receipt = wallet_provider.wait_for_transaction_receipt(tx_hash)
            if receipt["status"] == 0:
                return f"Transaction failed with hash: {tx_hash}. The transaction was mined but failed to execute."

            return f"Sold WoW ERC20 memecoin with transaction hash: {tx_hash}"
        except Exception as e:
            return f"Error selling Zora Wow ERC20 memecoin: {e!s}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by WOW protocol."""
        return True
        # return (
        #     network.protocol_family == "evm"
        #     and network.chain_id in SUPPORTED_CHAINS
        # )


def wow_action_provider() -> WowActionProvider:
    """Create a new WowActionProvider instance."""
    return WowActionProvider()
