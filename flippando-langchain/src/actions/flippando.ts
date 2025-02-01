import type { z } from "zod"

/**
 * Type definition for any Flippando action schema
 */
export type FlippandoActionSchemaAny = z.ZodObject<any, any, any, any>

/**
 * Interface for Flippando actions
 */
export interface FlippandoAction<TActionSchema extends FlippandoActionSchemaAny> {
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
  func: ((args: z.infer<TActionSchema>) => Promise<string>);
}
