import { z } from "zod";
import { TwitterApi } from "twitter-api-v2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TwitterActionSchemaAny = z.ZodObject<any, any, any, any>;

/**
 * Represents the base structure for Twitter (X) Actions.
 */
export interface TwitterAction<TActionSchema extends TwitterActionSchemaAny> {
  /**
   * The name of the action.
   */
  name: string;

  /**
   * A description of what the action does
   */
  description: string;

  /**
   * Schema for validating action arguments
   */
  argsSchema: TActionSchema;

  /**
   * The function to execute for this action
   */
  func:
    | ((client: TwitterApi, args: z.infer<TActionSchema>) => Promise<string>)
    | ((args: z.infer<TActionSchema>) => Promise<string>);
}
