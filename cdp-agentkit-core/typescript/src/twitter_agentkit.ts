import { TwitterApi, TwitterApiTokens } from "twitter-api-v2";
import { z } from "zod";
import { TwitterAction, TwitterActionSchemaAny } from "./actions/cdp/social/twitter";

/**
 * Schema for the options required to initialize the TwitterAgentkit.
 */
export const TwitterAgentkitOptions = z
  .object({
    apiKey: z
      .string()
      .min(1, "The Twitter (X) API key is required")
      .describe("The Twitter (X) API key"),
    apiSecret: z
      .string()
      .min(1, "The Twitter (X) API secret is required")
      .describe("The Twitter (X) API secret"),
    accessToken: z
      .string()
      .min(1, "The Twitter (X) access token is required")
      .describe("The Twitter (X) access token"),
    accessTokenSecret: z
      .string()
      .min(1, "The Twitter (X) access token secret is required")
      .describe("The Twitter (X) access token secret"),
  })
  .strip()
  .describe("Options for initializing TwitterAgentkit");

/**
 * Schema for the environment variables required for TwitterAgentkit.
 */
const EnvSchema = z.object({
  TWITTER_API_KEY: z
    .string()
    .min(1, "TWITTER_API_KEY is required")
    .describe("The Twitter (X) API key"),
  TWITTER_API_SECRET: z
    .string()
    .min(1, "TWITTER_API_SECRET is required")
    .describe("The Twitter (X) API secret"),
  TWITTER_ACCESS_TOKEN: z
    .string()
    .min(1, "TWITTER_ACCESS_TOKEN is required")
    .describe("The Twitter (X) access token"),
  TWITTER_ACCESS_TOKEN_SECRET: z
    .string()
    .min(1, "TWITTER_ACCESS_TOKEN_SECRET is required")
    .describe("The Twitter (X) access token secret"),
});

/**
 * Twitter Agentkit
 */
export class TwitterAgentkit {
  private client: TwitterApi;

  /**
   * Initializes a new instance of TwitterAgentkit with the provided options.
   * If no options are provided, it attempts to load the required environment variables.
   *
   * @param options - Optional. The configuration options for the TwitterAgentkit.
   * @throws An error if the provided options are invalid or if the environment variables cannot be loaded.
   */
  public constructor(options?: z.infer<typeof TwitterAgentkitOptions>) {
    if (!options) {
      try {
        const env = EnvSchema.parse(process.env);

        options = {
          apiKey: env.TWITTER_API_KEY!,
          apiSecret: env.TWITTER_API_SECRET!,
          accessToken: env.TWITTER_ACCESS_TOKEN!,
          accessTokenSecret: env.TWITTER_ACCESS_TOKEN_SECRET!,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach(err => console.log(`Error: ${err.path[0]} is required`));
        }
        throw new Error("Twitter (X) ENV could not be loaded.");
      }
    }

    if (!this.validateOptions(options)) {
      throw new Error("Twitter (X) Agentkit options could not be validated.");
    }

    this.client = new TwitterApi({
      appKey: options.apiKey,
      appSecret: options.apiSecret,
      accessToken: options.accessToken,
      accessSecret: options.accessTokenSecret,
    } as TwitterApiTokens);
  }

  /**
   * Validates the provided options for the TwitterAgentkit.
   *
   * @param options - The options to validate.
   * @returns True if the options are valid, otherwise false.
   */
  validateOptions(options: z.infer<typeof TwitterAgentkitOptions>): boolean {
    try {
      TwitterAgentkitOptions.parse(options);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => console.log("Error:", err.message));
      }

      return false;
    }

    return true;
  }

  /**
   * Executes a Twitter (X) action.
   *
   * @param action - The Twitter (X) action to execute.
   * @param args - The arguments for the action.
   * @returns The result of the execution.
   */
  async run<TActionSchema extends TwitterActionSchemaAny>(
    action: TwitterAction<TActionSchema>,
    args: TActionSchema,
  ): Promise<string> {
    return await action.func(this.client, args);
  }
}
