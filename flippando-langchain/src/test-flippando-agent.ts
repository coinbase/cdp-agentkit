import dotenv from "dotenv"
import { FlippandoAgent } from "./agent"
import type { FlippandoAgentConfig } from "./types"

dotenv.config()

async function testFlippandoAgent() {
  const config: FlippandoAgentConfig = {
    chainIds: [1], // Assuming Ethereum mainnet
    twitterEnabled: false,
    gameAnalysisEnabled: true,
    artSuggestionsEnabled: true,
    arbitrageTrackingEnabled: false,
    providerUrl: process.env.PROVIDER_URL!,
    privateKey: process.env.PRIVATE_KEY!,
  }

  const agent = new FlippandoAgent(config)

  // Test creating a game
  const tools = await agent.getAllTools();
  const createGameTool = tools.find((tool) => tool.name === "create_game")
  if (createGameTool) {
    const result = await createGameTool.invoke({
      boardSize: "4",
      gameType: "1",
      gameTileType: "2",
    })
    console.log("Create Game Result:", result)
  }

  // Test initializing a game
  // Note: You'll need to use a valid gameId from the previous step
  const initializeGameTool = tools.find((tool) => tool.name === "initialize_game")
  if (initializeGameTool) {
    const result = await initializeGameTool.invoke({
      gameId: "GAME_ID_FROM_PREVIOUS_STEP",
    })
    console.log("Initialize Game Result:", result)
  }

  // Add more tests for other tools...
}

testFlippandoAgent().catch(console.error)

