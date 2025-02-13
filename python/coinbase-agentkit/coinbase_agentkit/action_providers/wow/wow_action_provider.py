"""WOW action provider."""

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
from .schemas import WowBuyTokenSchema, WowCreateTokenSchema, WowSellTokenSchema
from .utils import (
    get_buy_quote,
    get_factory_address,
    get_has_graduated,
    get_sell_quote,
)

SUPPORTED_CHAINS = [8453, 84532]


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
- Minimum purchase amount is 100000000000000 wei (0.0000001 ETH)""",
        schema=WowBuyTokenSchema,
    )
    def buy_token(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Buy WOW tokens with ETH by calling the buy function on the WOW contract.

        This function buys WOW tokens with ETH by calling the buy function on the WOW smart contract.
        It handles getting the buy quote, checking graduation status, encoding the buy call data,
        and submitting/waiting for the transaction.

        Args:
            wallet_provider (EvmWalletProvider): The wallet provider to buy tokens from,
                used to sign and send the transaction
            args (dict[str, Any]): Arguments containing:
                - contract_address (str): The address of the WOW token contract
                - amount_eth_in_wei (str): The amount of ETH to spend in wei

        Returns:
            str: A message containing either:
                - The purchase details and transaction hash if successful
                - An error message if the purchase fails

        Raises:
            Exception: If the purchase transaction fails for any reason

        """
        try:
            token_quote = get_buy_quote(
                wallet_provider, args["contract_address"], args["amount_eth_in_wei"]
            )

            if isinstance(token_quote, list | tuple):
                token_quote = token_quote[0] if token_quote else 0
            token_quote = int(token_quote)

            has_graduated = get_has_graduated(wallet_provider, args["contract_address"])

            min_tokens = math.floor(float(token_quote) * 0.99)

            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(args["contract_address"]), abi=WOW_ABI
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
                ],
            )

            tx_hash = wallet_provider.send_transaction(
                {
                    "to": Web3.to_checksum_address(args["contract_address"]),
                    "data": encoded_data,
                    "value": int(args["amount_eth_in_wei"]),
                }
            )
            receipt = wallet_provider.wait_for_transaction_receipt(tx_hash)

            if receipt["status"] == 0:
                return (
                    f"Transaction failed with hash: {tx_hash}. The transaction failed to execute."
                )

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
        schema=WowCreateTokenSchema,
    )
    def create_token(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Create a new WOW token using the WOW factory contract.

        Args:
            wallet_provider (EvmWalletProvider): Provider for wallet operations and network access
            args (dict[str, Any]): Arguments containing:
                - name (str): Name of the token to create
                - symbol (str): Symbol for the token
                - token_uri (str, optional): URI containing token metadata. Uses default if not provided

        Returns:
            str: Success message with transaction details or error message if creation fails

        Raises:
            Exception: If there are any errors during token creation process

        """
        try:
            factory_address = get_factory_address(wallet_provider.get_network().chain_id)

            if not Web3.is_address(factory_address):
                return f"Invalid factory address: {factory_address}"

            token_uri = args.get("token_uri") or GENERIC_TOKEN_METADATA_URI

            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(factory_address), abi=WOW_FACTORY_ABI
            )

            creator_address = wallet_provider.get_address()
            deploy_args = [
                Web3.to_checksum_address(creator_address),
                Web3.to_checksum_address("0x0000000000000000000000000000000000000000"),
                token_uri,
                args["name"],
                args["symbol"],
            ]

            encoded_data = contract.encode_abi("deploy", deploy_args)

            tx = {
                "to": factory_address,
                "data": encoded_data,
            }

            tx_hash = wallet_provider.send_transaction(tx)

            receipt = wallet_provider.wait_for_transaction_receipt(tx_hash)
            if receipt["status"] == 0:
                return (
                    f"Transaction failed with hash: {tx_hash}. The transaction failed to execute."
                )

            return (
                f"Created WoW ERC20 memecoin {args['name']} "
                f"with symbol {args['symbol']} "
                f"on network {wallet_provider.get_network().network_id}.\n"
                f"Transaction hash for the token creation: {tx_hash}"
            )
        except Exception as e:
            return f"Error creating Zora Wow ERC20 memecoin: {e!s}"

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
- Minimum purchase amount to account for slippage is 100000000000000 wei (0.0000001 ETH)""",
        schema=WowSellTokenSchema,
    )
    def sell_token(self, wallet_provider: EvmWalletProvider, args: dict[str, Any]) -> str:
        """Sell WOW tokens for ETH using the WOW protocol.

        This function sells WOW tokens for ETH by calling the sell function on the WOW token contract.
        It handles getting the sell quote, checking graduation status, encoding the sell data, and
        submitting/waiting for the transaction.

        Args:
            wallet_provider (EvmWalletProvider): The wallet provider to sell tokens from,
                used to sign and send the transaction
            args (dict[str, Any]): Arguments containing:
                - contract_address (str): The address of the WOW token contract
                - amount_tokens_in_wei (str): The amount of tokens to sell in wei

        Returns:
            str: A message containing either:
                - The sell details and transaction hash if successful
                - An error message if the sell fails

        Raises:
            Exception: If the sell transaction fails for any reason

        """
        try:
            eth_quote = get_sell_quote(
                wallet_provider, args["contract_address"], args["amount_tokens_in_wei"]
            )

            if isinstance(eth_quote, list | tuple):
                eth_quote = eth_quote[0] if eth_quote else 0
            eth_quote = int(eth_quote)

            has_graduated = get_has_graduated(wallet_provider, args["contract_address"])

            min_eth = math.floor(float(eth_quote) * 0.98)

            contract = Web3().eth.contract(
                address=Web3.to_checksum_address(args["contract_address"]), abi=WOW_ABI
            )

            encoded_data = contract.encode_abi(
                "sell",
                [
                    int(args["amount_tokens_in_wei"]),
                    wallet_provider.get_address(),
                    "0x0000000000000000000000000000000000000000",
                    "",
                    1 if has_graduated else 0,
                    min_eth,
                    0,
                ],
            )

            tx_hash = wallet_provider.send_transaction(
                {
                    "to": Web3.to_checksum_address(args["contract_address"]),
                    "data": encoded_data,
                }
            )

            receipt = wallet_provider.wait_for_transaction_receipt(tx_hash)
            if receipt["status"] == 0:
                return (
                    f"Transaction failed with hash: {tx_hash}. The transaction failed to execute."
                )

            return f"Sold WoW ERC20 memecoin with transaction hash: {tx_hash}"
        except Exception as e:
            return f"Error selling Zora Wow ERC20 memecoin: {e!s}"

    def supports_network(self, network: Network) -> bool:
        """Check if network is supported by WOW protocol."""
        return network.protocol_family == "evm" and network.chain_id in SUPPORTED_CHAINS


def wow_action_provider() -> WowActionProvider:
    """Create a new WowActionProvider instance."""
    return WowActionProvider()
