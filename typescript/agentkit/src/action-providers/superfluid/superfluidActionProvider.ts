import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { EvmWalletProvider } from "../../wallet-providers";
import { CreateAction } from "../actionDecorator";
import { Network } from "../../network";
import { SuperfluidCreateStreamSchema } from "./schemas";
import {
  CFAv1ForwarderAddress,
  GDAv1ForwarderAddress,
  CFAv1ForwarderABI,
  GDAv1ForwarderABI
} from "./constants";
import { encodeFunctionData, Hex } from "viem";


/**
 * SuperfluidActionProvider is an action provider for Superfluid interactions.
 */
export class SuperfluidActionProvider extends ActionProvider {

  /**
   * Constructor for the SuperfluidActionProvider class.
   */
  constructor() {
    super("superfluid", []);

  }

  /**
   * Get account details for the currently authenticated Twitter (X) user.
   *
   * @param walletProvider - The wallet provider to start the stream from.
   * @param args - The input arguments for the action.
   * @returns A JSON string containing the account details or error message
   */
  @CreateAction({
    name: "create_stream",
    description: `
This tool will create a Superfluid stream for a desired token on an EVM network.
It takes the ERC20 token address, a recipient address, and a stream rate to create a Superfluid stream.
Superfluid will then start streaming the token to the recipient at the specified rate.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    schema: SuperfluidCreateStreamSchema,
  })
  async createStream(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SuperfluidCreateStreamSchema>
  ): Promise<string> {
    try {
      const data = encodeFunctionData({
        abi: CFAv1ForwarderABI,
        functionName: "createFlow",
        args: [args.erc20TokenAddress as Hex, walletProvider.getAddress() as Hex, args.recipientAddress as Hex, args.flowRate, "0x"],
      });

      const hash = await walletProvider.sendTransaction({
        to: CFAv1ForwarderAddress as `0x${string}`,
        data,
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Created stream of token ${args.erc20TokenAddress} to ${args.recipientAddress} at a rate of ${args.streamRate}`;
    } catch (error) {
      return `Error creating Superfluid stream: ${error}`;
    }
  }

  /**
   * Checks if the Superfluid action provider supports the given network.
   *
   * @param network - The network to check.
   * @returns True if the Superfluid action provider supports the network, false otherwise.
   */
  supportsNetwork = (network: Network) => network.protocolFamily === "evm";
}

export const superfluidActionProvider = () => new SuperfluidActionProvider();
