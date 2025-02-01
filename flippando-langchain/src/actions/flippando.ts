import type { z } from "zod"
import type { FlippandoAgentkitOptions } from "../flippando-agentkit"

/**
 * Type definition for any Flippando action schema
 */
export type FlippandoActionSchemaAny = z.ZodObject<any>

/**
 * Interface for Flippando actions
 */
export interface FlippandoAction<TSchema extends FlippandoActionSchemaAny> {
  name: string
  description: string
  argsSchema: TSchema
  func(config: z.infer<typeof FlippandoAgentkitOptions>, args: z.infer<TSchema>): Promise<string>
}

/**
 * Base class for Flippando actions
 */
export abstract class BaseFlippandoAction<TSchema extends FlippandoActionSchemaAny>
  implements FlippandoAction<TSchema>
{
  abstract name: string
  abstract description: string
  abstract argsSchema: TSchema
  abstract func(config: z.infer<typeof FlippandoAgentkitOptions>, args: z.infer<TSchema>): Promise<string>
}

/**
 * Union type of all Flippando action schemas
 */
export type FlippandoActionSchema = z.infer<FlippandoActionSchemaAny>

