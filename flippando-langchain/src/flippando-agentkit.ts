import { z } from "zod"
import type { FlippandoAction, FlippandoActionSchemaAny, TResponseSchema } from "./actions/flippando"
import { ethers } from "ethers"

interface FlippandoAgentkitOptions {
  cdpApiKeyName?: string
  cdpApiKeyPrivateKey?: string
  providerUrl?: string
  privateKey?: string
  flippandoGameMasterAddress?: string
  flippandoAddress?: string
  chainId?: number
}

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
    chainId: z.number().int().positive().describe("The chain ID"),
  })
  .strip()
  .describe("Options for initializing FlippandoAgentkit")

const EnvSchema = z.object({
  CDP_API_KEY_NAME: z.string().min(1, "CDP_API_KEY_NAME must be defined").describe("Cdp API key name"),
  CDP_API_KEY_PRIVATE_KEY: z
    .string()
    .min(1, "CDP_API_KEY_PRIVATE_KEY must be defined")
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
    .min(1, "FLIPPANDO_GAMEMASTER_ADDRESS is required")
    .describe("The FlippandoGameMaster contract address"),
  FLIPPANDO_ADDRESS: z.string().min(1, "FLIPPANDO_ADDRESS is required").describe("The Flippando contract address"),
  FLIPPANDO_CHAIN_ID: z.string().transform(Number).pipe(z.number().int().positive()).describe("The chain ID"),
})

export class FlippandoAgentkit {
  private config: z.infer<typeof FlippandoAgentkitOptions>
  private provider: ethers.providers.JsonRpcProvider
  private signer: ethers.Wallet

  public constructor(options?: z.infer<typeof FlippandoAgentkitOptions>) {
    try {
      const env = EnvSchema.parse(process.env)

      options = {
        cdpApiKeyName: options?.cdpApiKeyName || env.CDP_API_KEY_NAME,
        cdpApiKeyPrivateKey: options?.cdpApiKeyPrivateKey || env.CDP_API_KEY_PRIVATE_KEY,
        providerUrl: options?.providerUrl || env.FLIPPANDO_PROVIDER_URL,
        privateKey: options?.privateKey || env.FLIPPANDO_PRIVATE_KEY,
        flippandoGameMasterAddress: options?.flippandoGameMasterAddress || env.FLIPPANDO_GAMEMASTER_ADDRESS,
        flippandoAddress: options?.flippandoAddress || env.FLIPPANDO_ADDRESS,
        chainId: options?.chainId || env.FLIPPANDO_CHAIN_ID,
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
    this.provider = new ethers.providers.JsonRpcProvider(this.config.providerUrl)
    this.signer = new ethers.Wallet(this.config.privateKey!, this.provider)
  }

  async run<TActionSchema extends FlippandoActionSchemaAny>(
    action: FlippandoAction<TActionSchema, TResponseSchema>,
    args: TActionSchema,
  ): Promise<string> {
    return await action.func(args, this)
  }

  validateOptions(options: z.infer<typeof FlippandoAgentkitOptions>): boolean {
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

  async updateNetwork(
    chainId: number,
    rpcUrl: string,
    flippandoGameMasterAddress: string,
    flippandoAddress: string,
  ): Promise<void> {
    this.config.chainId = chainId
    this.config.providerUrl = rpcUrl
    this.config.flippandoGameMasterAddress = flippandoGameMasterAddress
    this.config.flippandoAddress = flippandoAddress

    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    this.signer = new ethers.Wallet(this.config.privateKey!, this.provider)

    // Verify the connection to the new network
    try {
      await this.provider.getNetwork()
    } catch (error) {
      throw new Error(`Failed to connect to the new network: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  getProvider(): ethers.providers.JsonRpcProvider {
    return this.provider
  }

  getSigner(): ethers.Wallet {
    return this.signer
  }

  getFlippandoGameMasterAddress(): string {
    return this.config.flippandoGameMasterAddress!
  }

  getFlippandoAddress(): string {
    return this.config.flippandoAddress!
  }

  getChainId(): number {
    return this.config.chainId!
  }
}

