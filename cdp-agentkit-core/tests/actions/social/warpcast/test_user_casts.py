import pytest
from cdp_agentkit_core.actions.social.warpcast.user_casts import UserCastsAction, UserCastsArgs


@pytest.fixture
def user_casts_action():
    return UserCastsAction()


def test_get_user_casts(user_casts_action):
    args = UserCastsArgs(user_id="user123")
    result = user_casts_action.get_user_casts(args)
    assert result == "Casts for user user123"
