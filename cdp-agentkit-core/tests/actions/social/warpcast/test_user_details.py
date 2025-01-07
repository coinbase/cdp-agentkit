import pytest
from cdp_agentkit_core.actions.social.warpcast.user_details import UserDetailsAction, UserDetailsArgs


@pytest.fixture
def user_details_action():
    return UserDetailsAction()


def test_get_user_details(user_details_action):
    args = UserDetailsArgs(user_id="user123")
    result = user_details_action.get_user_details(args)
    assert result == "Details for user user123"
