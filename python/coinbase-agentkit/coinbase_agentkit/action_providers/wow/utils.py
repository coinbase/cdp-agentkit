from web3 import Web3

from ...wallet_providers import EvmWalletProvider
from ..uniswap.utils import get_has_graduated, get_uniswap_quote
from .constants import WOW_ABI, WOW_FACTORY_CONTRACT_ADDRESSES


def get_factory_address(chain_id: int) -> str:
    """Get the WOW factory contract address for a given chain ID.

    Args:
        chain_id: Chain ID (8453 for Base Mainnet, 84532 for Base Sepolia)

    Returns:
        str: The factory contract address for the given chain
    """
    network_id = "base-mainnet" if chain_id == 8453 else "base-sepolia"
    return WOW_FACTORY_CONTRACT_ADDRESSES[network_id]


def get_current_supply(wallet_provider: EvmWalletProvider, token_address: str) -> int:
    """Get the current supply of a token.

    Args:
        wallet_provider: The wallet provider to use for contract calls
        token_address: Address of the token contract, such as `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

    Returns:
        int: The current total supply of the token
    """
    return wallet_provider.read_contract(
        contract_address=token_address,
        abi=WOW_ABI,
        function_name="totalSupply",
        args=[],
    )


def get_buy_quote(wallet_provider: EvmWalletProvider, token_address: str, amount_eth_in_wei: str) -> int:
    """Get quote for buying tokens.

    Args:
        wallet_provider: The wallet provider to use for contract calls
        token_address: Address of the token contract, such as `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
        amount_eth_in_wei: Amount of ETH to buy (in wei), meaning 1 is 1 wei or 0.000000000000000001 of ETH

    Returns:
        int: The amount of tokens that would be received for the given ETH amount
    """
    has_graduated = get_has_graduated(wallet_provider, token_address)
    
    token_quote = (
        has_graduated
        and (get_uniswap_quote(wallet_provider, token_address, amount_eth_in_wei, "buy")).amount_out
    ) or wallet_provider.read_contract(
        contract_address=token_address,
        abi=WOW_ABI,
        function_name="getEthBuyQuote",
        args=[amount_eth_in_wei],
    )
    return token_quote


def get_sell_quote(wallet_provider: EvmWalletProvider, token_address: str, amount_tokens_in_wei: str) -> int:
    """Get quote for selling tokens.

    Args:
        wallet_provider: The wallet provider to use for contract calls
        token_address: Address of the token contract, such as `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
        amount_tokens_in_wei: Amount of tokens to sell (in wei), meaning 1 is 1 wei or 0.000000000000000001 of the token

    Returns:
        int: The amount of ETH that would be received for the given token amount
    """
    has_graduated = get_has_graduated(wallet_provider, token_address)
    
    token_quote = (
        has_graduated
        and (get_uniswap_quote(wallet_provider, token_address, amount_tokens_in_wei, "sell")).amount_out
    ) or wallet_provider.read_contract(
        contract_address=token_address,
        abi=WOW_ABI,
        function_name="getTokenSellQuote",
        args=[amount_tokens_in_wei],
    )
    return token_quote
