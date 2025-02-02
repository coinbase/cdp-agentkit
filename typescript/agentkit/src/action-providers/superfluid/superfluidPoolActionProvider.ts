import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { EvmWalletProvider } from "../../wallet-providers";
import { CreateAction } from "../actionDecorator";
import { Network } from "../../network";
import { SuperfluidCreatePoolSchema } from "./schemas";
import {
  GDAv1ForwarderAddress,
  GDAv1ForwarderABI
} from "./constants";
import { encodeFunctionData, Hex } from "viem";


/**
 * SuperfluidPoolActionProvider is an action provider for Superfluid interactions.
 */
export class SuperfluidPoolActionProvider extends ActionProvider {

  /**
   * Constructor for the SuperfluidPoolActionProvider class.
   */
  constructor() {
    super("superfluid-pool", []);

  }

  /**
   * Creates a pool from the agent wallet to the recipient
   *
   * @param walletProvider - The wallet provider to start the pool from.
   * @param args - The input arguments for the action.
   * @returns A JSON string containing the account details or error message
   */
  @CreateAction({
    name: "create_pool",
    description: `
This tool will create a Superfluid pool for a desired token on an EVM network.
It takes the ERC20 token address to create a pool of the tokens to later be multi streamed to other wallets.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    schema: SuperfluidCreatePoolSchema,
  })
  async createPool(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SuperfluidCreatePoolSchema>
  ): Promise<string> {
    try {
      const data = encodeFunctionData({
        abi: GDAv1ForwarderABI,
        functionName: "createPool",
        args: [args.erc20TokenAddress as Hex, walletProvider.getAddress() as Hex, {
          transferabilityForUnitsOwner: false,
          distributionFromAnyAddress: false,
        }],
      });

      const hash = await walletProvider.sendTransaction({
        to: GDAv1ForwarderAddress as `0x${string}`,
        data,
      });

      const receipt = await walletProvider.waitForTransactionReceipt(hash);
      const [success, poolAddress] = receipt.events.find(e => e.event === 'PoolCreated').args;

      // todo store this poolAddress is memory so we can manipulate it later (we don't trust the llm to remember...)
      return `Created pool of token ${args.erc20TokenAddress} at ${poolAddress}`;
    } catch (error) {
      return `Error creating Superfluid pool: ${error}`;
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

export const superfluidPoolActionProvider = () => new SuperfluidPoolActionProvider();
