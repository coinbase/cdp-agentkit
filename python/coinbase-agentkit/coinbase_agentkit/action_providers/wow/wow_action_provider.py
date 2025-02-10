"""WOW action provider implementation."""
import json
from decimal import Decimal
from typing import Any

from eth_account.datastructures import SignedTransaction
from eth_typing import HexStr
from web3 import Web3
from web3.types import BlockIdentifier, ChecksumAddress, HexStr, TxParams

from ...network import Network
from ...wallet_providers import EvmWalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider
from .constants import (
    GENERIC_TOKEN_METADATA_URI,
    SUPPORTED_NETWORKS,
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
  - Base Sepolia (ie, 'base-sepolia')
  - Base Mainnet (ie, 'base', 'base-mainnet')""",
        schema=WowBuyTokenInput,
    )
    def buy_token(self, wallet: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Buy WOW tokens with ETH."""
        try:
            # Get quote and check graduation status
            token_quote = get_buy_quote(wallet, args["contract_address"], args["amount_eth_in_wei"])
            has_graduated = get_has_graduated(wallet, args["contract_address"])

            # Calculate minimum tokens (99% of quote for slippage protection)
            min_tokens = int(int(token_quote) * 99 / 100)

            # Create contract instance
            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(args["contract_address"]),
                abi=WOW_ABI
            )

            # Encode function data
            encoded_data = contract.encodeABI(
                fn_name="buy",
                args=[
                    wallet.get_address(),
                    wallet.get_address(),
                    "0x0000000000000000000000000000000000000000",
                    "",
                    1 if has_graduated else 0,
                    min_tokens,
                    0,
                ]
            )

            # Send transaction
            tx_hash = wallet.send_transaction({
                "to": Web3.to_checksum_address(args["contract_address"]),
                "data": encoded_data,
                "value": int(args["amount_eth_in_wei"]),
            })
            receipt = wallet.wait_for_transaction_receipt(tx_hash)

            return (
                f"Purchased WoW ERC20 memecoin with transaction hash: {tx_hash}, "
                f"and receipt:\n{json.dumps(receipt)}"
            )
        except Exception as e:
            return f"Error buying Zora Wow ERC20 memecoin: {str(e)}"

    @create_action(
        name="create_token",
        description="""
This tool can only be used to create a Zora Wow ERC20 memecoin (also can be referred to as a bonding curve token) using the WoW factory.
Do not use this tool for any other purpose, or for creating other types of tokens.

Inputs:
- Token name (e.g. WowCoin)
- Token symbol (e.g. WOW) 
- Token URI (optional) - Contains metadata about the token

Important notes:
- Uses a bonding curve - no upfront liquidity needed
- Only supported on the following networks:
  - Base Sepolia (ie, 'base-sepolia')
  - Base Mainnet (ie, 'base', 'base-mainnet')""",
        schema=WowCreateTokenInput,
    )
    def create_token(self, wallet: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Create a new WOW token."""
        try:
            factory_address = get_factory_address(wallet.get_network().network_id)

            # Create contract instance
            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(factory_address),
                abi=WOW_FACTORY_ABI
            )

            # Encode function data
            encoded_data = contract.encodeABI(
                fn_name="deploy",
                args=[
                    wallet.get_address(),
                    "0x0000000000000000000000000000000000000000",
                    args.get("token_uri", GENERIC_TOKEN_METADATA_URI),
                    args["name"],
                    args["symbol"],
                ]
            )

            # Send transaction
            tx_hash = wallet.send_transaction({
                "to": Web3.to_checksum_address(factory_address),
                "data": encoded_data,
            })
            receipt = wallet.wait_for_transaction_receipt(tx_hash)

            return (
                f"Created WoW ERC20 memecoin {args['name']} with symbol {args['symbol']} "
                f"on network {wallet.get_network().network_id}.\n"
                f"Transaction hash for the token creation: {tx_hash}, "
                f"and receipt:\n{json.dumps(receipt)}"
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
- Minimum purchase amount is 100000000000000 wei (0.0000001 ETH)
- Only supported on the following networks:
  - Base Sepolia (ie, 'base-sepolia')
  - Base Mainnet (ie, 'base', 'base-mainnet')""",
        schema=WowSellTokenInput,
    )
    def sell_token(self, wallet: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Sell WOW tokens for ETH."""
        try:
            # Get quote and check graduation status
            eth_quote = get_sell_quote(wallet, args["contract_address"], args["amount_tokens_in_wei"])
            has_graduated = get_has_graduated(wallet, args["contract_address"])

            # Calculate minimum ETH (98% of quote for slippage protection)
            min_eth = int(int(eth_quote) * 98 / 100)

            # Create contract instance
            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(args["contract_address"]),
                abi=WOW_ABI
            )

            # Encode function data
            encoded_data = contract.encodeABI(
                fn_name="sell",
                args=[
                    int(args["amount_tokens_in_wei"]),
                    wallet.get_address(),
                    "0x0000000000000000000000000000000000000000",
                    "",
                    1 if has_graduated else 0,
                    min_eth,
                    0,
                ]
            )

            # Send transaction
            tx_hash = wallet.send_transaction({
                "to": Web3.to_checksum_address(args["contract_address"]),
                "data": encoded_data,
            })
            receipt = wallet.wait_for_transaction_receipt(tx_hash)

            return (
                f"Sold WoW ERC20 memecoin with transaction hash: {tx_hash}, "
                f"and receipt:\n{json.dumps(receipt)}"
            )
        except Exception as e:
            return f"Error selling Zora Wow ERC20 memecoin: {str(e)}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by WOW protocol."""
        return (
            network.protocol_family == "evm" 
            and network.network_id in SUPPORTED_NETWORKS
        )

def wow_action_provider() -> WowActionProvider:
    """Create a new WowActionProvider instance."""
    return WowActionProvider()
