import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoABI from "../../abis/Flippando.json"
import type { FlippandoAgentkit } from "../../flippando-agentkit"

const PLAY_GAME_TO_COMPLETION_PROMPT = `
This action plays a Flippando game to completion. It takes the game ID as input and
repeatedly calls the flipTiles function until the game is solved. The action keeps
track of the total time spent solving the game and the total number of tries.
`

export const PlayGameToCompletionSchema = z.object({
  gameId: z.string().describe("The ID of the game to play"),
})

export const PlayGameToCompletionResponseSchema = z.object({
  message: z.string(),
  finalState: z.object({
    totalTime: z.number(),
    totalTries: z.number(),
    solvedBoard: z.array(z.number()),
  }),
})

function getTwoRandomPositions(boardSize: number): number[] {
  const pos1 = Math.floor(Math.random() * boardSize)
  let pos2
  do {
    pos2 = Math.floor(Math.random() * boardSize)
  } while (pos2 === pos1)
  return [pos1, pos2]
}

export async function playGameToCompletion(
  args: z.infer<typeof PlayGameToCompletionSchema>,
  agentkit: FlippandoAgentkit,
): Promise<z.infer<typeof PlayGameToCompletionResponseSchema>> {
  console.log("Starting playGameToCompletion with args:", args)
  console.log("Flippando address:", agentkit.getFlippandoAddress())
  const startTime = Date.now()
  let tries = 0
  let isGameSolved = false

  const flippando = new ethers.Contract(agentkit.getFlippandoAddress(), FlippandoABI.abi, agentkit.getSigner())

  let currentBoard: number[] = []
  let currentSolvedBoard: number[] = []

  while (!isGameSolved && tries < 100) {
    // Limit to 100 tries to prevent infinite loops
    try {
      const positions = getTwoRandomPositions(currentBoard.length || 16) // Assume 4x4 board if length is unknown
      console.log(`Flipping tiles for game ${args.gameId}, positions: ${positions.join(", ")}`)
      const tx = await flippando.flipTiles(args.gameId, positions)
      console.log(`Transaction sent: ${tx.hash}`)
      const receipt = await tx.wait()

      const gameStateEvent = receipt.events?.find((e: any) => e.event === "GameState")
      const gameSolvedEvent = receipt.events?.find((e: any) => e.event === "GameSolved")

      if (!gameStateEvent) throw new Error("GameState event not found")

      const gameStruct = gameStateEvent.args[1]
      currentBoard = gameStruct.board.map((tile: ethers.BigNumber | number) =>
        typeof tile === "number" ? tile : tile.toNumber(),
      )
      currentSolvedBoard = gameStruct.solvedBoard.map((tile: ethers.BigNumber | number) =>
        typeof tile === "number" ? tile : tile.toNumber(),
      )

      console.log("Current Board:", currentBoard)
      console.log("Current Solved Board:", currentSolvedBoard)

      if (gameSolvedEvent && gameSolvedEvent.args.id === args.gameId) {
        isGameSolved = true
        console.log("Game solved!")
      } else {
        const solvedTiles = currentSolvedBoard.filter((tile: number) => tile !== 0).length
        const totalTiles = currentSolvedBoard.length
        const solvedPercentage = Math.round((solvedTiles / totalTiles) * 100)
        console.log(`Game progress: ${solvedPercentage}% solved`)
      }

      tries++
    } catch (error) {
      console.error("Error in playGameToCompletion:", error)
      throw new Error(`Error playing game: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const endTime = Date.now()
  const totalTime = endTime - startTime

  return {
    message: isGameSolved ? "Game completed successfully" : "Game could not be completed within the try limit",
    finalState: {
      totalTime,
      totalTries: tries,
      solvedBoard: currentSolvedBoard,
    },
  }
}

export class PlayGameToCompletionAction
  implements FlippandoAction<typeof PlayGameToCompletionSchema, typeof PlayGameToCompletionResponseSchema>
{
  name = "play_game_to_completion"
  description = PLAY_GAME_TO_COMPLETION_PROMPT
  argsSchema = PlayGameToCompletionSchema
  responseSchema = PlayGameToCompletionResponseSchema
  func = playGameToCompletion
}

