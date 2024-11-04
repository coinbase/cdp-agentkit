"""Util that calls CDP."""

import json
from typing import Any

from langchain_core.utils import get_from_dict_or_env
from pydantic import BaseModel, model_validator

from cdp_agentkit_core.actions import (
    deploy_nft,
    deploy_token,
    get_balance,
    get_wallet_details,
    mint_nft,
    register_basename,
    request_faucet_funds,
    trade,
    transfer,
)


class CdpAgentkitWrapper(BaseModel):
    """Wrapper for CDP Agentkit Core."""

    wallet: Any = None  #: :meta private:
    cdp_api_key_name: str | None = None
    cdp_api_key_private_key: str | None = None
    network_id: str | None = None

    @model_validator(mode="before")
    @classmethod
    def validate_environment(cls, values: dict) -> Any:
        """Validate that CDP API Key and python package exists in the environment and configure the CDP SDK."""
        cdp_api_key_name = get_from_dict_or_env(values, "cdp_api_key_name", "CDP_API_KEY_NAME")
        cdp_api_key_private_key = get_from_dict_or_env(
            values, "cdp_api_key_private_key", "CDP_API_KEY_PRIVATE_KEY"
        )
        network_id = get_from_dict_or_env(values, "network_id", "NETWORK_ID", "base-sepolia")
        wallet_data_json = values.get("cdp_wallet_data")

        try:
            from cdp import Cdp, Wallet, WalletData
        except Exception:
            raise ImportError(
                "CDP SDK is not installed. " "Please install it with `pip install cdp-sdk`"
            ) from None

        Cdp.configure(cdp_api_key_name, cdp_api_key_private_key)

        if wallet_data_json:
            wallet_data = WalletData.from_dict(json.loads(wallet_data_json))
            wallet = Wallet.import_data(wallet_data)
        else:
            wallet = Wallet.create(network_id=network_id)

        values["wallet"] = wallet
        values["cdp_api_key_name"] = cdp_api_key_name
        values["cdp_api_key_private_key"] = cdp_api_key_private_key
        values["network_id"] = network_id

        return values

    def export_wallet(self) -> dict[str, str]:
        """Export wallet data required to re-instantiate the wallet.

        Returns:
            str: The json string of wallet data including the wallet_id and seed.

        """
        wallet_data_dict = self.wallet.export_data().to_dict()
        return json.dumps(wallet_data_dict)

    def get_wallet_details_wrapper(self) -> str:
        """Get details about the MPC Wallet by wrapping call to CDP Agentkit Core."""
        return get_wallet_details(self.wallet)

    def get_balance_wrapper(self, asset_id: str) -> str:
        """Get balance for the wallet by wrapping call to CDP Agentkit Core.

        Args:
            asset_id (str): The asset ID of the asset

        """
        return get_balance(wallet=self.wallet, asset_id=asset_id)

    def request_faucet_funds_wrapper(self, asset_id: str | None = None) -> str:
        """Request test tokens from the faucet for the default address in the wallet.

        Args:
            asset_id (str | None): The optional asset ID to request from the faucet. Accepts "eth" or "usdc". When omitted, defaults to the network's native asset.

        """
        return request_faucet_funds(wallet=self.wallet, asset_id=asset_id if asset_id else None)

    def transfer_wrapper(
        self, amount: str, asset_id: str, destination: str, gasless: bool = False
    ) -> str:
        """Transfer an amount of an asset from the wallet by wrapping call to CDP Agentkit Core.

        Args:
            amount (str): The amount of the asset to transfer, e.g. `15`, `0.000001`.
            wallet (Wallet): The wallet to transfer the asset from.
            asset_id (str): The asset ID to transfer (e.g., "eth", "usdc", or a valid contract address like "0x036CbD53842c5426634e7929541eC2318f3dCF7e").
            destination (str): The destination to transfer the funds (e.g. `0x58dBecc0894Ab4C24F98a0e684c989eD07e4e027`, `example.eth`, `example.base.eth`).
            gasless (bool): Whether to send a gasless transfer (Defaults to False.).

        """
        return transfer(
            wallet=self.wallet,
            amount=amount,
            asset_id=asset_id,
            destination=destination,
            gasless=gasless,
        )

    def trade_wrapper(self, amount: str, from_asset_id: str, to_asset_id: str) -> str:
        """Trade a specified amount of a from asset to a to asset for the wallet. Trades are only supported on Mainnets.

        Args:
            amount (str): The amount of the from asset to trade, e.g. `15`, `0.000001`.
            from_asset_id (str): The from asset ID to trade (e.g., "eth", "usdc", or a valid contract address like "0x036CbD53842c5426634e7929541eC2318f3dCF7e").
            to_asset_id (str): The from asset ID to trade (e.g., "eth", "usdc", or a valid contract address like "0x036CbD53842c5426634e7929541eC2318f3dCF7e").

        Returns:
            str: A message containing the trade details.

        """
        return trade(
            wallet=self.wallet,
            amount=amount,
            from_asset_id=from_asset_id,
            to_asset_id=to_asset_id,
        )

    def deploy_token_wrapper(self, name: str, symbol: str, total_supply: str) -> str:
        """Deploy an ERC20 token smart contract.

        Args:
            name (str): The name of the token (e.g., "My Token").
            symbol (str): The token symbol (e.g., "USDC", "MEME", "SYM").
            total_supply (str): The total supply of tokens to mint (e.g., "1000000").

        Returns:
            str: A message containing the deployed token contract address and details

        """
        return deploy_token(
            wallet=self.wallet,
            name=name,
            symbol=symbol,
            total_supply=total_supply,
        )

    def mint_nft_wrapper(self, contract_address: str, destination: str) -> str:
        """Mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation.

        Args:
            contract_address (str): The contract address of the NFT (ERC-721) to mint, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`.
            destination (str): The destination address that will receieve the NFT onchain, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`.

        Returns:
            str: A message containing the NFT mint details.

        """
        return mint_nft(
            wallet=self.wallet,
            contract_address=contract_address,
            destination=destination,
        )

    def deploy_nft_wrapper(self, name: str, symbol: str, base_uri: str) -> str:
        """Deploy an NFT (ERC-721) token collection onchain from the wallet.

        Args:
            name (str): The name of the NFT (ERC-721) token collection to deploy, e.g. `Helpful Hippos`.
            symbol (str): The symbol of the NFT (ERC-721) token collection to deploy, e.g. `HIPPO`.
            base_uri (str): The base URI for the NFT (ERC-721) token collection's metadata, e.g. `https://www.helpfulhippos.xyz/metadata/`.

        Returns:
            str: A message containing the NFT token deployment details.

        """
        return deploy_nft(
            wallet=self.wallet,
            name=name,
            symbol=symbol,
            base_uri=base_uri,
        )

    def register_basename_wrapper(self, basename: str, amount: float | None = 0.02) -> str:
        """Register a basename for the wallet by wrapping call to CDP Agentkit Core.

        Args:
            basename (str): The basename to register for the wallet's default address. e.g. `exampleName.base.eth` for `base-mainnet` or `exampleName.basetest.eth` for `base-sepolia` testnet.
            amount (float | None): The amount of ETH to pay for the registration. The default is set to 0.002.

        Returns:
            str: A confirmation message with the registered basename.

        """
        return register_basename(wallet=self.wallet, basename=basename)

    def run(self, mode: str, **kwargs) -> str:
        """Run the action via the CDP Agentkit."""
        if mode == "get_wallet_details":
            return self.get_wallet_details_wrapper()
        elif mode == "get_balance":
            return self.get_balance_wrapper(**kwargs)
        elif mode == "request_faucet_funds":
            return self.request_faucet_funds_wrapper(**kwargs)
        elif mode == "transfer":
            return self.transfer_wrapper(**kwargs)
        elif mode == "trade":
            return self.trade_wrapper(**kwargs)
        elif mode == "deploy_token":
            return self.deploy_token_wrapper(**kwargs)
        elif mode == "mint_nft":
            return self.mint_nft_wrapper(**kwargs)
        elif mode == "deploy_nft":
            return self.deploy_nft_wrapper(**kwargs)
        elif mode == "register_basename":
            return self.register_basename_wrapper(**kwargs)
        else:
            raise ValueError("Invalid mode" + mode)
