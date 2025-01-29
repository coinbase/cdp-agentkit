import {
  WalletClient as ViemWalletClient,
  createPublicClient,
  http,
  TransactionRequest,
} from "viem";
import { EvmWalletProvider } from "./evm_wallet_provider";
import { Network } from "./wallet_provider";

export class ViemWalletProvider extends EvmWalletProvider {
  #walletClient: ViemWalletClient;

  constructor(walletClient: ViemWalletClient) {
    super();
    this.#walletClient = walletClient;
  }

  async signMessage(message: string): Promise<`0x${string}`> {
    const account = this.#walletClient.account;
    if (!account) {
      throw new Error("Account not found");
    }

    return this.#walletClient.signMessage({ account, message });
  }

  async signTypedData(typedData: any): Promise<`0x${string}`> {
    return this.#walletClient.signTypedData({
      account: this.#walletClient.account!,
      domain: typedData.domain!,
      types: typedData.types!,
      primaryType: typedData.primaryType!,
      message: typedData.message!,
    });
  }

  async signTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    const txParams = {
      account: this.#walletClient.account!,
      to: transaction.to,
      value: transaction.value,
      data: transaction.data,
      chain: this.#walletClient.chain,
    };

    return this.#walletClient.signTransaction(txParams);
  }

  async sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    const txParams = {
      account: this.#walletClient.account!,
      to: transaction.to,
      value: transaction.value,
      data: transaction.data,
      chain: this.#walletClient.chain,
    };

    return this.#walletClient.sendTransaction(txParams);
  }

  getAddress(): string {
    return this.#walletClient.account?.address ?? "";
  }

  getNetwork(): Network {
    return {
      protocolFamily: "evm" as const,
      chainId: this.#walletClient.chain!.id! as any as string,
    };
  }

  getName(): string {
    return "viem_wallet_provider";
  }

  async waitForTransactionReceipt(txHash: `0x${string}`): Promise<any> {
    const publicClient = createPublicClient({
      chain: this.#walletClient.chain,
      transport: http(),
    });

    return await publicClient.waitForTransactionReceipt({ hash: txHash });
  }
}
