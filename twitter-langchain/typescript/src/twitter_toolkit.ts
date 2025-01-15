import { StructuredToolInterface, BaseToolkit as Toolkit } from "@langchain/core/tools";
import { TWITTER_ACTIONS, TwitterAgentkit } from "@coinbase/cdp-agentkit-core";
import { TwitterTool } from "./twitter_tool";

/**
 * Twitter (X) Toolkit.
 *
 * Security Note: This toolkit contains tools that can read and modify
 * the state of a service; e.g., by creating, deleting, or updating,
 * reading underlying data.
 *
 * For example, this toolkit can be used to get account details,
 * account mentions, post tweets, post tweet replies, and anything,
 * else you can implement with the Twitter (X) API!
 *
 * Setup:
 * You will need to set the following environment variables:
 * ```bash
 * export OPENAI_API_KEY=<your-openai-api-key>
 * export TWITTER_API_KEY=<your-api-key>
 * export TWITTER_API_SECRET=<your-api-secret>
 * export TWITTER_ACCESS_TOKEN=<your-access-token>
 * export TWITTER_ACCESS_TOKEN_SECRET=<your-access-token-secret>
 * ```
 *
 * Example usage:
 * ```typescript
 * // optional if not available via the ENV
 * const options = {
 *  apiKey: "<your-api-key>",
 *  apiSecret: "<your-api-secret>",
 *  accessToken: "<your-access-token>",
 *  accessTokenSecret: "<your-access-token-secret>",
 * };
 *
 * const agentkit = await TwitterAgentkit.configureWithOptions(options);
 * const toolkit = new TwitterToolkit(agentkit);
 * const tools = toolkit.getTools();
 *
 * // Available tools include:
 * // - account_details
 * // - account_mentions
 * // - post_tweet
 * // - post_tweet_reply
 * ```
 */
export class TwitterToolkit extends Toolkit {
  tools: StructuredToolInterface[];

  /**
   * Creates a new Twitter (X) Toolkit instance
   *
   * @param agentkit - Twitter (X) agentkit instance
   */
  constructor(agentkit: TwitterAgentkit) {
    super();
    const actions = TWITTER_ACTIONS;
    const tools = actions.map(action => new TwitterTool(action, agentkit));
    this.tools = tools;
  }
}
