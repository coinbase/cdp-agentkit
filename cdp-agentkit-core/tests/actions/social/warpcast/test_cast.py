import pytest
from cdp_agentkit_core.actions.social.warpcast.cast import CastAction, CastActionArgs


@pytest.fixture
def cast_action():
    return CastAction()


def test_post_cast(cast_action):
    args = CastActionArgs(content="Hello, Warpcast!")
    result = cast_action.post_cast(args)
    assert result == "Cast posted with content: Hello, Warpcast!"
