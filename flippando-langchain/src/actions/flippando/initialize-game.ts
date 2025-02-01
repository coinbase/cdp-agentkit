import { z } from "zod"
import { BaseFlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoGameMasterABI from "../../abis/FlippandoGameMaster.json"
import type { FlippandoAgentkitOptions } from "../../flippando-agentkit"

const INITIALIZE_GAME_PROMPT = `
This action initializes a Flippando game. It takes the game ID as input.
The action will interact with the FlippandoGameMaster contract to initialize the specified game.
`

export const InitializeGameSchema = z.object({
  gameId: z.string().describe("The ID of the game to initialize"),
})

export class InitializeGameAction extends BaseFlippandoAction<typeof InitializeGameSchema> {
  name = "initialize_game"
  description = INITIALIZE_GAME_PROMPT
  argsSchema = InitializeGameSchema

  async func(
    config: z.infer<typeof FlippandoAgentkitOptions>,
    args: z.infer<typeof InitializeGameSchema>,
  ): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider(config.providerUrl)
    const signer = new ethers.Wallet(config.privateKey, provider)
    const flippandoGameMaster = new ethers.Contract(
      config.flippandoGameMasterAddress,
      FlippandoGameMasterABI as unknown as ethers.ContractInterface,
      signer,
    )

    try {
      const tx = await flippandoGameMaster.initializeGame(args.gameId)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "GameInitialized")
      if (!event) throw new Error("GameInitialized event not found")
      return `Game ${args.gameId} initialized successfully.`
    } catch (error) {
      return `Error initializing game: ${error instanceof Error ? error.message : String(error)}`
    }
  }
}

