from cdp_agentkit_core.actions.social.twitter.account_details import AccountDetailsAction
from cdp_agentkit_core.actions.social.twitter.action import TwitterAction
from cdp_agentkit_core.actions.social.twitter.post_tweet import PostTweetAction


def get_all_twitter_actions() -> list[type[TwitterAction]]:
    actions = []
    for action in TwitterAction.__subclasses__():
        actions.append(action())

    return actions


TWITTER_ACTIONS = get_all_twitter_actions()

__all__ = [
    "TwitterAction",
    "AccountDetailsAction",
    "PostTweetAction",
    "TWITTER_ACTIONS",
]
