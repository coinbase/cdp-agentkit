// TODO: Remove this once we have a real implementation
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReadContractParameters, ReadContractReturnType, TransactionRequest } from "viem";
import { EvmWalletProvider } from "./evm_wallet_provider";
import { Network } from "../network";
import {
  Coinbase,
  CreateERC20Options,
  SmartContract,
  Wallet,
  WalletData,
} from "@coinbase/coinbase-sdk";
import { NETWORK_ID_TO_CHAIN_ID } from "../network/network";

/**
 * Configuration options for the CdpActionProvider.
 */
export interface CdpWalletProviderConfig {
  /**
   * CDP API Key Name.
   */
  apiKeyName?: string;

  /**
   * CDP API Key Private Key.
   */
  apiKeyPrivateKey?: string;
}

/**
 * Configuration options for the CDP Agentkit with a Wallet.
 */
interface ConfigureCdpAgentkitWithWalletOptions extends CdpWalletProviderConfig {
  networkId?: string;
  cdpWalletData?: string;
  mnemonicPhrase?: string;
}

/**
 * A wallet provider that uses the Coinbase SDK.
 */
export class CdpWalletProvider extends EvmWalletProvider {
  #cdpWallet?: Wallet;
  #address?: string;
  #network?: Network;

  /**
   * Constructs a new CdpWalletProvider.
   *
   * @param config - The configuration options for the CdpWalletProvider.
   */
  private constructor(config: CdpWalletProviderConfig) {
    super();

    if (config.apiKeyName && config.apiKeyPrivateKey) {
      Coinbase.configure({ apiKeyName: config.apiKeyName, privateKey: config.apiKeyPrivateKey });
    } else {
      Coinbase.configureFromJson();
    }
  }

  /**
   * Configures a new CdpWalletProvider with a wallet.
   *
   * @param config - Optional configuration parameters
   * @returns A Promise that resolves to a new CdpAgentkit instance
   * @throws Error if required environment variables are missing or wallet initialization fails
   */
  public static async configureWithWallet(
    config: ConfigureCdpAgentkitWithWalletOptions = {},
  ): Promise<CdpWalletProvider> {
    const cdpWalletProvider = new CdpWalletProvider(config);

    const mnemonicPhrase = config.mnemonicPhrase || process.env.MNEMONIC_PHRASE;
    const networkId = config.networkId || process.env.NETWORK_ID || Coinbase.networks.BaseSepolia;

    try {
      if (config.cdpWalletData) {
        const walletData = JSON.parse(config.cdpWalletData) as WalletData;
        cdpWalletProvider.#cdpWallet = await Wallet.import(walletData);
      } else if (mnemonicPhrase) {
        cdpWalletProvider.#cdpWallet = await Wallet.import(
          { mnemonicPhrase: mnemonicPhrase },
          networkId,
        );
      } else {
        cdpWalletProvider.#cdpWallet = await Wallet.create({ networkId: networkId });
      }
    } catch (error) {
      throw new Error(`Failed to initialize wallet: ${error}`);
    }

    cdpWalletProvider.#address = (await cdpWalletProvider.#cdpWallet?.getDefaultAddress())?.getId();
    cdpWalletProvider.#network = {
      protocolFamily: "evm" as const,
      chainId: NETWORK_ID_TO_CHAIN_ID[cdpWalletProvider.#cdpWallet?.getNetworkId()],
      networkId: cdpWalletProvider.#cdpWallet?.getNetworkId(),
    };

    return cdpWalletProvider;
  }

  /**
   * Signs a message.
   *
   * @param message - The message to sign.
   * @returns The signed message.
   */
  async signMessage(message: string): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Signs a typed data object.
   *
   * @param typedData - The typed data object to sign.
   * @returns The signed typed data object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async signTypedData(typedData: any): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Signs a transaction.
   *
   * @param transaction - The transaction to sign.
   * @returns The signed transaction.
   */
  async signTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Sends a transaction.
   *
   * @param transaction - The transaction to send.
   * @returns The hash of the transaction.
   */
  async sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Gets the address of the wallet.
   *
   * @returns The address of the wallet.
   */
  getAddress(): string {
    if (!this.#address) {
      throw new Error("Address not initialized");
    }

    return this.#address;
  }

  /**
   * Gets the network of the wallet.
   *
   * @returns The network of the wallet.
   */
  getNetwork(): Network {
    if (!this.#network) {
      throw new Error("Network not initialized");
    }

    return this.#network;
  }

  /**
   * Gets the name of the wallet provider.
   *
   * @returns The name of the wallet provider.
   */
  getName(): string {
    return "cdp_wallet_provider";
  }

  /**
   * Gets the balance of the wallet.
   *
   * @returns The balance of the wallet.
   */
  async getBalance(): Promise<bigint> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Waits for a transaction receipt.
   *
   * @param txHash - The hash of the transaction to wait for.
   * @returns The transaction receipt.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async waitForTransactionReceipt(txHash: `0x${string}`): Promise<any> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Reads a contract.
   *
   * @param params - The parameters to read the contract.
   * @returns The response from the contract.
   */
  async readContract(params: ReadContractParameters): Promise<ReadContractReturnType> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Deploys a token.
   *
   * @param options - The options for the token deployment.
   * @returns The deployed token.
   */
  async deployToken(options: CreateERC20Options): Promise<SmartContract> {
    if (!this.#cdpWallet) {
      throw new Error("Wallet not initialized");
    }

    return this.#cdpWallet.deployToken(options);
  }
}
