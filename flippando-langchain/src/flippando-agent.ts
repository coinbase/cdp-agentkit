import { FlippandoAgent } from "./agent"
import { FlippandoToolkit } from "./tools/flippando_toolkit"
import { HumanMessage } from "@langchain/core/messages"
import { MemorySaver } from "@langchain/langgraph"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { ChatOpenAI } from "@langchain/openai"
import * as dotenv from "dotenv"
import * as readline from "readline"

dotenv.config()

// Validate environment variables
function validateEnvironment(): void {
  const requiredVars = ["OPENAI_API_KEY", "PROVIDER_URL", "PRIVATE_KEY"]
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error("Error: Required environment variables are not set")
    missingVars.forEach((varName) => {
      console.error(`${varName}=your_${varName.toLowerCase()}_here`)
    })
    process.exit(1)
  }
}

validateEnvironment()

// Initialize the Flippando agent
async function initializeAgent() {
  try {
    const llm = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0.7,
    })

    const config = {
      chainIds: [1], // Ethereum mainnet
      twitterEnabled: false,
      gameAnalysisEnabled: true,
      artSuggestionsEnabled: true,
      arbitrageTrackingEnabled: false,
      providerUrl: process.env.PROVIDER_URL!,
      privateKey: process.env.PRIVATE_KEY!,
    }

    const flippandoAgent = new FlippandoAgent(config)
    const toolkit = new FlippandoToolkit(flippandoAgent)
    const tools = toolkit.tools

    const memory = new MemorySaver()
    const agentConfig = { configurable: { thread_id: "Flippando Agent Example!" } }

    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
        You are a helpful agent that can interact with the Flippando game using various tools. 
        You can create games, initialize them, flip tiles, create NFTs, and make art. 
        You also have the ability to analyze games, suggest art combinations, track token supply, 
        and post updates on social media. Always use the appropriate tool for each action. 
        If someone asks you to do something you can't do with your currently available tools, 
        explain your limitations and suggest they implement new features using the Flippando SDK. 
        Be concise and helpful with your responses. 
      `,
    })

    return { agent, config: agentConfig, flippandoAgent }
  } catch (error) {
    console.error("Failed to initialize agent:", error)
    throw error
  }
}

// Run the agent in autonomous mode
async function runAutonomousMode(agent: any, config: any, flippandoAgent: FlippandoAgent, interval = 60) {
  console.log("Starting autonomous mode...")

  while (true) {
    try {
      const thought =
        "Perform an interesting action in the Flippando game ecosystem. " +
        "This could be creating a new game, analyzing existing games, " +
        "suggesting art combinations, or tracking token supply."

      const stream = await agent.stream({ messages: [new HumanMessage(thought)] }, config)

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content)
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content)
          // Handle game state updates or other Flippando-specific actions
          if (chunk.tools.name === "create_game" || chunk.tools.name === "initialize_game") {
            const gameState = JSON.parse(chunk.tools.messages[0].content)
            await flippandoAgent.handleGameStateUpdate(gameState)
          }
        }
        console.log("-------------------")
      }

      await new Promise((resolve) => setTimeout(resolve, interval * 1000))
    } catch (error) {
      console.error("Error in autonomous mode:", error)
      // Implement appropriate error handling and recovery
    }
  }
}

// Run the agent in chat mode
async function runChatMode(agent: any, config: any, flippandoAgent: FlippandoAgent) {
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
          // Handle game state updates or other Flippando-specific actions
          if (chunk.tools.name === "create_game" || chunk.tools.name === "initialize_game") {
            const gameState = JSON.parse(chunk.tools.messages[0].content)
            await flippandoAgent.handleGameStateUpdate(gameState)
          }
        }
        console.log("-------------------")
      }
    }
  } catch (error) {
    console.error("Error in chat mode:", error)
  } finally {
    rl.close()
  }
}

// Choose between autonomous and chat mode
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

// Main function to start the Flippando agent
async function main() {
  try {
    const { agent, config, flippandoAgent } = await initializeAgent()
    const mode = await chooseMode()

    if (mode === "chat") {
      await runChatMode(agent, config, flippandoAgent)
    } else {
      await runAutonomousMode(agent, config, flippandoAgent)
    }
  } catch (error) {
    console.error("Error:", error)
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

