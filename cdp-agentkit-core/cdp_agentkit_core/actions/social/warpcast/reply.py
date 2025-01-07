from pydantic import BaseModel

from cdp_agentkit_core.actions.social.warpcast.action import WarpcastAction


class ReplyActionArgs(BaseModel):
    cast_id: str
    content: str


class ReplyAction(WarpcastAction):
    def __init__(self):
        super().__init__(
            name="reply",
            description="Reply to a cast on Warpcast",
            args_schema=ReplyActionArgs,
            func=self.reply_to_cast,
        )

    def reply_to_cast(self, args: ReplyActionArgs) -> str:
        # Implement the logic to reply to a cast on Warpcast
        return f"Replied to cast {args.cast_id} with content: {args.content}"
