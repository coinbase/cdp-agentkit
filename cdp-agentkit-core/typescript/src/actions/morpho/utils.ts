import { Wallet } from "@coinbase/coinbase-sdk";

import { ERC20_ABI } from "./constants";

export async function approve(
  wallet: Wallet, 
  tokenAddress: string, 
  spender: string, 
  amount: bigint
): Promise<string> {
  try {
    const invocation = await wallet.invokeContract({
      contractAddress: tokenAddress,
      method: "approve",
      abi: ERC20_ABI,
      args: {
        spender: spender,
        value: amount.toString()
      }
    });

    const result = await invocation.wait();

    return `Approved ${amount} tokens for ${spender} with transaction hash: ${result.getTransactionHash()}`;
  } catch (error) {
    return `Error approving tokens: ${error}`;
  }
} 
