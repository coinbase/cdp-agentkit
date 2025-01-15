/**
 * This module provides functionality to retrieve account mentions from Twitter (X).
 */

import { z } from "zod";
import { TwitterAction } from "./twitter_action";
import { TwitterApi } from "twitter-api-v2";

/**
 * Prompt message describing the account mentions tool.
 * A successful response will return a message with the API response in JSON format,
 * while a failure response will indicate an error from the Twitter API.
 */
const ACCOUNT_MENTIONS_PROMPT = `
This tool will return mentions for the specified Twitter (X) user id.

A successful response will return a message with the API response as a JSON payload:
    {"data": [{"id": "1857479287504584856", "text": "@CDPAgentKit reply"}]}

A failure response will return a message with the Twitter API request error:
    Error retrieving user mentions: 429 Too Many Requests
`;

/**
 * Input argument schema for the account mentions action.
 */
export const AccountMentionsInput = z
  .object({
    userId: z
      .string()
      .min(1, "Account ID is required.")
      .describe("The Twitter (X) user id to return mentions for"),
  })
  .strip()
  .describe("Input schema for retrieving account mentions");

/**
 * Retrieves mentions for a specified Twitter (X) user.
 *
 * @param client - The Twitter (X) client used to authenticate with.
 * @param args - The input arguments for the action.
 * @returns A message indicating the success or failure of the mention retrieval.
 */
export async function accountMentions(
  client: TwitterApi,
  args: z.infer<typeof AccountMentionsInput>,
): Promise<string> {
  try {
    const response = await client.v2.userMentionTimeline(args.userId);
    return `Successfully retrieved account mentions:\n${JSON.stringify(response)}`;
  } catch (error) {
    return `Error retrieving authenticated account mentions: ${error}`;
  }
}

/**
 * Account Mentions Action
 */
export class AccountMentionsAction implements TwitterAction<typeof AccountMentionsInput> {
  public name = "account_mentions";
  public description = ACCOUNT_MENTIONS_PROMPT;
  public argsSchema = AccountMentionsInput;
  public func = accountMentions;
}
