import os
from dotenv import load_dotenv
from warpcast_langchain import WarpcastApiWrapper, WarpcastToolkit

# Load environment variables
load_dotenv()

def main():
    # Initialize Warpcast wrapper
    warpcast = WarpcastApiWrapper()
    
    # Create toolkit
    toolkit = WarpcastToolkit.from_warpcast_api_wrapper(warpcast)
    
    # List available tools
    print("Available tools:")
    for tool in toolkit.get_tools():
        print(f"- {tool.name}")
    
    # Test casting
    print("\nTesting cast:")
    cast_tool = [t for t in toolkit.get_tools() if t.name == "cast"][0]
    result = cast_tool.run(text="Hello Farcaster! This is a test from CDP Agentkit 🚀")
    print(result)
    
    # Test user details
    print("\nTesting user details:")
    user_tool = [t for t in toolkit.get_tools() if t.name == "user_details"][0]
    result = user_tool.run(fid="1")  # Replace with a valid FID
    print(result)

if __name__ == "__main__":
    main() 