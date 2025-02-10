from coinbase_agentkit import Action, AgentKit
from langchain.tools import StructuredTool


def get_langchain_tools(agent_kit: AgentKit) -> list[StructuredTool]:
    """Get Langchain tools from an AgentKit instance.

    Args:
        agent_kit: The AgentKit instance

    Returns:
        A list of Langchain tools

    """
    actions: list[Action] = agent_kit.get_actions()

    tools = []
    for action in actions:

        def create_tool_fn(action=action):
            async def tool_fn(**kwargs) -> str:
                result = await action.invoke(kwargs)
                return result

            return tool_fn

        tool = StructuredTool(
            name=action.name,
            description=action.description,
            func=create_tool_fn(action),
            args_schema=action.schema,
        )
        tools.append(tool)

    return tools
