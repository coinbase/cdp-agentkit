from collections.abc import Callable
from decimal import Decimal

from cdp import Asset, Wallet
from pydantic import BaseModel, Field

from cdp_agentkit_core.actions import CdpAction
from cdp_agentkit_core.actions.defi.morpho.constants import METAMORPHO_ABI
from cdp_agentkit_core.actions.defi.morpho.utils import approve


class MorphoDepositInput(BaseModel):
    """Input schema for Morpho Vault deposit action."""

    assets: str = Field(
        ...,
        description="The quantity of assets to deposit, in whole units"
    )
    receiver: str = Field(
        ...,
        description="The address that will own the position on the vault which will receive the shares"
    )
    token_address: str = Field(
        ...,
        description="The address of the assets token to approve for deposit"
    )
    vault_address: str = Field(
        ...,
        description="The address of the Morpho Vault to deposit to"
    )


DEPOSIT_PROMPT = """
This tool will deposit assets into a Morpho Vault.

With the following wallet context:
    network_id: base-sepolia
    default_address: 0x1234567890123456789012345678901234567890

An example prompt to use this tool could be:
    'please deposit 0.0005 WETH into the morpho vault located at 0xb754c2a7FF8493CE1404E5ecFDE562e8f023DEF6'

Each network will have a different token address for the asset type being requested for deposit. On base-sepolia, the token address for WETH is: 0x4200000000000000000000000000000000000006.

If the receiver is not provided, use the wallet's default address.

Do not convert assets to atmoic units.

A successful response will return a message in the following format:
    'Deposited {assets} to Morpho Vault {vault_address} with transaction hash: {contract_invocation.transaction_hash} and transaction link: {contract_invocation.transaction_link}'

A failure response will return a message in the following format:
    'Error depositing to Morpho Vault: {e!s}'
"""


def deposit_to_morpho(
    wallet: Wallet,
    vault_address: str,
    assets: str,
    receiver: str,
    token_address: str,
) -> str:
    """Deposit assets into a Morpho Vault.

    Args:
        wallet (Wallet): The wallet to execute the deposit from
        vault_address (str): The address of the Morpho Vault
        assets (str): The amount of assets to deposit in whole units (e.g., 0.01 WETH)
        receiver (str): The address to receive the shares
        token_address (str): The address of the token to approve

    Returns:
        str: A success message with transaction hash or error message

    """
    if float(assets) <= 0:
        return "Error: Assets amount must be greater than 0"

    try:
        token_asset = Asset.fetch(wallet.network_id, token_address)

        atomic_assets = str(int(token_asset.to_atomic_amount(Decimal(assets))))

        approval_result = approve(wallet, token_address, vault_address, atomic_assets)
        if approval_result.startswith("Error"):
            return f"Error approving Morpho Vault as spender: {approval_result}"

        deposit_args = {"assets": atomic_assets, "receiver": receiver}

        invocation = wallet.invoke_contract(
            contract_address=vault_address,
            method="deposit",
            abi=METAMORPHO_ABI,
            args=deposit_args,
        ).wait()

        return f"Deposited {assets} to Morpho Vault {vault_address} with transaction hash: {invocation.transaction_hash} and transaction link: {invocation.transaction_link}"

    except Exception as e:
        return f"Error depositing to Morpho Vault: {e!s}"


class MorphoDepositAction(CdpAction):
    """Morpho Vault deposit action."""

    name: str = "morpho_deposit"
    description: str = DEPOSIT_PROMPT
    args_schema: type[BaseModel] = MorphoDepositInput
    func: Callable[..., str] = deposit_to_morpho
