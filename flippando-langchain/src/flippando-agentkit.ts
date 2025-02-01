import { z } from "zod"
import type { FlippandoAction, FlippandoActionSchemaAny } from "./actions/flippando"
import { FlippandoToolkit } from "./tools/flippando-toolkit"

/**
 * Schema for the options required to initialize the FlippandoAgentkit.
 */
export const FlippandoAgentkitOptions = z
  .object({
    providerUrl: z.string().url("The provider URL must be a valid URL").describe("The Ethereum provider URL"),
    privateKey: z.string().min(1, "The private key is required").describe("The private key for the Ethereum wallet"),
    flippandoGameMasterAddress: z
      .string()
      .min(1, "The FlippandoGameMaster contract address is required")
      .describe("The FlippandoGameMaster contract address"),
    flippandoAddress: z
      .string()
      .min(1, "The Flippando contract address is required")
      .describe("The Flippando contract address"),
  })
  .strip()
  .describe("Options for initializing FlippandoAgentkit")

/**
 * Schema for the environment variables required for FlippandoAgentkit.
 */
const EnvSchema = z.object({
  ETHEREUM_PROVIDER_URL: z
    .string()
    .url("ETHEREUM_PROVIDER_URL must be a valid URL")
    .describe("The Ethereum provider URL"),
  ETHEREUM_PRIVATE_KEY: z
    .string()
    .min(1, "ETHEREUM_PRIVATE_KEY is required")
    .describe("The private key for the Ethereum wallet"),
  FLIPPANDO_GAME_MASTER_ADDRESS: z
    .string()
    .min(1, "FLIPPANDO_GAME_MASTER_ADDRESS is required")
    .describe("The FlippandoGameMaster contract address"),
  FLIPPANDO_ADDRESS: z.string().min(1, "FLIPPANDO_ADDRESS is required").describe("The Flippando contract address"),
})

/**
 * Flippando Agentkit
 */
export class FlippandoAgentkit {
  private config: z.infer<typeof FlippandoAgentkitOptions>
  public toolkit: FlippandoToolkit

  /**
   * Initializes a new instance of FlippandoAgentkit with the provided options.
   * If no options are provided, it attempts to load the required environment variables.
   *
   * @param options - Optional. The configuration options for the FlippandoAgentkit.
   * @throws An error if the provided options are invalid or if the environment variables cannot be loaded.
   */
  public constructor(options?: z.infer<typeof FlippandoAgentkitOptions>) {
    try {
      const env = EnvSchema.parse(process.env)

      options = {
        providerUrl: options?.providerUrl || env.ETHEREUM_PROVIDER_URL,
        privateKey: options?.privateKey || env.ETHEREUM_PRIVATE_KEY,
        flippandoGameMasterAddress: options?.flippandoGameMasterAddress || env.FLIPPANDO_GAME_MASTER_ADDRESS,
        flippandoAddress: options?.flippandoAddress || env.FLIPPANDO_ADDRESS,
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => console.log(`Error: ${err.path[0]} is required`))
      }
      throw new Error("Flippando config could not be loaded.")
    }

    if (!this.validateOptions(options)) {
      throw new Error("Flippando Agentkit options could not be validated.")
    }

    this.config = options
    this.toolkit = new FlippandoToolkit(this)
  }

  /**
   * Validates the provided options for the FlippandoAgentkit.
   *
   * @param options - The options to validate.
   * @returns True if the options are valid, otherwise false.
   */
  private validateOptions(options: z.infer<typeof FlippandoAgentkitOptions>): boolean {
    try {
      FlippandoAgentkitOptions.parse(options)
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => console.log("Error:", err.message))
      }

      return false
    }

    return true
  }

  /**
   * Executes a Flippando action.
   *
   * @param action - The Flippando action to execute.
   * @param args - The arguments for the action.
   * @returns The result of the execution.
   */
  async run<TActionSchema extends FlippandoActionSchemaAny>(
    action: FlippandoAction<TActionSchema>,
    args: z.infer<TActionSchema>,
  ): Promise<string> {
    return await action.func(this.config, args)
  }

  /**
   * Gets the Ethereum provider URL.
   * @returns The Ethereum provider URL.
   */
  getProviderUrl(): string {
    return this.config.providerUrl
  }

  /**
   * Gets the FlippandoGameMaster contract address.
   * @returns The FlippandoGameMaster contract address.
   */
  getFlippandoGameMasterAddress(): string {
    return this.config.flippandoGameMasterAddress
  }

  /**
   * Gets the Flippando contract address.
   * @returns The Flippando contract address.
   */
  getFlippandoAddress(): string {
    return this.config.flippandoAddress
  }

  getTools() {
    return this.toolkit.tools
  }
}

