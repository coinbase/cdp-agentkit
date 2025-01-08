import json
import sys

# Import CDP Agentkit Langchain Extension.
from cdp_langchain.utils import CdpAgentkitWrapper


def initialize_agentkit():
    """Initialize the CDP Agentkit

    Returns:
        tuple: Agent executor and config

    """
    config = {}
    agentkit = CdpAgentkitWrapper(**config)

    return agentkit, config


def main():
    """Import wallet and display its details."""
    print("initializing agentkit...")
    agentkit, config = initialize_agentkit()

    wallet_data = agentkit.export_wallet()

    print("ensuring wallet...")
    wallet = json.loads(wallet_data)

    print("wallet Id:", wallet["wallet_id"])
    print("wallet address:", wallet["default_address_id"])
    print("wallet network:", wallet["network_id"])
    print("wallet seed:", wallet["seed"])


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print("Fatal error:", str(error))
        sys.exit(1)
