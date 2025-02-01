import { GamePlayerModule } from "../modules/game-player"
import type { FlippandoMemory } from "../types"
import { jest } from "@jest/globals" // Import jest

jest.mock("ethers")

describe("GamePlayerModule", () => {
  let gamePlayer: GamePlayerModule
  let mockMemory: FlippandoMemory

  beforeEach(() => {
    mockMemory = {
      gameStates: new Map(),
      nftCache: new Map(),
      tokenSupplyHistory: [],
    }
    gamePlayer = new GamePlayerModule(mockMemory, "mock_provider_url", "mock_private_key")
  })

  test("createGame should return a game ID", async () => {
    const mockCreateGame = jest.spyOn(gamePlayer, "createGame").mockResolvedValue("mock_game_id")

    const tools = gamePlayer.getTools()
    const createGameTool = tools.find((tool) => tool.name === "create_game")

    if (createGameTool) {
      const result = await createGameTool.invoke({
        boardSize: "4",
        gameType: "1",
        gameTileType: "2",
      })

      expect(result).toBe("Game created with ID: mock_game_id")
      expect(mockCreateGame).toHaveBeenCalledWith(4, 1, 2)
    } else {
      fail("Create game tool not found")
    }
  })

  // Add more tests 
})

