import pytest
from cdp_agentkit_core.actions.social.warpcast.reply import ReplyAction, ReplyActionArgs


@pytest.fixture
def reply_action():
    return ReplyAction()


def test_reply_to_cast(reply_action):
    args = ReplyActionArgs(cast_id="12345", content="This is a reply")
    result = reply_action.reply_to_cast(args)
    assert result == "Replied to cast 12345 with content: This is a reply"
