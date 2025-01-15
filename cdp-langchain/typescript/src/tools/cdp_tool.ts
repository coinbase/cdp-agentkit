import { StructuredTool } from "@langchain/core/tools";
import { CdpAgentkit, CdpAction, CdpActionSchemaAny } from "@coinbase/cdp-agentkit-core";
import { z } from "zod";

/**
 * This tool allows agents to interact with the cdp-sdk library and control an MPC Wallet onchain.
 *
 * To use this tool, you must first set as environment variables:
 *     CDP_API_KEY_NAME
 *     CDP_API_KEY_PRIVATE_KEY
 *     NETWORK_ID
 */
export class CdpTool<TActionSchema extends CdpActionSchemaAny> extends StructuredTool {
  /**
   * Schema definition for the tool's input
   */
  public schema: TActionSchema;

  /**
   * The name of the tool
   */
  public name: string;

  /**
   * The description of the tool
   */
  public description: string;

  /**
   * The CDP Agentkit instance
   */
  private agentkit: CdpAgentkit;

  /**
   * The CDP Action
   */
  private action: CdpAction<TActionSchema>;

  /**
   * Constructor for the CDP Tool class
   *
   * @param action - The CDP action to execute
   * @param agentkit - The CDP wrapper to use
   */
  constructor(action: CdpAction<TActionSchema>, agentkit: CdpAgentkit) {
    super();
    this.action = action;
    this.agentkit = agentkit;
    this.name = action.name;
    this.description = action.description;
    this.schema = action.argsSchema;
  }

  /**
   * Executes the CDP action with the provided input
   *
   * @param input - An object containing either instructions or schema-validated arguments
   * @returns A promise that resolves to the result of the CDP action
   * @throws {Error} If the CDP action fails
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
