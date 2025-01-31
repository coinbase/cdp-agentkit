import { Tool } from "langchain/tools"
import { ethers } from "ethers"
import type { FlippandoGameState, FlippandoMemory } from "../types"
import FlippandoGameMasterABI from "../abis/FlippandoGameMaster.json"
import FlippandoABI from "../abis/Flippando.json"

export class GamePlayerModule {
  private memory: FlippandoMemory
  private provider: ethers.providers.JsonRpcProvider
  private signer: ethers.Signer
  private flippandoGameMaster: ethers.Contract
  private flippando: ethers.Contract

  constructor(memory: FlippandoMemory, providerUrl: string, privateKey: string) {
    this.memory = memory
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl)
    this.signer = new ethers.Wallet(privateKey, this.provider)
    this.flippandoGameMaster = new ethers.Contract(
      process.env.FLIPPANDO_GAME_MASTER_ADDRESS!,
      FlippandoGameMasterABI.abi,
      this.signer,
    )
    this.flippando = new ethers.Contract(process.env.FLIPPANDO_ADDRESS!, FlippandoABI.abi, this.signer)
  }

  public async processGameState(gameState: FlippandoGameState) {
    console.log(`Processing game state for game ${gameState.gameId}`)
    // Implement game state processing logic here
  }

  public async createGame(boardSize: number, gameType: number, gameTileType: number): Promise<string> {
    try {
      const tx = await this.flippandoGameMaster.createGame(boardSize, gameType, gameTileType)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "GameCreated")
      if (!event) throw new Error("GameCreated event not found")
      const gameId = event.args.gameId
      const game = event.args.game
      console.log("Game created:", { gameId, game })
      return gameId
    } catch (error) {
      console.error("Error creating game:", error)
      throw error
    }
  }

  public async initializeGame(gameId: string): Promise<FlippandoGameState> {
    try {
      const tx = await this.flippandoGameMaster.initializeGame(gameId)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "GameInitialized")
      if (!event) throw new Error("GameInitialized event not found")
      const gameState: FlippandoGameState = this.parseGameState(event.args.game)
      console.log("Game initialized:", gameState)
      return gameState
    } catch (error) {
      console.error("Error initializing game:", error)
      throw error
    }
  }

  public async flipTiles(gameId: string, positions: [number, number]): Promise<FlippandoGameState> {
    try {
      const tx = await this.flippando.flipTiles(gameId, positions)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "GameState")
      if (!event) throw new Error("GameState event not found")
      const gameState: FlippandoGameState = this.parseGameState(event.args.game)
      console.log("Tiles flipped:", { gameId, positions, gameState })
      return gameState
    } catch (error) {
      console.error("Error flipping tiles:", error)
      throw error
    }
  }

  public async createNFT(gameId: string): Promise<number> {
    try {
      const tx = await this.flippando.createNFT(gameId)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "NFTCreated")
      if (!event) throw new Error("NFTCreated event not found")
      const tokenId = event.args.tokenId.toNumber()
      console.log("NFT created:", { gameId, tokenId })
      return tokenId
    } catch (error) {
      console.error("Error creating NFT:", error)
      throw error
    }
  }

  public async makeArt(gameId: string, basicNFTs: number[]): Promise<string> {
    try {
      const tx = await this.flippando.makeArt(gameId, basicNFTs)
      const receipt = await tx.wait()
      const event = receipt.events?.find((e: any) => e.event === "ArtCreated")
      if (!event) throw new Error("ArtCreated event not found")
      const artCID = event.args.artCID
      console.log("Art created:", { gameId, basicNFTs, artCID })
      return artCID
    } catch (error) {
      console.error("Error creating art:", error)
      throw error
    }
  }

  public isGameComplete(gameState: FlippandoGameState): boolean {
    return gameState.solvedBoard.every((tile) => tile !== 0)
  }

  private parseGameState(gameData: any): FlippandoGameState {
    return {
      gameId: gameData.id,
      board: gameData.board,
      solvedBoard: gameData.solvedBoard,
      gameType: gameData.gameType.toNumber(),
      gameTileType: gameData.gameTileType.toNumber(),
      gameLevel: gameData.gameLevel.toNumber(),
      gameTiles: gameData.gameTiles.map((tile: ethers.BigNumber) => tile.toNumber()),
    }
  }

  public getTools(): Tool[] {
    return [
      new Tool({
        name: "create_game",
        description: "Create a new Flippando game",
        func: async ({ boardSize, gameType, gameTileType }) => {
          const gameId = await this.createGame(
            Number.parseInt(boardSize),
            Number.parseInt(gameType),
            Number.parseInt(gameTileType),
          )
          return `Game created with ID: ${gameId}`
        },
      }),
      new Tool({
        name: "initialize_game",
        description: "Initialize a Flippando game",
        func: async ({ gameId }) => {
          const gameState = await this.initializeGame(gameId)
          return `Game ${gameId} initialized. Current state: ${JSON.stringify(gameState)}`
        },
      }),
      new Tool({
        name: "flip_tiles",
        description: "Flip tiles in a Flippando game",
        func: async ({ gameId, position1, position2 }) => {
          const gameState = await this.flipTiles(gameId, [Number.parseInt(position1), Number.parseInt(position2)])
          return `Tiles flipped in game ${gameId}. New state: ${JSON.stringify(gameState)}`
        },
      }),
      new Tool({
        name: "create_nft",
        description: "Create an NFT for a solved Flippando game",
        func: async ({ gameId }) => {
          const tokenId = await this.createNFT(gameId)
          return `NFT created for game ${gameId} with token ID: ${tokenId}`
        },
      }),
      new Tool({
        name: "make_art",
        description: "Generate art for a solved Flippando game using basic NFTs",
        func: async ({ gameId, basicNFTs }) => {
          const parsedBasicNFTs = JSON.parse(basicNFTs).map(Number)
          const artCID = await this.makeArt(gameId, parsedBasicNFTs)
          return `Art created for game ${gameId} with basic NFTs ${basicNFTs} and CID: ${artCID}`
        },
      }),
    ]
  }
}

