"""Tool allows agents to interact with the Warpcast API.

To use this tool, you must first set as environment variables:
    OPENAI_API_KEY
    WARPCAST_API_KEY
"""

from collections.abc import Callable
from typing import Any

from langchain_core.callbacks import CallbackManagerForToolRun
from langchain_core.tools import BaseTool
from pydantic import BaseModel

from warpcast_langchain.warpcast_api_wrapper import WarpcastApiWrapper


class WarpcastTool(BaseTool):  # type: ignore[override]
    """Tool for interacting with the Warpcast API."""

    warpcast_api_wrapper: WarpcastApiWrapper
    name: str = ""
    description: str = ""
    args_schema: type[BaseModel] | None = None
    func: Callable[..., str]

    def _run(
        self,
        instructions: str | None = "",
        run_manager: CallbackManagerForToolRun | None = None,
        **kwargs: Any,
    ) -> str:
        """Use the Warpcast API to run an operation."""
        if not instructions or instructions == "{}":
            # Catch other forms of empty input that GPT-4 likes to send.
            instructions = ""
        if self.args_schema is not None:
            validated_input_data = self.args_schema(**kwargs)
            parsed_input_args = validated_input_data.model_dump()
        else:
            parsed_input_args = {"instructions": instructions}
        return self.warpcast_api_wrapper.run_action(self.func, **parsed_input_args) 