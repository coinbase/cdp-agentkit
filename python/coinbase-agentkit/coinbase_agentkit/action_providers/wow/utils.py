"""Utility functions for WOW action provider."""


from ...wallet_providers import EvmWalletProvider
from .constants import WOW_ABI, WOW_FACTORY_CONTRACT_ADDRESSES


def get_has_graduated(wallet: EvmWalletProvider, token_address: str) -> bool:
    """Check if a token has graduated from the WOW protocol.

    Args:
        wallet: The wallet provider to use for contract calls
        token_address: The token contract address

    Returns:
        True if the token has graduated, False otherwise

    """
    market_type = wallet.read_contract(
        contract_address=token_address,
        abi=WOW_ABI,
        function_name="marketType",
        args=[],
    )
    return market_type == 1


def get_buy_quote(
    wallet: EvmWalletProvider,
    token_address: str,
    amount_eth_in_wei: str
) -> str:
    """Get quote for buying tokens.

    Args:
        wallet: The wallet provider to use for contract calls
        token_address: The token contract address
        amount_eth_in_wei: Amount of ETH to spend (in wei)

    Returns:
        The buy quote amount

    Raises:
        NotImplementedError: If the token has graduated and requires Uniswap quote logic

    """
    has_graduated = get_has_graduated(wallet, token_address)

    if has_graduated:
        # TODO: Implement Uniswap quote logic
        raise NotImplementedError("Uniswap quote not implemented yet")

    token_quote = wallet.read_contract(
        contract_address=token_address,
        abi=WOW_ABI,
        function_name="getEthBuyQuote",
        args=[amount_eth_in_wei],
    )

    return str(token_quote)


def get_sell_quote(
    wallet: EvmWalletProvider,
    token_address: str,
    amount_tokens_in_wei: str
) -> str:
    """Get quote for selling tokens.

    Args:
        wallet: The wallet provider to use for contract calls
        token_address: The token contract address
        amount_tokens_in_wei: Amount of tokens to sell (in wei)

    Returns:
        The sell quote amount

    Raises:
        NotImplementedError: If the token has graduated and requires Uniswap quote logic

    """
    has_graduated = get_has_graduated(wallet, token_address)

    if has_graduated:
        # TODO: Implement Uniswap quote logic
        raise NotImplementedError("Uniswap quote not implemented yet")

    token_quote = wallet.read_contract(
        contract_address=token_address,
        abi=WOW_ABI,
        function_name="getTokenSellQuote",
        args=[amount_tokens_in_wei],
    )

    return str(token_quote)


def get_factory_address(network_id: str) -> str:
    """Get the WOW factory contract address for the given network.

    Args:
        network_id: The network ID to get the factory address for

    Returns:
        The factory contract address

    Raises:
        ValueError: If the network is not supported

    """
    normalized_network = network_id.lower()
    if normalized_network not in WOW_FACTORY_CONTRACT_ADDRESSES:
        raise ValueError(
            f"Invalid network: {network_id}. Valid networks are: "
            f"{', '.join(WOW_FACTORY_CONTRACT_ADDRESSES.keys())}"
        )
    return WOW_FACTORY_CONTRACT_ADDRESSES[normalized_network]
