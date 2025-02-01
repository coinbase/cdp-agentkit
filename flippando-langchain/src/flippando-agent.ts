import { FlippandoToolkit } from "./tools/flippando-toolkit"
import { FlippandoAgentkit } from "./flippando-agentkit"
import { HumanMessage } from "@langchain/core/messages"
import { MemorySaver } from "@langchain/langgraph"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { ChatOpenAI } from "@langchain/openai"
import type { StructuredTool } from "@langchain/core/tools"
import * as dotenv from "dotenv"
import * as readline from "readline"

dotenv.config()

const modifier = `
  You are a helpful agent that can interact with the Flippando game using the Flippando Agentkit.
  You are empowered to interact with Flippando using your tools.

  You can create games, initialize them, flip tiles, and perform various game-related actions.
  Always use the appropriate tool for each action.

  If someone asks you to do something you can't do with your currently available tools, you must say so, and encourage them to implement it themselves using the Flippando SDK.
  Recommend they refer to the Flippando documentation for more information.

  Be concise and helpful with your responses.
  Refrain from restating your tools' descriptions unless it is explicitly requested.
`

/**
 * Initialize the agent with Flippando Agentkit
 *
 * @returns Agent executor and config
 */
async function initialize() {
  // Initialize LLM
  const llm = new ChatOpenAI({ modelName: "gpt-4", temperature: 0 })

  // Flippando Agentkit
  const flippandoAgentkit = new FlippandoAgentkit()

  // Flippando Toolkit
  const flippandoToolkit = new FlippandoToolkit(flippandoAgentkit)

  // Flippando tools
  const tools = flippandoToolkit.tools

  // Store buffered conversation history in memory
  const memory = new MemorySaver()

  // React Agent options
  const agentConfig = { configurable: { thread_id: "Flippando Agentkit Chatbot Example!" } }

  // Create React Agent using the LLM and Flippando tools
  const agent = await createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: modifier,
  })

  return { agent, config: agentConfig }
}

/**
 * Run the agent autonomously with specified intervals
 *
 * @param agent - The agent executor
 * @param config - Agent configuration
 * @param interval - Time interval between actions in seconds
 */
async function runAutonomousMode(agent: any, config: any, interval = 60) {
  console.log("Starting autonomous mode...")

  while (true) {
    try {
      const thought =
        "Be creative and do something interesting in the Flippando game. " +
        "Choose an action or set of actions and execute it that highlights your abilities. " +
        "This could be creating a new game, initializing an existing game, or flipping tiles in an ongoing game."

      const stream = await agent.stream({ messages: [new HumanMessage(thought)] }, config)

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content)
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content)
        }
        console.log("-------------------")
      }

      await new Promise((resolve) => setTimeout(resolve, interval * 1000))
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
      }
      // Implement appropriate error handling and recovery
    }
  }
}

/**
 * Run the agent interactively based on user input
 *
 * @param agent - The agent executor
 * @param config - Agent configuration
 */
async function runChatMode(agent: any, config: any) {
  console.log("Starting chat mode... Type 'exit' to end.")

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const question = (prompt: string): Promise<string> => new Promise((resolve) => rl.question(prompt, resolve))

  try {
    while (true) {
      const userInput = await question("\nPrompt: ")

      if (userInput.toLowerCase() === "exit") {
        break
      }

      const stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, config)

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content)
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content)
        }
        console.log("-------------------")
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message)
    }
  } finally {
    rl.close()
  }
}

/**
 * Choose whether to run in autonomous or chat mode based on user input
 *
 * @returns Selected mode
 */
async function chooseMode(): Promise<"chat" | "auto"> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const question = (prompt: string): Promise<string> => new Promise((resolve) => rl.question(prompt, resolve))

  while (true) {
    console.log("\nAvailable modes:")
    console.log("1. chat    - Interactive chat mode")
    console.log("2. auto    - Autonomous action mode")

    const choice = (await question("\nChoose a mode (enter number or name): ")).toLowerCase().trim()

    if (choice === "1" || choice === "chat") {
      rl.close()
      return "chat"
    } else if (choice === "2" || choice === "auto") {
      rl.close()
      return "auto"
    }
    console.log("Invalid choice. Please try again.")
  }
}

/**
 * Start the Flippando agent
 */
async function main() {
  try {
    const { agent, config } = await initialize()
    const mode = await chooseMode()

    if (mode === "chat") {
      await runChatMode(agent, config)
    } else {
      await runAutonomousMode(agent, config)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message)
    }
    process.exit(1)
  }
}

if (require.main === module) {
  console.log("Starting Flippando Agent...")
  main().catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}

