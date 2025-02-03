import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import type { FlippandoAgentkit } from "../../flippando-agentkit"
import { TwitterApi } from "twitter-api-v2"
import { exec } from "child_process"
import { promisify } from "util"
import * as fs from "fs"
import * as path from "path"

const execAsync = promisify(exec)

const POST_TO_TWITTER_PROMPT = `
This action posts a message to Twitter using the Flippando agent's Twitter account.
It takes a message and an SVG string as input, converts the SVG to a PNG image,
and posts the tweet with the attached image.
`

export const PostToTwitterSchema = z.object({
  message: z.string().max(280, "Tweet cannot exceed 280 characters").describe("The message to post on Twitter"),
  svgString: z.string().describe("The SVG string to be converted and attached to the tweet"),
})

export const PostToTwitterResponseSchema = z.object({
  tweetUrl: z.string().url(),
  message: z.string(),
})

export class PostToTwitterAction
  implements FlippandoAction<typeof PostToTwitterSchema, typeof PostToTwitterResponseSchema>
{
  name = "post_to_twitter"
  description = POST_TO_TWITTER_PROMPT
  argsSchema = PostToTwitterSchema
  responseSchema = PostToTwitterResponseSchema

  async func(
    args: z.infer<typeof PostToTwitterSchema>,
    agentkit: FlippandoAgentkit,
  ): Promise<z.infer<typeof PostToTwitterResponseSchema>> {
    try {
      const twitterClient = new TwitterApi({
        appKey: agentkit.getTwitterApiKey(),
        appSecret: agentkit.getTwitterApiSecret(),
        accessToken: agentkit.getTwitterAccessToken(),
        accessSecret: agentkit.getTwitterAccessSecret(),
      })

      // Convert SVG to PNG
      const tempDir = path.join(__dirname, "temp")
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir)
      }
      const svgPath = path.join(tempDir, "temp.svg")
      const pngPath = path.join(tempDir, "temp.png")

      fs.writeFileSync(svgPath, args.svgString)

      await execAsync(`npx svgexport ${svgPath} ${pngPath} 2x`)

      const pngBuffer = fs.readFileSync(pngPath)

      // Clean up temporary files
      fs.unlinkSync(svgPath)
      fs.unlinkSync(pngPath)

      // Upload the image to Twitter
      const mediaId = await twitterClient.v1.uploadMedia(pngBuffer, { mimeType: "image/png" })

      // Post the tweet with the uploaded image
      const { data: createdTweet } = await twitterClient.v2.tweet(args.message, { media: { media_ids: [mediaId] } })

      const tweetUrl = `https://twitter.com/user/status/${createdTweet.id}`

      return {
        tweetUrl,
        message: `Successfully posted tweet with image: ${args.message}`,
      }
    } catch (error) {
      console.error("Error posting to Twitter:", error)
      throw new Error(`Error posting to Twitter: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

