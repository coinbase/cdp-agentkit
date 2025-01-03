from cdp_agentkit_core.actions.cdp_action import CdpAction


class WarpcastAction(CdpAction):
    """Base class for Warpcast actions."""

    def __init__(self, name: str, description: str, args_schema: type[BaseModel] | None = None, func: Callable[..., str] = None):
        super().__init__(name=name, description=description, args_schema=args_schema, func=func)
