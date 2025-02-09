# Flippando Agent

The `flippando-agent.ts` file is the main entry point for the Flippando agent. It sets up and runs the agent that interacts with the Flippando game using the Flippando Agentkit.

## Key Components

1. **FlippandoToolkit**: Imports the toolkit containing all the tools the agent can use.
2. **FlippandoAgentkit**: Imports the main Flippando agent kit for interacting with the game.
3. **ChatOpenAI**: Imports the language model used by the agent.
4. **MemorySaver**: Imports a component to store the conversation history.
5. **createReactAgent**: Imports a function to create a React-based agent.

## Main Functions

### `initialize()`

This asynchronous function sets up the agent with the following steps:
- Initializes the language model (LLM)
- Creates a FlippandoAgentkit instance
- Sets up the FlippandoToolkit with available tools
- Configures memory storage for conversation history
- Creates a React Agent using the LLM and Flippando tools

### `runAutonomousMode(agent, config, interval)`

This function runs the agent autonomously:
- It continuously prompts the agent to perform creative actions in the Flippando game
- Actions are executed at specified intervals
- The function handles and logs any errors that occur during execution

### `runChatMode(agent, config)`

This function runs the agent in an interactive chat mode:
- It accepts user input and passes it to the agent for processing
- The agent's responses are then displayed to the user
- This mode continues until the user types 'exit'

### `chooseMode()`

This function allows the user to choose between autonomous and chat modes.

### `main()`

The main function that:
- Initializes the agent
- Lets the user choose the mode
- Runs the agent in the chosen mode

## Usage

The script can be run directly, and it will start the Flippando Agent, allowing the user to interact with it or let it run autonomously.

## Error Handling

The script includes error handling to catch and log any errors that occur during the agent's operation, ensuring graceful degradation and helpful error messages.

