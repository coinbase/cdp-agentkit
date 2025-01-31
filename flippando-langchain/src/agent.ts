import { type AgentExecutor, initializeAgentExecutorWithOptions } from "langchain/agents"
import { ChatOpenAI } from "langchain/chat_models/openai"
import type { Tool } from "@coinbase/cdp-agentkit-core/tools"
import type { FlippandoAgentConfig, FlippandoGameState, FlippandoMemory, NFTMetadata, TokenSupplyData } from "./types"
import { GamePlayerModule, ArtAdvisorModule, TokenTrackerModule, SocialPosterModule } from "./modules"

export class FlippandoAgent {
  private executor: AgentExecutor
  private memory: FlippandoMemory
  private config: FlippandoAgentConfig

  private gamePlayer: GamePlayerModule
  private artAdvisor: ArtAdvisorModule
  private tokenTracker: TokenTrackerModule
  private socialPoster: SocialPosterModule

  constructor(config: FlippandoAgentConfig) {
    this.config = config
    this.memory = {
      gameStates: new Map(),
      nftCache: new Map(),
      tokenSupplyHistory: [],
    }

    this.initializeModules()
  }

  private async initializeModules() {
    // Initialize core modules
    this.gamePlayer = new GamePlayerModule(this.memory, this.config.providerUrl, this.config.privateKey)
    this.artAdvisor = new ArtAdvisorModule(this.memory)
    this.tokenTracker = new TokenTrackerModule(this.config.chainIds)
    this.socialPoster = new SocialPosterModule()

    // Initialize LangChain agent with tools
    const tools = this.getTools()
    const model = new ChatOpenAI({
      temperature: 0.7,
      modelName: "gpt-4",
    })

    this.executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "chat-conversational-react-description",
      verbose: true,
    })
  }

  private getTools(): Tool[] {
    return [
      this.gamePlayer.getTools(),
      this.artAdvisor.getTools(),
      this.tokenTracker.getTools(),
      this.socialPoster.getTools(),
    ].flat()
  }

  // Event handlers
  public async handleGameStateUpdate(gameState: FlippandoGameState) {
    this.memory.gameStates.set(gameState.gameId, gameState)
    await this.gamePlayer.processGameState(gameState)

    if (this.gamePlayer.isGameComplete(gameState)) {
      if (this.config.twitterEnabled) {
        await this.socialPoster.announceGameCompletion(gameState)
      }
      // Automatically create NFT for completed games
      const tokenId = await this.gamePlayer.createNFT(gameState.gameId)
      console.log(`NFT created for completed game ${gameState.gameId} with token ID ${tokenId}`)
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

