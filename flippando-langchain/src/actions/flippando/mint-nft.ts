import { z } from "zod"
import type { FlippandoAction } from "../flippando"
import { ethers } from "ethers"
import FlippandoABI from "../../abis/Flippando.json"

const MINT_NFT_PROMPT = `
This action mints a solved board as an NFT in a Flippando game. It takes the game ID as an argument.
The action will interact with the Flippando contract to mint the solved board as a basic NFT.
It returns the minted NFT token id, if successful. The game will be deleted from chain state.
`

export const MintNftSchema = z.object({
  gameId: z.string().describe("The ID of the game"),
})

export const MintNftResponseSchema = z.object({
  message: z.string(),
})

export async function mintNft(
  args: z.infer<typeof MintNftSchema>,
): Promise<z.infer<typeof MintNftResponseSchema>> {
  const providerUrl = process.env.FLIPPANDO_PROVIDER_URL
  const privateKey = process.env.FLIPPANDO_PRIVATE_KEY!
  const flippandoAddress = process.env.FLIPPANDO_ADDRESS!

  if (!providerUrl || !privateKey || !flippandoAddress) {
    throw new Error("Missing environment variables")
  }

  const provider = new ethers.providers.JsonRpcProvider(providerUrl)
  const signer = new ethers.Wallet(privateKey, provider)
  const flippando = new ethers.Contract(flippandoAddress, FlippandoABI.abi, signer)

  try {
    console.log(`Minting NFT for game ${args.gameId}`)
    const tx = await flippando.createNFT(args.gameId)
    console.log(`Transaction sent: ${tx.hash}`)
    const receipt = await tx.wait()
    //console.log(`Transaction confirmed: ${receipt.transactionHash}`)

    const nftCreatedEvent = receipt.events?.find((e: any) => e.event === "NFTCreated")

    if (!nftCreatedEvent) throw new Error("NftCreated event not found")

    //console.log("GameState event found:", JSON.stringify(gameStateEvent, null, 2))

    const nftId = nftCreatedEvent.args[1]
    //console.log("Nft id:", nftId)

    let message: string
    message = `NFT created with id: ${nftId}`
    console.log("Final message:", message)

    return {
      message,
    }
  } catch (error) {
    console.error("Error in createNft:", error)
    throw new Error(`Error minting nft: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export class MintNftAction implements FlippandoAction<typeof MintNftSchema, typeof MintNftResponseSchema> {
  name = "mint_nft"
  description = MINT_NFT_PROMPT
  argsSchema = MintNftSchema
  responseSchema = MintNftResponseSchema
  func = mintNft
}

