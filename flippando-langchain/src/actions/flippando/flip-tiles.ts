import { z } from "zod"
import { FlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoABI from "../../abis/Flippando.json"

const FLIP_TILES_PROMPT = `
This action flips tiles in a Flippando game. It takes the game ID and an array of tile positions to flip.
The action will interact with the Flippando contract to flip the specified tiles.
`

export const FlipTilesSchema = z.object({
  gameId: z.string().describe("The ID of the game"),
  positions: z.array(z.number().int().nonnegative()).describe("The positions of the tiles to flip"),
})

export async function flipTiles(args: z.infer<typeof FlipTilesSchema>): Promise<string> {
    const providerUrl = process.env.FLIPPANDO_PROVIDER_URL
    const privateKey = process.env.FLIPPANDO_PRIVATE_KEY!
    const flippandoAddress = process.env.FLIPPANDO_ADDRESS!

    const provider = new ethers.providers.JsonRpcProvider(providerUrl)
    const signer = new ethers.Wallet(privateKey, provider)
    const flippando = new ethers.Contract(flippandoAddress, FlippandoABI.abi, signer)

    try {
      const tx = await flippando.flipTiles(args.gameId, args.positions)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "GameState")
      if (!event) throw new Error("GameState event not found")
      return `Tiles flipped successfully in game ${args.gameId}. Positions: ${args.positions.join(", ")}`
    } catch (error) {
      return `Error flipping tiles: ${error instanceof Error ? error.message : String(error)}`
    }
  }

export class FlipTilesAction implements FlippandoAction<typeof FlipTilesSchema> {
  name = "flip_tiles"
  description = FLIP_TILES_PROMPT
  argsSchema = FlipTilesSchema
  func = flipTiles
}

