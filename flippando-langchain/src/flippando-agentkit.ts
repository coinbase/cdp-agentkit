import { z } from "zod"
import type { FlippandoAction, FlippandoActionSchemaAny } from "./actions/flippando"


/**
 * Configuration options for the Flippandos Agentkit
 */
interface FlippandoAgentkitOptions {
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
    providerUrl?: string;
    privateKey?: string;
    flippandoGameMasterAddress?: string;
    flippandoAddress?: string;
}

/**
 * Schema for the options required to initialize the FlippandoAgentkit.
 */
export const FlippandoAgentkitOptions = z
  .object({
    cdpApiKeyName: z.string().min(1, "The Cdp API key name is required").describe("The Cdp API key name"),
    cdpApiKeyPrivateKey: z.string().min(1, "The Cdp private key is required").describe("The Cdp API private key"),
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
  CDP_API_KEY_NAME: z
    .string()
    .url("CDP_API_KEY_NAME must be defined")
    .describe("Cdp API key name"),
  CDP_API_KEY_PRIVATE_KEY: z
    .string()
    .url("CDP_API_KEY_PRIVATE_KEY must be defined")
    .describe("Cdp API key private key"),
  FLIPPANDO_PROVIDER_URL: z
    .string()
    .url("FLIPPANDO_PROVIDER_URL must be a valid URL")
    .describe("The Flippando provider URL"),
  FLIPPANDO_PRIVATE_KEY: z
    .string()
    .min(1, "FLIPPANDO_PRIVATE_KEY is required")
    .describe("The private key for the wallet"),
  FLIPPANDO_GAMEMASTER_ADDRESS: z
    .string()
    .min(1, "FLIPPANDO_PRIVATE_KEY is required")
    .describe("The FlippandoGameMaster contract address"),
  FLIPPANDO_ADDRESS: z.string().min(1, "FLIPPANDO_ADDRESS is required").describe("The Flippando contract address"),
})


/**
 * Flippando Agentkit
 */
export class FlippandoAgentkit {
    private config: z.infer<typeof FlippandoAgentkitOptions>;
    
  /**
   * Initializes a new instance of FlippandoAgentkit with the provided options.
   * If no options are provided, it attempts to load the required environment variables.
   *
   * @param options - Optional. The configuration options for the FlippandoAgentkit.
   * @throws An error if the provided options are invalid or if the environment variables cannot be loaded.
   */
  public constructor(options?: z.infer<typeof FlippandoAgentkitOptions>) {
   
    try {
        const env = EnvSchema.parse(process.env);
  
        options = {
          cdpApiKeyName: options?.cdpApiKeyName || env.CDP_API_KEY_NAME!,
          cdpApiKeyPrivateKey: options?.cdpApiKeyPrivateKey || env.CDP_API_KEY_PRIVATE_KEY!,
          providerUrl:options?.providerUrl || env.FLIPPANDO_PROVIDER_URL!,
          privateKey: options?.privateKey || env.FLIPPANDO_PRIVATE_KEY!,
          flippandoGameMasterAddress: options?.flippandoGameMasterAddress || env.FLIPPANDO_GAMEMASTER_ADDRESS!,
          flippandoAddress: options?.flippandoAddress || env.FLIPPANDO_ADDRESS,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach(err => console.log(`Error: ${err.path[0]} is required`));
        }
        throw new Error("Flippando config could not be loaded.");
      }
  
      if (!this.validateOptions(options)) {
        throw new Error("Flippando Agentkit options could not be validated.");
      }
  
      this.config = options;
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
    args: TActionSchema,
  ): Promise<string> {
    return await action.func(args);
  }

  /**
   * Validates the provided options for the FarcasterAgentkit.
   *
   * @param options - The options to validate.
   * @returns True if the options are valid, otherwise false.
   */
  validateOptions(options: z.infer<typeof FlippandoAgentkitOptions>): boolean {
    try {
      FlippandoAgentkitOptions.parse(options);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => console.log("Error:", err.message));
      }

      return false;
    }

    return true;
  }
}

