from cdp_agentkit_core.actions.cdp_action import CdpAction
from cdp_agentkit_core.actions.deploy_nft import DeployNftAction
from cdp_agentkit_core.actions.deploy_token import DeployTokenAction
from cdp_agentkit_core.actions.get_balance import GetBalanceAction
from cdp_agentkit_core.actions.get_wallet_details import GetWalletDetailsAction
from cdp_agentkit_core.actions.mint_nft import MintNftAction
from cdp_agentkit_core.actions.register_basename import RegisterBasenameAction
from cdp_agentkit_core.actions.request_faucet_funds import RequestFaucetFundsAction
from cdp_agentkit_core.actions.trade import TradeAction
from cdp_agentkit_core.actions.transfer import TransferAction
from cdp_agentkit_core.actions.uniswap_v3.create_pool import UniswapV3CreatePoolAction


def get_all_cdp_actions() -> list[type[CdpAction]]:
    """Retrieve all subclasses of CdpAction defined in the package."""
    actions = []
    for action in CdpAction.__subclasses__():
        actions.append(action())
    return actions


CDP_ACTIONS = get_all_cdp_actions()

__all__ = [
    "CdpAction",
    "GetWalletDetailsAction",
    "DeployNftAction",
    "DeployTokenAction",
    "GetBalanceAction",
    "MintNftAction",
    "RegisterBasenameAction",
    "RequestFaucetFundsAction",
    "TradeAction",
    "TransferAction",
    "UniswapV3CreatePoolAction",
    "CDP_ACTIONS",
]
