import os
import sys
import time
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Import CDP Agentkit Langchain Extension.
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from cdp_langchain.tools import CdpTool
from dotenv import load_dotenv
load_dotenv()

# Import tools
from tools import (
    # DALLE tool
    create_dalle_nft_tool, DalleNftInput, DALLE_NFT_PROMPT,
)

# Configure a file to persist the agent's CDP MPC Wallet Data.
wallet_data_file = "wallet_data.txt"

def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    llm = ChatOpenAI(model="gpt-4o-mini")
    wallet_data = None
    if os.path.exists(wallet_data_file):

        with open(wallet_data_file) as f:
            wallet_data = f.read()

    # Configure CDP Agentkit Langchain Extension.
    values = {}
    if wallet_data is not None:
        # If there is a persisted agentic wallet, load it and pass to the CDP Agentkit Wrapper.
        values = {"cdp_wallet_data": wallet_data}

    agentkit = CdpAgentkitWrapper(**values)

    # Persist the agent's CDP MPC Wallet Data.
    wallet_data = agentkit.export_wallet()
    with open(wallet_data_file, "w") as f:
        f.write(wallet_data)

    # Initialize CDP Agentkit Toolkit and get tools.
    cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    cdp_tools = cdp_toolkit.get_tools()


    # DALLE NFT Generation
    dalle_nft_tool = create_dalle_nft_tool()
    dalleNFTTool = CdpTool(
        name="generate_nft",
        description=dalle_nft_tool["description"],
        cdp_agentkit_wrapper=agentkit,
        args_schema=dalle_nft_tool["args_schema"],
        func=dalle_nft_tool["func"]
    )

    # Add additional tools.
    tools = [ dalleNFTTool, *cdp_tools ]

    # Store buffered conversation history in memory.
    memory = MemorySaver()
    config = {"configurable": {"thread_id": "CDP Agentkit DALLE NFT Chatbot Example!"}}

    prompt = "You are a helpful agent that helps manage a user's wallet you are part of that wallet" 
    "you can interact with the blockchain using some tools. You are empowered to interact onchain using your tools."
    "If you ever need funds, you can request them from the faucet if you are on network ID `base-sepolia`. "
    "If not, you can provide your wallet details and request funds from the user. "
    "If someone asks you to do something you can't do with your currently available tools, say you don't have a tool to do that AND you must ask the user "
    "if the user asks you to show something or teach them how to do something, you must use the tool - when_no_api_search_like_human which takes has an agent that" 
    "uses a web browser to actually navigate and show how that activity is done"
    "you just need to pass in the string query you want to 'achieve' and it can be a multi-step process the agent can handle it. "
    "bear in mind this takes bit of time so be careful using this and use it when users asks you to do something you can't do with your currently available tools"
    "When minting an nft ensure that you use the base_uri only. do not append anything to it such as a number! "
    "Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested."
    # Create ReAct Agent using the LLM and CDP Agentkit tools.
    return create_react_agent(
        llm,
        tools=tools,
        checkpointer=memory,
        state_modifier=prompt,
    ), config


# Chat Mode
def run_chat_mode(agent_executor, config):
    """Run the agent interactively based on user input."""
    print("Starting chat mode... Type 'exit' to end.")
    while True:
        try:
            user_input = input("\nUser: ")
            if user_input.lower() == "exit":
                break

            # Run agent with the user's input in chat mode
            for chunk in agent_executor.stream(
                {"messages": [HumanMessage(content=user_input)]}, config):
                if "agent" in chunk:
                    print(chunk["agent"]["messages"][0].content)
                elif "tools" in chunk:
                    print(chunk["tools"]["messages"][0].content)
                print("-------------------")

        except KeyboardInterrupt:
            print("Goodbye Agent!")
            sys.exit(0)

def main():
    """Start the chatbot agent."""
    agent_executor, config = initialize_agent()
    run_chat_mode(agent_executor=agent_executor, config=config)

if __name__ == "__main__":
    print("Starting DALLE NFT Agent...")
    main()
