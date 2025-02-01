import type { z } from "zod"
import type { FlippandoAgentkitOptions } from "../flippando-agentkit"

/**
 * Type definition for any Flippando action schema
 */
export type FlippandoActionSchemaAny = z.ZodObject<any>

/**
 * Interface for Flippando actions
 */
export interface FlippandoAction<TActionSchema extends FlippandoActionSchemaAny> {
  name: string
  description: string
  argsSchema: TActionSchema
  func(config: z.infer<typeof FlippandoAgentkitOptions>, args: z.infer<TActionSchema>): Promise<string>
}

/**
 * Base class for Flippando actions
 */
export abstract class BaseFlippandoAction<TActionSchema extends FlippandoActionSchemaAny>
  implements FlippandoAction<TActionSchema>
{
  abstract name: string
  abstract description: string
  abstract argsSchema: TActionSchema
  abstract func(config: z.infer<typeof FlippandoAgentkitOptions>, args: z.infer<TActionSchema>): Promise<string>
}

/**
 * Union type of all Flippando action schemas
 */
export type FlippandoActionSchema = z.infer<FlippandoActionSchemaAny>

