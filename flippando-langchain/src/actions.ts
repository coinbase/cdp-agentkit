import { z } from "zod"

export interface FlippandoAction {
  name: string
  description: string
  argsSchema: z.ZodObject<any>
}

export const FLIPPANDO_ACTIONS: FlippandoAction[] = [
  {
    name: "create_game",
    description: "Create a new Flippando game",
    argsSchema: z.object({
      boardSize: z.number(),
      gameType: z.number(),
      gameTileType: z.number(),
    }),
  },
  {
    name: "initialize_game",
    description: "Initialize a Flippando game",
    argsSchema: z.object({
      gameId: z.string(),
    }),
  },
  {
    name: "flip_tiles",
    description: "Flip tiles in a Flippando game",
    argsSchema: z.object({
      gameId: z.string(),
      positions: z.array(z.number()).length(2),
    }),
  },
  {
    name: "create_nft",
    description: "Create an NFT for a solved Flippando game",
    argsSchema: z.object({
      gameId: z.string(),
    }),
  },
  {
    name: "make_art",
    description: "Generate art for a solved Flippando game using basic NFTs",
    argsSchema: z.object({
      gameId: z.string(),
      basicNFTs: z.array(z.number()),
    }),
  },
]

