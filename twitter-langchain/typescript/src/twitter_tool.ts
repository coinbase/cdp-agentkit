import { StructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import {
  TwitterAction,
  TwitterActionSchemaAny,
  TwitterAgentkit,
} from "@coinbase/cdp-agentkit-core";

/**
 * This tool allows agents to interact with the Twitter (X) API and control an authenticated Twitter account.
 *
 * To use this tool, you must first set the following environment variables:
 * - TWITTER_API_KEY
 * - TWITTER_API_SECRET
 * - TWITTER_ACCESS_TOKEN
 * - TWITTER_ACCESS_TOKEN_SECRET
 * - TWITTER_BEARER_TOKEN
 */
export class TwitterTool<TActionSchema extends TwitterActionSchemaAny> extends StructuredTool {
  /**
   * Schema definition for the tool's input.
   */
  public schema: TActionSchema;

  /**
   * The name of the tool.
   */
  public name: string;

  /**
   * The description of the tool.
   */
  public description: string;

  /**
   * The Twitter (X) Agentkit instance.
   */
  private agentkit: TwitterAgentkit;

  /**
   * The Twitter (X) Action.
   */
  private action: TwitterAction<TActionSchema>;

  /**
   * Constructor for the Twitter (X) Tool class.
   *
   * @param action - The Twitter (X) action to execute.
   * @param agentkit - The Twitter (X) wrapper to use.
   */
  constructor(action: TwitterAction<TActionSchema>, agentkit: TwitterAgentkit) {
    super();

    this.action = action;
    this.agentkit = agentkit;
    this.name = action.name;
    this.description = action.description;
    this.schema = action.argsSchema;
  }

  /**
   * Executes the Twitter (X) action with the provided input.
   *
   * @param input - An object containing either instructions or schema-validated arguments.
   * @returns A promise that resolves to the result of the Twitter (X) action.
   */
  protected async _call(
    input: z.infer<typeof this.schema> & Record<string, unknown>,
  ): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let args: any;

      // If we have a schema, try to validate against it
      if (this.schema) {
        try {
          const validatedInput = this.schema.parse(input);
          args = validatedInput;
        } catch (validationError) {
          // If schema validation fails, fall back to instructions-only mode
          args = input;
        }
      }
      // No schema, use instructions mode
      else {
        args = input;
      }

      return await this.agentkit.run(this.action, args);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return `Error executing ${this.name}: ${error.message}`;
      }
      return `Error executing ${this.name}: Unknown error occurred`;
    }
  }
}
