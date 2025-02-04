import { WETH_ADDRESS_BASE, WETH_ADDRESS_ETHEREUM } from "./constants";
import { EvmWalletProvider } from "../../wallet-providers";
import { Hex } from "viem";

/**
 * Retrieves the appropriate WETH contract address based on the chain.
 *
 * @param chain - The chain identifier.
 * @returns The WETH contract address.
 */
export const getWethAddress = (chain: string): string => {
  if (chain === "ethereum" || chain === "ethereum-mainnet") {
    return WETH_ADDRESS_ETHEREUM;
  } else if (chain === "base" || chain === "base-mainnet") {
    return WETH_ADDRESS_BASE;
  }
  throw new Error(`Unsupported chain: ${chain}`);
};

/**
 * Maps the chain identifier to Magic Eden's chain naming convention.
 *
 * @param chain - The chain identifier.
 * @returns The chain name used by Magic Eden.
 */
export const toMagicEdenChain = (chain: string): string => {
  if (chain === "ethereum" || chain === "ethereum-mainnet") {
    return "ethereum";
  } else if (chain === "base" || chain === "base-mainnet") {
    return "base";
  }
  throw new Error(`Unsupported chain for Magic Eden: ${chain}`);
};

/**
 * Submits a transaction via the wallet provider.
 *
 * @param walletProvider - The wallet provider to use.
 * @param to - Recipient address.
 * @param from - Sender address.
 * @param data - Transaction data payload.
 * @param value - (Optional) Value to send (in wei as a string).
 * @returns The transaction hash.
 */
export const submitTransaction = async (
  walletProvider: EvmWalletProvider,
  to: Hex,
  from: Hex,
  data: Hex,
  value?: string,
): Promise<`0x${string}`> => {
  console.log("Submitting transaction with parameters:", { to, from, data });

  const txHash = await walletProvider.sendTransaction({
    to,
    from,
    data,
    // Only include the value property if defined.
    ...(value ? { value: BigInt(value) } : {}),
  });

  console.log("Transaction hash:", txHash);
  return txHash;
};
