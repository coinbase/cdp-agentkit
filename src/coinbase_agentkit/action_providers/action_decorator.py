from functools import wraps
from typing import Optional, Type, Any, Callable
from pydantic import BaseModel

class ActionMetadata(BaseModel):
    """Metadata for an action."""
    name: str
    description: str
    schema: Optional[Type[BaseModel]]
    invoke: Callable
    wallet_provider: bool = False

def CreateAction(
    name: str,
    description: str,
    schema: Optional[Type[BaseModel]] = None
):
    """Decorator to create an action."""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            return func(*args, **kwargs)
            
        wrapper._action_metadata = ActionMetadata(
            name=name,
            description=description,
            schema=schema,
            invoke=func,
            wallet_provider=len(func.__code__.co_varnames) > 1 
            and func.__code__.co_varnames[1] == "wallet_provider"
        )
        
        def _add_to_actions(owner: Any) -> None:
            if not hasattr(owner, "_actions"):
                owner._actions = []
            owner._actions.append(wrapper._action_metadata)
            
        wrapper._add_to_actions = _add_to_actions
        return wrapper
    return decorator 