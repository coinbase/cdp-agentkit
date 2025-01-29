import { TransactionRequest } from "viem";
import { EvmWalletProvider } from "./evm_wallet_provider";
import { Network } from "./wallet_provider";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

export class CdpWalletProvider extends EvmWalletProvider {
  constructor() {
    super();
  }

  async signMessage(message: string): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
    0;
  }

  async signTypedData(typedData: any): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  async signTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  async sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  getAddress(): string {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  getNetwork(): Network {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  getName(): string {
    // TODO: Implement
    return "viem_wallet_provider";
  }

  async waitForTransactionReceipt(txHash: `0x${string}`): Promise<any> {
    // TODO: Implement
    throw Error("Unimplemented");
  }
}
