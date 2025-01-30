import { z } from "zod";
import { ActionProvider } from "../action_provider";
import { Network, EvmWalletProvider } from "../../wallet_providers";
import { CreateAction } from "../action_decorator";
import { Coinbase, ExternalAddress } from "@coinbase/coinbase-sdk";
import { AddressReputationSchema, RequestFaucetFundsSchema } from "./schemas";

/**
 * Configuration options for the CdpActionProvider.
 */
export interface CdpActionProviderConfig {
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
 * CdpActionProvider is an action provider for Cdp.
 */
export class CdpActionProvider extends ActionProvider {
  constructor(config: CdpActionProviderConfig = {}) {
    if (config.apiKeyName && config.apiKeyPrivateKey) {
      Coinbase.configure({ apiKeyName: config.apiKeyName, privateKey: config.apiKeyPrivateKey });
    }

    Coinbase.configureFromJson();

    super("cdp", []);
  }

  /**
   * Checks if the Cdp action provider supports the given network.
   *
   * @param network - The network to check.
   * @returns True if the Cdp action provider supports the network, false otherwise.
   * TODO: Split out into sub providers so network support can be tighter scoped.
   */
  supportsNetwork = (network: Network) => true;

  /**
   * Check the reputation of an address.
   *
   * @param args - The input arguments for the action
   * @returns A string containing reputation data or error message
   */
  @CreateAction({
    name: "address_reputation",
    description: `
This tool checks the reputation of an address on a given network. It takes:

- network: The network to check the address on (e.g. "base-mainnet")
- address: The Ethereum address to check
`,
    schema: AddressReputationSchema,
  })
  async adderessReputation(args: z.infer<typeof AddressReputationSchema>): Promise<string> {
    try {
      const address = new ExternalAddress(args.network, args.address);
      const reputation = await address.reputation();
      return reputation.toString();
    } catch (error) {
      return `Error checking address reputation: ${error}`;
    }
  }

  /**
   * Requests test tokens from the faucet for the default address in the wallet.
   *
   * @param args - The input arguments for the action.
   * @returns A confirmation message with transaction details.
   */
  @CreateAction({
    name: "request_faucet_funds",
    description: `This tool will request test tokens from the faucet for the default address in the wallet. It takes the wallet and asset ID as input.
If no asset ID is provided the faucet defaults to ETH. Faucet is only allowed on 'base-sepolia' and can only provide asset ID 'eth' or 'usdc'.
You are not allowed to faucet with any other network or asset ID. If you are on another network, suggest that the user sends you some ETH
from another wallet and provide the user with your wallet details.`,
    schema: RequestFaucetFundsSchema,
  })
  async faucet(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof RequestFaucetFundsSchema>,
  ): Promise<string> {
    try {
      const address = new ExternalAddress(
        walletProvider.getNetwork().networkId!,
        walletProvider.getAddress(),
      );

      const faucetTx = await address.faucet(args.assetId || undefined);

      const result = await faucetTx.wait();

      return `Received ${
        args.assetId || "ETH"
      } from the faucet. Transaction: ${result.getTransactionLink()}`;
    } catch (error) {
      return `Error requesting faucet funds: ${error}`;
    }
  }
}

export const cdpActionProvider = () => new CdpActionProvider();
