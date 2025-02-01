import { z } from "zod"
import { BaseFlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoABI from "../../abis/Flippando.json"
import type { FlippandoAgentkitOptions } from "../../flippando-agentkit"

const FLIP_TILES_PROMPT = `
This action flips tiles in a Flippando game. It takes the game ID and an array of tile positions to flip.
The action will interact with the Flippando contract to flip the specified tiles.
`

export const FlipTilesSchema = z.object({
  gameId: z.string().describe("The ID of the game"),
  positions: z.array(z.number().int().nonnegative()).describe("The positions of the tiles to flip"),
})

export class FlipTilesAction extends BaseFlippandoAction<typeof FlipTilesSchema> {
  name = "flip_tiles"
  description = FLIP_TILES_PROMPT
  argsSchema = FlipTilesSchema

  async func(config: z.infer<typeof FlippandoAgentkitOptions>, args: z.infer<typeof FlipTilesSchema>): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider(config.providerUrl)
    const signer = new ethers.Wallet(config.privateKey, provider)
    const flippando = new ethers.Contract(config.flippandoAddress, FlippandoABI as unknown as ethers.ContractInterface, signer)

    try {
      const tx = await flippando.flipTiles(args.gameId, args.positions)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "TilesFlipped")
      if (!event) throw new Error("TilesFlipped event not found")
      return `Tiles flipped successfully in game ${args.gameId}. Positions: ${args.positions.join(", ")}`
    } catch (error) {
      return `Error flipping tiles: ${error instanceof Error ? error.message : String(error)}`
    }
  }
}

