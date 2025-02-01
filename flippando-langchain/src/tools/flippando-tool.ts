import { StructuredTool } from "@langchain/core/tools"
import type { z } from "zod"
import type { FlippandoAction, FlippandoActionSchemaAny } from "../actions/flippando"
import type { FlippandoAgentkit } from "../flippando-agentkit"

export class FlippandoTool <TActionSchema extends FlippandoActionSchemaAny> extends StructuredTool {
  public schema: TActionSchema;
  public name: string
  public description: string
  private agentkit: FlippandoAgentkit
  private action: FlippandoAction<TActionSchema>

  constructor(action: FlippandoAction<TActionSchema>, agentkit: FlippandoAgentkit) {
    super()

    this.action = action
    this.agentkit = agentkit
    this.name = action.name
    this.description = action.description
    this.schema = action.argsSchema
  }

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

