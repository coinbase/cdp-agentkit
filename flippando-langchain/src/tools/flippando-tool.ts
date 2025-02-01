import { StructuredTool } from "@langchain/core/tools"
import type { z } from "zod"
import type { FlippandoAction, FlippandoActionSchemaAny } from "../actions/flippando"
import type { FlippandoAgentkit } from "../flippando-agentkit"

export class FlippandoTool extends StructuredTool {
  public schema: z.ZodObject<any>
  public name: string
  public description: string
  private agentkit: FlippandoAgentkit
  private action: FlippandoAction<FlippandoActionSchemaAny>

  constructor(action: FlippandoAction<FlippandoActionSchemaAny>, agentkit: FlippandoAgentkit) {
    super()

    this.action = action
    this.agentkit = agentkit
    this.name = action.name
    this.description = action.description
    this.schema = action.argsSchema
  }

  protected async _call(input: z.infer<FlippandoActionSchemaAny> & Record<string, unknown>): Promise<string> {
    try {
      let args: any

      if (this.schema) {
        try {
          const validatedInput = this.schema.parse(input)
          args = validatedInput
        } catch (validationError) {
          args = input
        }
      } else {
        args = input
      }

      return await this.agentkit.run(this.action, args)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return `Error executing ${this.name}: ${error.message}`
      }
      return `Error executing ${this.name}: Unknown error occurred`
    }
  }
}

