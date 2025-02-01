import type { StructuredTool } from "@langchain/core/tools"
import type { FlippandoGameState, FlippandoMemory, NFTMetadata, TokenSupplyData } from "./types"
import { GamePlayerModule, ArtAdvisorModule, TokenTrackerModule, SocialPosterModule } from "./modules"
import { FLIPPANDO_ACTIONS, type FlippandoAction } from "./actions"

export interface FlippandoAgentConfig {
  chainIds: number[]
  twitterEnabled: boolean
  gameAnalysisEnabled: boolean
  artSuggestionsEnabled: boolean
  arbitrageTrackingEnabled: boolean
  providerUrl: string
  privateKey: string
}

export class FlippandoAgent {
  private memory: FlippandoMemory
  private config: FlippandoAgentConfig

  public gamePlayer: GamePlayerModule
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

    this.gamePlayer = new GamePlayerModule(this.memory, this.config.providerUrl, this.config.privateKey)
    this.artAdvisor = new ArtAdvisorModule(this.memory)
    this.tokenTracker = new TokenTrackerModule(this.config.chainIds)
    this.socialPoster = new SocialPosterModule()

  }


  public async getAllTools(): Promise<StructuredTool[]> {
    return [
      ...this.gamePlayer.getTools(),
      ...this.artAdvisor.getTools(),
      ...this.tokenTracker.getTools(),
      ...this.socialPoster.getTools(),
    ]
  }

  public async run(action: FlippandoAction, args: any): Promise<any> {
    switch (action.name) {
      case "create_game":
        return this.gamePlayer.createGame(args.boardSize, args.gameType, args.gameTileType)
      case "initialize_game":
        return this.gamePlayer.initializeGame(args.gameId)
      case "flip_tiles":
        return this.gamePlayer.flipTiles(args.gameId, args.positions)
      case "create_nft":
        return this.gamePlayer.createNFT(args.gameId)
      case "make_art":
        return this.gamePlayer.makeArt(args.gameId, args.basicNFTs)
      default:
        throw new Error(`Unknown action: ${action.name}`)
    }
  }

  public async handleGameStateUpdate(gameState: FlippandoGameState) {
    this.memory.gameStates.set(gameState.gameId, gameState)
    await this.gamePlayer.processGameState(gameState)

    if (this.gamePlayer.isGameComplete(gameState)) {
      if (this.config.twitterEnabled) {
        await this.socialPoster.announceGameCompletion(gameState)
      }
      const createNFTAction = FLIPPANDO_ACTIONS.find((action) => action.name === "create_nft")
      if (createNFTAction) {
        const result = await this.run(createNFTAction, { gameId: gameState.gameId })
        console.log(`NFT created for completed game ${gameState.gameId} with result: ${JSON.stringify(result)}`)
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

