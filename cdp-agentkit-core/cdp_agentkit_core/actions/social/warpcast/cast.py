from pydantic import BaseModel

from cdp_agentkit_core.actions.social.warpcast.action import WarpcastAction


class CastActionArgs(BaseModel):
    content: str


class CastAction(WarpcastAction):
    def __init__(self):
        super().__init__(
            name="cast",
            description="Post a cast on Warpcast",
            args_schema=CastActionArgs,
            func=self.post_cast,
        )

    def post_cast(self, args: CastActionArgs) -> str:
        # Implement the logic to post a cast on Warpcast
        return f"Cast posted with content: {args.content}"
