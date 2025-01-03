from cdp_agentkit_core.actions.social.warpcast.action import WarpcastAction
from cdp_agentkit_core.actions.social.warpcast.cast import CastAction
from cdp_agentkit_core.actions.social.warpcast.reply import ReplyAction
from cdp_agentkit_core.actions.social.warpcast.user_details import UserDetailsAction
from cdp_agentkit_core.actions.social.warpcast.user_casts import UserCastsAction


def get_all_warpcast_actions() -> list[type[WarpcastAction]]:
    actions = []
    for action in WarpcastAction.__subclasses__():
        actions.append(action())

    return actions


WARPCAST_ACTIONS = get_all_warpcast_actions()

__all__ = [
    "WARPCAST_ACTIONS",
    "CastAction",
    "ReplyAction",
    "UserDetailsAction",
    "UserCastsAction",
    "WarpcastAction",
]
