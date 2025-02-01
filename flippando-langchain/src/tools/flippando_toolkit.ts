import { BaseToolkit as Toolkit, type StructuredToolInterface } from "@langchain/core/tools"
import type { FlippandoAgent } from "../agent"
import { FlippandoTool } from "./flippando_tool"
import { FLIPPANDO_ACTIONS } from "../actions"

export class FlippandoToolkit extends Toolkit {
  tools: StructuredToolInterface[]

  constructor(agent: FlippandoAgent) {
    super()
    this.tools = FLIPPANDO_ACTIONS.map(
      (action) =>
        new FlippandoTool(
          {
            ...action,
            execute: (args: any) => (agent as any)[action.name](args),
          },
          agent,
        ),
    )
  }
}

