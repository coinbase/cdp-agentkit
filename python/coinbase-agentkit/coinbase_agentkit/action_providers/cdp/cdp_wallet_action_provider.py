"""CDP wallet action provider."""

from typing import Any

from ...network import Network
from ...wallet_providers import CdpProviderConfig, CdpWalletProvider
from ..action_decorator import create_action
from ..action_provider import ActionProvider
from .constants import SOLIDITY_VERSIONS
from .schemas import DeployContractSchema, DeployNftSchema, DeployTokenSchema


class CdpWalletActionProvider(ActionProvider[CdpWalletProvider]):
    """Action provider for CDP wallet operations."""

    def __init__(self, config: CdpProviderConfig | None = None):
        """Initialize CDP wallet action provider."""
        super().__init__("cdp_wallet", [])
        self.config = config or CdpProviderConfig()

    @create_action(
        name="deploy_contract",
        description="""
Deploys smart contract with required args: solidity version (string), solidity input json (string),
contract name (string), and optional constructor args (Dict[str, Any])

Input json structure:
{"language":"Solidity","settings":{"remappings":[],"outputSelection":{"*":{"*":["abi","evm.bytecode"]}}},"sources":{}}

You must set the outputSelection to {"*":{"*":["abi","evm.bytecode"]}} in the settings.
The solidity version must be >= 0.8.0 and <= 0.8.28.

Sources should contain one or more contracts with the following structure:
{"contract_name.sol":{"content":"contract code"}}

The contract code should be escaped. Contracts cannot import from external contracts but can import from one another.

Constructor args are required if the contract has a constructor. They are a key-value
map where the key is the arg name and the value is the arg value. Encode uint/int/bytes/string/address values
as strings, boolean values as true/false. For arrays/tuples, encode based on contained type.
        """,
        schema=DeployContractSchema,
    )
    def deploy_contract(self, wallet_provider: CdpWalletProvider, args: dict[str, Any]) -> str:
        """Deploy a smart contract."""
        try:
            solidity_version = SOLIDITY_VERSIONS[args["solidity_version"]]

            contract = wallet_provider.deploy_contract(
                solidity_version=solidity_version,
                solidity_input_json=args["solidity_input_json"],
                contract_name=args["contract_name"],
                constructor_args=args.get("constructor_args", {}),
            ).wait()

            return f"Deployed contract {args['contract_name']} at address {contract.contract_address}. Transaction link: {contract.transaction.transaction_link}"
        except Exception as e:
            return f"Error deploying contract: {e!s}"

    @create_action(
        name="deploy_nft",
        description="""
This tool will deploy an NFT (ERC-721) contract onchain from the wallet.
It takes the name of the NFT collection, the symbol of the NFT collection,
and the base URI for the token metadata as inputs.
        """,
        schema=DeployNftSchema,
    )
    def deploy_nft(self, wallet_provider: CdpWalletProvider, args: dict[str, Any]) -> str:
        """Deploy an NFT collection."""
        try:
            nft_contract = wallet_provider.deploy_nft(
                name=args["name"], symbol=args["symbol"], base_uri=args["base_uri"]
            ).wait()
        except Exception as e:
            return f"Error deploying NFT {e!s}"

        return f"Deployed NFT Collection {args['name']} to address {nft_contract.contract_address} on network {wallet_provider.network_id}.\nTransaction hash for the deployment: {nft_contract.transaction.transaction_hash}\nTransaction link for the deployment: {nft_contract.transaction.transaction_link}"

    @create_action(
        name="deploy_token",
        description="""
This tool will deploy an ERC20 token smart contract. It takes the token name, symbol,
and total supply as input. The token will be deployed using the wallet's default
address as the owner and initial token holder.
        """,
        schema=DeployTokenSchema,
    )
    def deploy_token(self, wallet_provider: CdpWalletProvider, args: dict[str, Any]) -> str:
        """Deploy an ERC20 token."""
        try:
            token_contract = wallet_provider.deploy_token(
                name=args["name"], symbol=args["symbol"], total_supply=args["total_supply"]
            )
            token_contract.wait()
        except Exception as e:
            return f"Error deploying token {e!s}"

        return f"Deployed ERC20 token contract {args['name']} ({args['symbol']}) with total supply of {args['total_supply']} tokens at address {token_contract.contract_address}. Transaction link: {token_contract.transaction.transaction_link}"

    def supports_network(self, _: Network) -> bool:
        """Check if the network is supported."""
        return True


def cdp_wallet_action_provider(config: CdpProviderConfig | None = None) -> CdpWalletActionProvider:
    """Create a new CDP wallet action provider."""
    return CdpWalletActionProvider(config)
