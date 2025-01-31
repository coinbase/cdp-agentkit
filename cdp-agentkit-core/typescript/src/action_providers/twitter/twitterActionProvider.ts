import { z } from "zod";
import { ActionProvider } from "../action_provider";
import { CreateAction } from "../action_decorator";
import { TwitterApi, TwitterApiTokens } from "twitter-api-v2";
import { Network } from "../../wallet_providers/wallet_provider";
import {
  TwitterAccountDetailsSchema,
  TwitterAccountMentionsSchema,
  TwitterPostTweetSchema,
  TwitterPostTweetReplySchema,
} from "./schemas";

/**
 * Configuration options for the TwitterActionProvider.
 */
export interface TwitterActionProviderConfig {
  /**
   * Twitter API Key
   */
  apiKey?: string;

  /**
   * Twitter API Secret
   */
  apiSecret?: string;

  /**
   * Twitter Access Token
   */
  accessToken?: string;

  /**
   * Twitter Access Token Secret
   */
  accessTokenSecret?: string;
}

/**
 * TwitterActionProvider is an action provider for Twitter (X) interactions.
 */
export class TwitterActionProvider extends ActionProvider {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly accessToken: string;
  private readonly accessTokenSecret: string;
  private readonly client: TwitterApi;

  /**
   * Constructor for the TwitterActionProvider class.
   * @param config - The configuration options for the TwitterActionProvider
   */
  constructor(config: TwitterActionProviderConfig = {}) {
    super("twitter", []);

    if (config.apiKey) {
      this.apiKey = config.apiKey;
    } else if (process.env.TWITTER_API_KEY) {
      this.apiKey = process.env.TWITTER_API_KEY;
    } else {
      throw new Error("Twitter API Key is not configured.");
    }

    if (config.apiSecret) {
      this.apiSecret = config.apiSecret;
    } else if (process.env.TWITTER_API_SECRET) {
      this.apiSecret = process.env.TWITTER_API_SECRET;
    } else {
      throw new Error("Twitter API Secret is not configured.");
    }

    if (config.accessToken) {
      this.accessToken = config.accessToken;
    } else if (process.env.TWITTER_ACCESS_TOKEN) {
      this.accessToken = process.env.TWITTER_ACCESS_TOKEN;
    } else {
      throw new Error("Twitter Access Token is not configured.");
    }

    if (config.accessTokenSecret) {
      this.accessTokenSecret = config.accessTokenSecret;
    } else if (process.env.TWITTER_ACCESS_TOKEN_SECRET) {
      this.accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
    } else {
      throw new Error("Twitter Access Token Secret is not configured.");
    }

    this.client = new TwitterApi({
      appKey: this.apiKey,
      appSecret: this.apiSecret,
      accessToken: this.accessToken,
      accessSecret: this.accessTokenSecret,
    } as TwitterApiTokens);
  }

  /**
   * Get account details for the currently authenticated Twitter (X) user.
   */
  @CreateAction({
    name: "twitter_account_details",
    description: `
This tool will return account details for the currently authenticated Twitter (X) user context.

A successful response will return a message with the api response as a json payload:
    {"data": {"id": "1853889445319331840", "name": "CDP AgentKit", "username": "CDPAgentKit"}}

A failure response will return a message with a Twitter API request error:
    Error retrieving authenticated user account: 429 Too Many Requests`,
    schema: TwitterAccountDetailsSchema,
  })
  async accountDetails(_: z.infer<typeof TwitterAccountDetailsSchema>): Promise<string> {
    try {
      const response = await this.client.v2.me();
      response.data.url = `https://x.com/${response.data.username}`;
      return `Successfully retrieved authenticated user account details:\n${JSON.stringify(
        response,
      )}`;
    } catch (error) {
      return `Error retrieving authenticated user account details: ${error}`;
    }
  }

  /**
   * Get mentions for a specified Twitter (X) user.
   */
  @CreateAction({
    name: "twitter_account_mentions",
    description: `
This tool will return mentions for the specified Twitter (X) user id.

A successful response will return a message with the API response as a JSON payload:
    {"data": [{"id": "1857479287504584856", "text": "@CDPAgentKit reply"}]}

A failure response will return a message with the Twitter API request error:
    Error retrieving user mentions: 429 Too Many Requests`,
    schema: TwitterAccountMentionsSchema,
  })
  async accountMentions(args: z.infer<typeof TwitterAccountMentionsSchema>): Promise<string> {
    try {
      const response = await this.client.v2.userMentionTimeline(args.userId);
      return `Successfully retrieved account mentions:\n${JSON.stringify(response)}`;
    } catch (error) {
      return `Error retrieving authenticated account mentions: ${error}`;
    }
  }

  /**
   * Post a tweet on Twitter (X).
   */
  @CreateAction({
    name: "twitter_post_tweet",
    description: `
This tool will post a tweet on Twitter. The tool takes the text of the tweet as input. Tweets can be maximum 280 characters.

A successful response will return a message with the API response as a JSON payload:
    {"data": {"text": "hello, world!", "id": "0123456789012345678", "edit_history_tweet_ids": ["0123456789012345678"]}}

A failure response will return a message with the Twitter API request error:
    You are not allowed to create a Tweet with duplicate content.`,
    schema: TwitterPostTweetSchema,
  })
  async postTweet(args: z.infer<typeof TwitterPostTweetSchema>): Promise<string> {
    try {
      const response = await this.client.v2.tweet(args.tweet);
      return `Successfully posted to Twitter:\n${JSON.stringify(response)}`;
    } catch (error) {
      return `Error posting to Twitter:\n${error}`;
    }
  }

  /**
   * Post a reply to a tweet on Twitter (X).
   */
  @CreateAction({
    name: "twitter_post_tweet_reply",
    description: `
This tool will post a tweet on Twitter. The tool takes the text of the tweet as input. Tweets can be maximum 280 characters.

A successful response will return a message with the API response as a JSON payload:
    {"data": {"text": "hello, world!", "id": "0123456789012345678", "edit_history_tweet_ids": ["0123456789012345678"]}}

A failure response will return a message with the Twitter API request error:
    You are not allowed to create a Tweet with duplicate content.`,
    schema: TwitterPostTweetReplySchema,
  })
  async postTweetReply(args: z.infer<typeof TwitterPostTweetReplySchema>): Promise<string> {
    try {
      const response = await this.client.v2.tweet(args.tweetReply, {
        reply: { in_reply_to_tweet_id: args.tweetId },
      });

      return `Successfully posted reply to Twitter:\n${JSON.stringify(response)}`;
    } catch (error) {
      return `Error posting reply to Twitter: ${error}`;
    }
  }

  /**
   * Checks if the Twitter action provider supports the given network.
   * Twitter actions don't depend on blockchain networks, so always return true.
   */
  supportsNetwork(_: Network): boolean {
    return true;
  }
}

export const twitterActionProvider = (config: TwitterActionProviderConfig = {}) =>
  new TwitterActionProvider(config);
