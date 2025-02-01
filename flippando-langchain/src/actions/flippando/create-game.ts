import { z } from "zod"
import { BaseFlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoGameMasterABI from "../../abis/FlippandoGameMaster.json"
import type { FlippandoAgentkitOptions } from "../../flippando-agentkit"

const CREATE_GAME_PROMPT = `
This action creates a new Flippando game. It takes the board size, game type, and game tile type as inputs.
The action will interact with the FlippandoGameMaster contract to create a new game.
`

export const CreateGameSchema = z.object({
  boardSize: z.number().int().positive().describe("The size of the game board"),
  gameType: z.number().int().nonnegative().describe("The type of the game"),
  gameTileType: z.number().int().nonnegative().describe("The type of tiles used in the game"),
})

export class CreateGameAction extends BaseFlippandoAction<typeof CreateGameSchema> {
  name = "create_game"
  description = CREATE_GAME_PROMPT
  argsSchema = CreateGameSchema

  async func(
    config: z.infer<typeof FlippandoAgentkitOptions>,
    args: z.infer<typeof CreateGameSchema>,
  ): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider(config.providerUrl)
    const signer = new ethers.Wallet(config.privateKey, provider)
    const flippandoGameMaster = new ethers.Contract(
      config.flippandoGameMasterAddress,
      FlippandoGameMasterABI as unknown as ethers.ContractInterface,
      signer,
    )

    try {
      const tx = await flippandoGameMaster.createGame(args.boardSize, args.gameType, args.gameTileType)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "GameCreated")
      if (!event) throw new Error("GameCreated event not found")
      const gameId = event.args.gameId
      return `Game created successfully. Game ID: ${gameId}`
    } catch (error) {
      return `Error creating game: ${error instanceof Error ? error.message : String(error)}`
    }
  }
}

