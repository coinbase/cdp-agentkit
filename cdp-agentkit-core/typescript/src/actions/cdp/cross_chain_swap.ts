import { CdpAction } from "./cdp_action";
import { Wallet } from "@coinbase/coinbase-sdk";
import {
  createConfig,
  EVM,
  getQuote,
  QuoteRequest,
  convertQuoteToRoute,
  executeRoute,
} from "@lifi/sdk";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { http, createWalletClient, publicActions } from "viem";
import { z } from "zod";

const CROSS_CHAIN_SWAP_PROMPT = `
This tool enables cross-chain token swaps using the LiFi protocol. It allows you to find a route to swap tokens from one chain to another. You'll need to specify:
- The source chain ID
- The destination chain ID
- The token on the source chain (address)
- The token on the destination chain (address)
- The amount to transfer (in the smallest unit of the token)
- The address from which the tokens are being transferred
`;

/**
 * Input schema for cross-chain swap action.
 */

export const CrossChainSwapInput = z.object({
  fromChain: z.number().describe("Source chain ID. e.g. 8453 for Base mainnet"),
  toChain: z.number().describe("Destination chain ID. e.g. 10 for Optimism mainnet"),
  fromToken: z
    .string()
    .describe(
      "The contract address of the token on the source chain. Ensure this address corresponds to the specified fromChain.",
    ),
  toToken: z
    .string()
    .describe(
      "The contract address of the token on the destination chain. Ensure this address corresponds to the specified toChain.",
    ),
  fromAmount: z
    .string()
    .describe(
      "The amount to be transferred from the source chain, specified in the smallest unit of the token (e.g., wei for ETH).",
    ),
  fromAddress: z.string().describe("The address from which the tokens are being transferred."),
});

/**
 * Executes a cross-chain token swap using the LiFi protocol
 *
 * @param wallet - The wallet to execute the swap from
 * @param args - The swap parameters including chains, tokens, and amounts
 * @returns A string describing the transaction result
 */
export async function crossChainSwap(
  wallet: Wallet,
  args: z.infer<typeof CrossChainSwapInput>,
): Promise<string> {
  try {
    const walletAddress = await wallet.getDefaultAddress();
    const privateKey = walletAddress.export();

    console.log("Wallet address:", walletAddress.getId());
    console.log("Wallet address type:", typeof walletAddress);

    const client = createWalletClient({
      account: privateKeyToAccount(privateKey as `0x${string}`),
      chain: base,
      transport: http("https://base-mainnet.g.alchemy.com/v2/2yW47qv-8qJlPfJEg0lzt3VPSSR51H2P"),
    }).extend(publicActions);

    createConfig({
      integrator: "CDP-AgentKit",
      providers: [
        EVM({
          getWalletClient: async () => client,
        }),
      ],
    });

    const quoteRequest: QuoteRequest = {
      fromChain: args.fromChain,
      toChain: args.toChain,
      fromToken: args.fromToken,
      toToken: args.toToken,
      fromAmount: args.fromAmount,
      fromAddress: walletAddress.getId(),
    };

    console.log("Quote request:", JSON.stringify(quoteRequest, null, 2));

    const quote = await getQuote(quoteRequest);

    const route = convertQuoteToRoute(quote);
    const executedRoute = await executeRoute(route, {
      // Gets called once the route object gets new updates
      updateRouteHook(route) {
        console.log(route);
      },
    });

    return `Cross-chain swap executed successfully: ${JSON.stringify(executedRoute)}`;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * Action for executing cross-chain token swaps using the LiFi protocol
 */
export class CrossChainSwapAction implements CdpAction<typeof CrossChainSwapInput> {
  public name = "cross_chain_swap";
  public description = CROSS_CHAIN_SWAP_PROMPT;
  public argsSchema = CrossChainSwapInput;
  public func = crossChainSwap;
}
