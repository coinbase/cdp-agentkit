import { StructuredTool } from "@langchain/core/tools"
import type { z } from "zod"
import type { FlippandoAgent } from "../agent"
import type { FlippandoAction } from "../actions"

interface FlippandoToolAction extends FlippandoAction {
  execute: (args: any) => Promise<any>
}

export class FlippandoTool extends StructuredTool {
  name: string
  description: string
  schema: z.ZodObject<any>
  private agent: FlippandoAgent
  private action: FlippandoToolAction

  constructor(action: FlippandoToolAction, agent: FlippandoAgent) {
    super()
    this.action = action
    this.agent = agent
    this.name = action.name
    this.description = action.description
    this.schema = action.argsSchema
  }

  protected async _call(args: z.infer<typeof this.schema>): Promise<string> {
    try {
      const result = await this.action.execute(args)
      return JSON.stringify(result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return `Error executing ${this.name}: ${error.message}`
      }
      return `Error executing ${this.name}: Unknown error occurred`
    }
  }
}

