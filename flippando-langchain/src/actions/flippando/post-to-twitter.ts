import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import type { FlippandoAgentkit } from "../../flippando-agentkit"
import { TwitterApi } from "twitter-api-v2"

const POST_TO_TWITTER_PROMPT = `
This action posts a message to Twitter using the Flippando agent's Twitter account.
It takes a message as input and returns the URL of the posted tweet.
`

export const PostToTwitterSchema = z.object({
  message: z.string().max(280, "Tweet cannot exceed 280 characters").describe("The message to post on Twitter"),
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

      const { data: createdTweet } = await twitterClient.v2.tweet(args.message)

      const tweetUrl = `https://twitter.com/user/status/${createdTweet.id}`

      return {
        tweetUrl,
        message: `Successfully posted tweet: ${args.message}`,
      }
    } catch (error) {
      console.error("Error posting to Twitter:", error)
      throw new Error(`Error posting to Twitter: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

