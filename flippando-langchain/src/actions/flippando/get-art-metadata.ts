import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoBundlerABI from "../../abis/FlippandoBundler.json"
import { FlippandoAgentkit } from "../../flippando-agentkit"

const GET_ART_METADATA_PROMPT = `
This action gets an art NFT and returns its metadata.
It returns the art NFT metadata, potentially to be used in the generate_image_for_art.ts.
`

export const GetArtMetadataSchema = z.object({
  tokenId: z.string().describe("The ID of the art NFT"),
})

export const GetArtMetadataResponseSchema = z.object({
  metadata: z.string(),
  message: z.string(),
})

export async function getArtMetadata(
  args: z.infer<typeof GetArtMetadataSchema>, agentkit: FlippandoAgentkit
): Promise<z.infer<typeof GetArtMetadataResponseSchema>> {
    const flippandoBundler = new ethers.Contract(
        agentkit.getFlippandoBundlerAddress(),
        FlippandoBundlerABI.abi,
        agentkit.getSigner(),
    )

  try {
    console.log(`Getting ART metadata for tokenId ${args.tokenId}`)
    const tokenURI = await flippandoBundler.tokenURI(args.tokenId)
    console.log(`Token URI: ${tokenURI}`)

    const metadata = tokenURI.toString()

    const message = `Art metadata retrieved for tokenId: ${args.tokenId}`
    console.log("Final message:", message)

    return {
      metadata,
      message,
    }
  } catch (error) {
    console.error("Error in getting ART Metadata:", error)
    throw new Error(`Error getting ART metadata: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export class GetArtMetadataAction
  implements FlippandoAction<typeof GetArtMetadataSchema, typeof GetArtMetadataResponseSchema>
{
  name = "get_art_metadata"
  description = GET_ART_METADATA_PROMPT
  argsSchema = GetArtMetadataSchema
  responseSchema = GetArtMetadataResponseSchema
  func = getArtMetadata
}

