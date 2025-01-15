import { readContract } from "@coinbase/coinbase-sdk";
import { WOW_ABI } from "./constants";
import { getHasGraduated, getUniswapQuote } from "./uniswap/utils";

/**
 * Gets the current supply of a token.
 *
 * @param tokenAddress - Address of the token contract
 * @returns The current token supply
 */
export async function getCurrentSupply(tokenAddress: string): Promise<string> {
  const supply = await readContract({
    networkId: "base-sepolia",
    contractAddress: tokenAddress as `0x${string}`,
    method: "totalSupply",
    args: {},
    abi: WOW_ABI,
  });

  return supply as string;
}

/**
 * Gets quote for buying tokens.
 *
 * @param networkId - Network ID, either base-sepolia or base-mainnet
 * @param tokenAddress - Address of the token contract
 * @param amountEthInWei - Amount of ETH to buy (in wei)
 * @returns The buy quote amount
 */
export async function getBuyQuote(
  networkId: string,
  tokenAddress: string,
  amountEthInWei: string,
): Promise<string> {
  const hasGraduated = await getHasGraduated(networkId, tokenAddress);

  const tokenQuote = (
    hasGraduated
      ? (await getUniswapQuote(networkId, tokenAddress, Number(amountEthInWei), "buy")).amountOut
      : await readContract({
          networkId: networkId,
          contractAddress: tokenAddress as `0x${string}`,
          method: "getEthBuyQuote",
          args: {
            ethOrderSize: amountEthInWei,
          },
          abi: WOW_ABI,
        })
  ) as string | number;

  return tokenQuote.toString();
}

/**
 * Gets quote for selling tokens.
 *
 * @param networkId - Network ID, either base-sepolia or base-mainnet
 * @param tokenAddress - Address of the token contract
 * @param amountTokensInWei - Amount of tokens to sell (in wei)
 * @returns The sell quote amount
 */
export async function getSellQuote(
  networkId: string,
  tokenAddress: string,
  amountTokensInWei: string,
): Promise<string> {
  const hasGraduated = await getHasGraduated(networkId, tokenAddress);

  const tokenQuote = (
    hasGraduated
      ? (await getUniswapQuote(networkId, tokenAddress, Number(amountTokensInWei), "sell"))
          .amountOut
      : await readContract({
          networkId: networkId,
          contractAddress: tokenAddress as `0x${string}`,
          method: "getTokenSellQuote",
          args: {
            tokenOrderSize: amountTokensInWei,
          },
          abi: WOW_ABI,
        })
  ) as string | number;

  return tokenQuote.toString();
}
