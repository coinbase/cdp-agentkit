import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import type { FlippandoAgentkit } from "../../flippando-agentkit"
import { NeynarAPIClient } from "@neynar/nodejs-sdk"

const POST_FLIP_TO_FARCASTER_PROMPT = `
This action posts a message to Farcaster using the Flippando agent's Farcaster account via the Neynar API.
It takes a message and an image URL as input, and posts the message with the attached image to Farcaster.
`

export const PostFlipToFarcasterSchema = z.object({
  message: z.string().max(320, "Farcaster cast cannot exceed 320 characters").describe("The message to post on Farcaster"),
  imageUrl: z.string().url().describe("The URL of the image to attach to the Farcaster cast"),
})

export const PostFlipToFarcasterResponseSchema = z.object({
  castUrl: z.string().url(),
  message: z.string(),
})

export class PostFlipToFarcasterAction
  implements FlippandoAction<typeof PostFlipToFarcasterSchema, typeof PostFlipToFarcasterResponseSchema>
{
  name = "post_flip_to_farcaster"
  description = POST_FLIP_TO_FARCASTER_PROMPT
  argsSchema = PostFlipToFarcasterSchema
  responseSchema = PostFlipToFarcasterResponseSchema

  async func(
    args: z.infer<typeof PostFlipToFarcasterSchema>,
    agentkit: FlippandoAgentkit,
  ): Promise<z.infer<typeof PostFlipToFarcasterResponseSchema>> {
    try {
      const neynarApiKey = agentkit.getNeynarApiKey()
      const signerUuid = agentkit.getSignerUUID()

      const neynarClient = new NeynarAPIClient({ 
        apiKey: neynarApiKey
      })

      const response = await neynarClient.publishCast({
        signerUuid,
        text: args.message,
        embeds: [{ url: args.imageUrl }],
      })

      console.log("Farcaster response ", JSON.stringify(response, null, 2))

      //const castUrl = `https://warpcast.com/${response.cast.author.username}/${response.cast.hash}`
      const castUrl = ""
      
      return {
        castUrl,
        message: `Successfully posted cast with image: ${args.message}`,
      }
    } catch (error) {
      console.error("Error posting to Farcaster:", error)
      throw new Error(`Error posting to Farcaster: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}
