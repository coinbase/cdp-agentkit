import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoABI from "../../abis/Flippando.json"
import { FlippandoAgentkit } from "../../flippando-agentkit"

const GET_FLIP_METADATA_PROMPT = `
This action gets a basic NFT and returns its metadata.
It returns the NFT metadata, potentially to be used in the generate_image_for_flip.ts.
`

export const GetNftMetadataSchema = z.object({
  tokenId: z.string().describe("The ID of the basic NFT"),
})

export const GetNftMetadataResponseSchema = z.object({
  metadata: z.object({
    name: z.string(),
    description: z.string(),
    game_version: z.string(),
    game_id: z.string(),
    game_tile_type: z.string(),
    game_level: z.string(),
    game_solved_board: z.string(),
  }),
  message: z.string(),
})

export async function getNftMetadata(
  args: z.infer<typeof GetNftMetadataSchema>, agentkit: FlippandoAgentkit
): Promise<z.infer<typeof GetNftMetadataResponseSchema>> {
    const flippando = new ethers.Contract(
        agentkit.getFlippandoAddress(),
        FlippandoABI.abi,
        agentkit.getSigner(),
    )

  try {
    console.log(`Getting NFT metadata for tokenId ${args.tokenId}`)
    const tokenURI = await flippando.tokenURI(args.tokenId)
    console.log(`Token URI: ${tokenURI}`)

    const rawMetadata = JSON.parse(tokenURI.toString())

    // Transform the raw metadata to match our schema
    const metadata = {
      name: rawMetadata.name,
      description: rawMetadata.description,
      game_version: rawMetadata.game_version,
      game_id: rawMetadata.game_id,
      game_tile_type: rawMetadata.game_tile_type,
      game_level: rawMetadata.game_level,
      game_solved_board: rawMetadata.game_solved_board,
    }

    const message = `NFT metadata retrieved for tokenId: ${args.tokenId}`
    console.log("Final message:", message)

    return {
      metadata,
      message,
    }
  } catch (error) {
    console.error("Error in getting NFT Metadata:", error)
    throw new Error(`Error getting NFT metadata: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export class GetNftMetadataAction
  implements FlippandoAction<typeof GetNftMetadataSchema, typeof GetNftMetadataResponseSchema>
{
  name = "get_nft_metadata"
  description = GET_FLIP_METADATA_PROMPT
  argsSchema = GetNftMetadataSchema
  responseSchema = GetNftMetadataResponseSchema
  func = getNftMetadata
}

