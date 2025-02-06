"""Example showing how to use AgentKit with Pyth price feeds."""

import os

from dotenv import load_dotenv

from coinbase_agentkit import (
    AgentKit,
    AgentKitOptions,
    EthAccountWalletProvider,
    EthAccountWalletProviderConfig,
    pyth_action_provider,
)


def main():
    """Run the Pyth price example."""
    # Load environment variables
    load_dotenv()

    # Get configuration from environment
    private_key = os.getenv("WALLET_PRIVATE_KEY")
    rpc_url = os.getenv("RPC_URL")
    chain_id = int(os.getenv("CHAIN_ID", "1"))

    if not all([private_key, rpc_url]):
        raise ValueError("Missing required environment variables")

    # Set up wallet provider
    wallet_config = EthAccountWalletProviderConfig(
        private_key=private_key, rpc_url=rpc_url, chain_id=chain_id
    )
    wallet_provider = EthAccountWalletProvider(wallet_config)

    # Initialize AgentKit with Pyth action provider
    options = AgentKitOptions(
        wallet_provider=wallet_provider, action_providers=[pyth_action_provider()]
    )
    agent_kit = AgentKit(options)

    try:
        # Get BTC price feed ID
        feed_id_result = agent_kit.get_actions()[0].invoke({"token_symbol": "BTC"})
        print(f"BTC Price Feed ID: {feed_id_result}")

        # Get BTC price using the feed ID
        price_result = agent_kit.get_actions()[1].invoke({"price_feed_id": feed_id_result})
        print(f"Current BTC Price: ${price_result}")

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
