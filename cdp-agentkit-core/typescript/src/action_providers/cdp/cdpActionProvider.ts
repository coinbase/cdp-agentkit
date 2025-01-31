import { z } from "zod";
import { ActionProvider } from "../action_provider";
import { CdpWalletProvider } from "../../wallet_providers";
import { CreateAction } from "../action_decorator";
import { ExternalAddress } from "@coinbase/coinbase-sdk";
import { AddressReputationSchema, DeployTokenSchema, RequestFaucetFundsSchema } from "./schemas";
import { Network } from "../../network";

/**
 * CdpActionProvider is an action provider for Cdp.
 */
export class CdpActionProvider extends ActionProvider<CdpWalletProvider> {
  /**
   * Constructor for the CdpActionProvider class.
   */
  constructor() {
    super("cdp", []);
  }

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
  async addressReputation(args: z.infer<typeof AddressReputationSchema>): Promise<string> {
    try {
      const address = new ExternalAddress(args.network, args.address);
      const reputation = await address.reputation();
      return reputation.toString();
    } catch (error) {
      return `Error checking address reputation: ${error}`;
    }
  }

  /**
   * Deploys a token.
   *
   * @param walletProvider - The wallet provider to deploy the token.
   * @param args - The arguments for the token deployment.
   * @returns The deployed token.
   */
  @CreateAction({
    name: "deploy_token",
    description: `This tool will deploy an ERC20 token smart contract. It takes the token name, symbol, and total supply as input. 
The token will be deployed using the wallet's default address as the owner and initial token holder.`,
    schema: DeployTokenSchema,
  })
  async deployToken(walletProvider: CdpWalletProvider, args: z.infer<typeof DeployTokenSchema>) {
    try {
      const tokenContract = await walletProvider.deployToken({
        name: args.name,
        symbol: args.symbol,
        totalSupply: args.totalSupply,
      });

      const result = await tokenContract.wait();

      return `Deployed ERC20 token contract ${args.name} (${args.symbol}) with total supply of ${
        args.totalSupply
      } tokens at address ${result.getContractAddress()}. Transaction link: ${result
        .getTransaction()!
        .getTransactionLink()}`;
    } catch (error) {
      return `Error deploying token: ${error}`;
    }
  }

  /**
   * Requests test tokens from the faucet for the default address in the wallet.
   *
   * @param walletProvider - The wallet provider to request funds from.
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
    walletProvider: CdpWalletProvider,
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

  /**
   * Checks if the Cdp action provider supports the given network.
   *
   * @param _ - The network to check.
   * @returns True if the Cdp action provider supports the network, false otherwise.
   * TODO: Split out into sub providers so network support can be tighter scoped.
   */
  supportsNetwork = (_: Network) => true;
}

export const cdpActionProvider = () => new CdpActionProvider();
