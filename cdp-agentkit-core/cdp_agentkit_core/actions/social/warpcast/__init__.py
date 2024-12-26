from cdp_agentkit_core.actions.social.warpcast.action import WarpcastAction
from cdp_agentkit_core.actions.social.warpcast.cast import CastAction
from cdp_agentkit_core.actions.social.warpcast.user_details import UserDetailsAction


def get_all_warpcast_actions() -> list[type[WarpcastAction]]:
    actions = []
    for action in WarpcastAction.__subclasses__():
        actions.append(action())

    return actions


WARPCAST_ACTIONS = get_all_warpcast_actions()

__all__ = [
    "WARPCAST_ACTIONS",
    "WarpcastAction",
    "CastAction",
    "UserDetailsAction",
] 