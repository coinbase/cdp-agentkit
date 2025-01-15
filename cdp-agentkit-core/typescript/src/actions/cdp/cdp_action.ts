import { z } from "zod";
import { Wallet } from "@coinbase/coinbase-sdk";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CdpActionSchemaAny = z.ZodObject<any, any, any, any>;

/**
 * Represents the base structure for CDP Actions.
 */
export interface CdpAction<TActionSchema extends CdpActionSchemaAny> {
  /**
   * The name of the action
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
    | ((wallet: Wallet, args: z.infer<TActionSchema>) => Promise<string>)
    | ((args: z.infer<TActionSchema>) => Promise<string>);
}
