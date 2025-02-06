import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import { getTileImage } from "../../utils/tileImages"
import { FlippandoAgentkit } from "../../flippando-agentkit"

const GENERATE_IMAGE_FOR_FLIP_PROMPT = `
This action generates an SVG image for a solved Flippando game board.
It takes the NFT metadata as input and returns the SVG string representation of the game board.
`

export const GenerateImageForFlipSchema = z.object({
  tokenId: z.string().describe("The ID of the NFT token"),
  metadata: z
    .object({
      name: z.string(),
      description: z.string(),
      game_version: z.string(),
      game_id: z.string(),
      game_tile_type: z.string(),
      game_level: z.string(),
      game_solved_board: z.string(),
    })
    .describe("The metadata of the NFT"),
})

const tileTypeMap: { [key: string]: string } = {
  "1": "squareTile",
  "2": "greyGradient",
  "3": "redGradient",
  "4": "greenGradient",
  "5": "blueGradient",
  "6": "diceTile",
  "7": "hexagramTile",
}

export async function generateImageForFlip(args: z.infer<typeof GenerateImageForFlipSchema>): Promise<string> {
  try {
    const { game_tile_type, game_level, game_solved_board } = args.metadata
    const tileType = tileTypeMap[game_tile_type]
    const boardSize = Number.parseInt(game_level)
    const tileSize = 25 // You can adjust this value to change the size of each tile
    const svgSize = Math.sqrt(boardSize) * tileSize
    const board = JSON.parse(game_solved_board)

    let svgContent = `<svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" xmlns="http://www.w3.org/2000/svg">`

    board.forEach((tileIndex: number, index: number) => {
      const row = Math.floor(index / Math.sqrt(boardSize))
      const col = index % Math.sqrt(boardSize)
      const tileImage = getTileImage(tileIndex - 1, tileType)

      svgContent += `
        <svg x="${col * tileSize}" y="${row * tileSize}" width="${tileSize}" height="${tileSize}">
          ${tileImage}
        </svg>
      `
    })

    svgContent += "</svg>"

    return svgContent
  } catch (error) {
    console.error("Error generating image:", error)
    throw new Error(`Error generating image: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export class GenerateImageForFlipAction implements FlippandoAction<typeof GenerateImageForFlipSchema> {
  name = "generate_image_for_flip"
  description = GENERATE_IMAGE_FOR_FLIP_PROMPT
  argsSchema = GenerateImageForFlipSchema
  func = generateImageForFlip
}

