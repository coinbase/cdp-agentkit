from collections.abc import Callable
from decimal import Decimal
from typing import TypedDict, Dict, List, Tuple, Optional
from pydantic import BaseModel, Field
import os
import sys
from langchain_core.messages import HumanMessage
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

# Type definitions
class MarketParams(TypedDict):
    """Type definition for Morpho market parameters."""
    loan_token: str       # address
    collateral_token: str # address
    oracle: str          # address
    irm: str            # address
    lltv: str           # uint256

class AgentConfig(TypedDict):
    """Type definition for agent configuration."""
    configurable: Dict[str, str]

# Constants with proper typing
WALLET_DATA_FILE: str = "morpho_base_mainnet_wallet_data.txt"

MORPHO_MARKET_PARAMS: MarketParams = {
    "loan_token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "collateral_token": "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    "oracle": "0x663BECd10daE6C4A3Dcd89F1d76c1174199639B9",
    "irm": "0x46415998764C29aB2a25CbeA6254146D50D22687",
    "lltv": "860000000000000000"
}

VALID_MORPHO_ACTIONS: List[str] = [
    'morpho_supply_collateral',
    'morpho_borrow',
    'morpho_repay',
    'morpho_withdraw_collateral'
]

def get_user_action() -> int:
    """
    Get the user's selected Morpho action.
    
    Returns:
        int: Selected action index (1-4)
    """
    print("\nAvailable Morpho Actions:")
    print("1. Supply Collateral")
    print("2. Borrow")
    print("3. Repay")
    print("4. Withdraw Collateral")
    
    while True:
        try:
            choice = int(input("\nSelect an action (1-4): "))
            if 1 <= choice <= 4:
                return choice
            print("Please enter a number between 1 and 4")
        except ValueError:
            print("Please enter a valid number")

def create_action_prompt(action: int) -> str:
    """
    Create a prompt for the selected Morpho action.
    
    Args:
        action: Selected action index (1-4)
        
    Returns:
        str: Formatted prompt for the selected action
    """
    market_params_str: str = str(MORPHO_MARKET_PARAMS)
    
    prompts = {
        1: f"""
Execute a Morpho Protocol SUPPLY COLLATERAL operation with these EXACT parameters:
- "market_params": {market_params_str},
- "assets": "0.00001",
- "on_behalf": "0x79a94E4bc3b2ff9e9A6cC745B59CFCbaE9697D13"

Operation details:
- Action: SUPPLY COLLATERAL (use morpho_supply_collateral)
- Token: cbBTC
- Amount: 0.00001
- Purpose: Collateral for borrowing
- market_params: {market_params_str}
""",
        2: f"""
Execute a Morpho Protocol BORROW operation:
- Action: BORROW (use morpho_borrow)
- Token: USDC
- Amount: 0.5
- Using the cbBTC supplied as collateral
- market_params: {market_params_str}
""",
        3: f"""
Execute a Morpho Protocol REPAY operation:
- Action: REPAY (use morpho_repay)
- Token: USDC
- Amount: 0.5 (full repayment)
- market_params: {market_params_str}
""",
        4: f"""
Execute a Morpho Protocol WITHDRAW COLLATERAL operation:
- Action: WITHDRAW COLLATERAL (use morpho_withdraw_collateral)
- Token: cbBTC
- Amount: 0.000009 (90% withdrawal)
- market_params: {market_params_str}
- on_behalf: "0x79a94E4bc3b2ff9e9A6cC745B59CFCbaE9697D13"
- receiver: "0x79a94E4bc3b2ff9e9A6cC745B59CFCbaE9697D13"
"""
    }
    
    return prompts[action]

def validate_tools(tools: List[BaseModel]) -> bool:
    """
    Validate that necessary Morpho tools are available.
    
    Args:
        tools: List of available tools
        
    Returns:
        bool: True if all required tools are present, False otherwise
    """
    tool_names: List[str] = [tool.name for tool in tools]
    missing_actions: List[str] = [
        action for action in VALID_MORPHO_ACTIONS 
        if action not in tool_names
    ]
    
    if missing_actions:
        print(f"ERROR: Missing required Morpho actions: {missing_actions}")
        return False
    return True

def initialize_agent() -> Tuple[Callable, AgentConfig]:
    """
    Initialize the agent with CDP Agentkit and persistent wallet.
    
    Returns:
        Tuple containing the agent executor and configuration
    """
    print("\nInitializing agent...")
    
    # Initialize LLM
    llm = ChatOpenAI(model="gpt-4o-mini")

    # Load existing wallet data if available
    wallet_data: Optional[str] = None
    if os.path.exists(WALLET_DATA_FILE):
        print(f"Loading existing wallet data from {WALLET_DATA_FILE}")
        with open(WALLET_DATA_FILE) as f:
            wallet_data = f.read()

    # Initialize CDP wrapper with existing wallet if available
    values: Dict[str, str] = {}
    if wallet_data is not None:
        values = {"cdp_wallet_data": wallet_data}

    cdp = CdpAgentkitWrapper(**values)

    # Persist the wallet data
    wallet_data = cdp.export_wallet()
    with open(WALLET_DATA_FILE, "w") as f:
        f.write(wallet_data)

    # Create toolkit and get tools
    toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)
    tools = toolkit.get_tools()

    # Display and validate available tools
    print("\n=== Available Tools ===")
    for tool in tools:
        if tool.name in VALID_MORPHO_ACTIONS:
            print(f"\nTool Name: {tool.name} ✓")
        else:
            print(f"\nTool Name: {tool.name}")

    if not validate_tools(tools):
        print("Missing required Morpho actions. Exiting...")
        sys.exit(1)
    
    # Wait for user confirmation
    while True:
        response: str = input("\nDo you want to proceed with these tools? (yes/no): ").lower()
        if response == 'no':
            print("Closing agent...")
            sys.exit(0)
        elif response == 'yes':
            break
        else:
            print("Please answer 'yes' or 'no'")

    # Add memory for conversation history
    memory = MemorySaver()
    config: AgentConfig = {
        "configurable": {"thread_id": "CDP Morpho Integration Example"}
    }

    state_modifier: str = """You are a specialized agent for Morpho Protocol interactions using CDP Agentkit. 
        
IMPORTANT CONSTRAINTS:
1. You must ONLY use Morpho-specific actions:
   - morpho_supply_collateral (REQUIRES market_params as a dictionary)
   - morpho_borrow
   - morpho_repay
   - morpho_withdraw_collateral
2. Do not use any other actions, even if available
3. Execute the operation exactly as specified
4. Verify the operation's success
5. Stop and report any failures immediately

IMPORTANT: When calling morpho_supply_collateral, you MUST pass market_params as a DICTIONARY with these keys:
{MORPHO_MARKET_PARAMS}
"""

    return create_react_agent(
        llm,
        tools=tools,
        checkpointer=memory,
        state_modifier=state_modifier
    ), config

def main() -> None:
    """Main execution function"""
    print("Starting Morpho Integration...")
    try:
        agent_executor, config = initialize_agent()
        
        # Get user's selected action
        action = get_user_action()
        
        print(f"\nExecuting Morpho action {action}...")
        prompt = create_action_prompt(action)
        
        for chunk in agent_executor.stream(
            {"messages": [HumanMessage(content=prompt)]}, 
            config, 
            stream_mode="values"
        ):
            if "messages" in chunk:
                chunk["messages"][-1].pretty_print()
            else:
                print("\nRAW CHUNK:", chunk)
            print("-------------------")
            
    except Exception as e:
        print(f"Error during execution: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()