import { BaseAgent, type AgentOptions } from "@coinbase/cdp-agentkit-core"
import type { StructuredTool } from "@langchain/core/tools"
import type { FlippandoAgentConfig, FlippandoGameState, FlippandoMemory, NFTMetadata, TokenSupplyData } from "./types"
import { GamePlayerModule, ArtAdvisorModule, TokenTrackerModule, SocialPosterModule } from "./modules"

export class FlippandoAgent extends BaseAgent {
  private memory: FlippandoMemory
  private config: FlippandoAgentConfig

  private gamePlayer: GamePlayerModule
  private artAdvisor: ArtAdvisorModule
  private tokenTracker: TokenTrackerModule
  private socialPoster: SocialPosterModule

  constructor(config: FlippandoAgentConfig, options?: AgentOptions) {
    super(options)
    this.config = config
    this.memory = {
      gameStates: new Map(),
      nftCache: new Map(),
      tokenSupplyHistory: [],
    }

    // Initialize all modules in the constructor
    this.gamePlayer = new GamePlayerModule(this.memory, this.config.providerUrl, this.config.privateKey)
    this.artAdvisor = new ArtAdvisorModule(this.memory)
    this.tokenTracker = new TokenTrackerModule(this.config.chainIds)
    this.socialPoster = new SocialPosterModule()
  }

  protected async getTools(): Promise<StructuredTool[]> {
    return [
      ...this.gamePlayer.getTools(),
      ...this.artAdvisor.getTools(),
      ...this.tokenTracker.getTools(),
      ...this.socialPoster.getTools(),
    ]
  }

  // New public method to access tools
  public async getAllTools(): Promise<StructuredTool[]> {
    return this.getTools()
  }

  public async handleGameStateUpdate(gameState: FlippandoGameState) {
    this.memory.gameStates.set(gameState.gameId, gameState)
    await this.gamePlayer.processGameState(gameState)

    if (this.gamePlayer.isGameComplete(gameState)) {
      if (this.config.twitterEnabled) {
        await this.socialPoster.announceGameCompletion(gameState)
      }
      const createNFTTool = (await this.getAllTools()).find((tool) => tool.name === "create_nft")
      if (createNFTTool) {
        const result = await createNFTTool.invoke({ gameId: gameState.gameId })
        console.log(result)
      }
    }
  }

  public async handleNFTUpdate(tokenId: number, metadata: NFTMetadata) {
    this.memory.nftCache.set(tokenId, metadata)
    if (this.config.artSuggestionsEnabled) {
      await this.artAdvisor.processNewNFT(tokenId, metadata)
    }
  }

  public async handleTokenSupplyUpdate(supplyData: TokenSupplyData) {
    this.memory.tokenSupplyHistory.push(supplyData)
    if (this.config.arbitrageTrackingEnabled) {
      await this.tokenTracker.processSupplyUpdate(supplyData)
    }
  }
}

