import { CdpAction } from "./cdp_action";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { encodeFunctionData, namehash } from "viem";
import { z } from "zod";
import { Decimal } from "decimal.js";

const REGISTER_BASENAME_PROMPT = `
This tool will register a Basename for the agent. The agent should have a wallet associated to register a Basename.
When your network ID is 'base-mainnet' (also sometimes known simply as 'base'), the name must end with .base.eth, and when your network ID is 'base-sepolia', it must ends with .basetest.eth.
Do not suggest any alternatives and never try to register a Basename with another postfix. The prefix of the name must be unique so if the registration of the
Basename fails, you should prompt to try again with a more unique name.
`;

// Contract addresses
export const BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_MAINNET =
  "0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5";
export const BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_TESTNET =
  "0x49aE3cC2e3AA768B1e5654f5D3C6002144A59581";

export const L2_RESOLVER_ADDRESS_MAINNET = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";
export const L2_RESOLVER_ADDRESS_TESTNET = "0x6533C94869D28fAA8dF77cc63f9e2b2D6Cf77eBA";

// Default registration duration (1 year in seconds)
export const REGISTRATION_DURATION = "31557600";

// Relevant ABI for L2 Resolver Contract.
export const L2_RESOLVER_ABI = [
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "address", name: "a", type: "address" },
    ],
    name: "setAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "string", name: "newName", type: "string" },
    ],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Relevant ABI for Basenames Registrar Controller Contract.
export const REGISTRAR_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "resolver",
            type: "address",
          },
          {
            internalType: "bytes[]",
            name: "data",
            type: "bytes[]",
          },
          {
            internalType: "bool",
            name: "reverseRecord",
            type: "bool",
          },
        ],
        internalType: "struct RegistrarController.RegisterRequest",
        name: "request",
        type: "tuple",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

/**
 * Input schema for registering a Basename.
 */
export const RegisterBasenameInput = z
  .object({
    basename: z.string().describe("The Basename to assign to the agent"),
    amount: z.string().default("0.002").describe("The amount of ETH to pay for registration"),
  })
  .strip()
  .describe("Instructions for registering a Basename");

/**
 * Creates registration arguments for Basenames.
 *
 * @param baseName - The Basename (e.g., "example.base.eth" or "example.basetest.eth").
 * @param addressId - The Ethereum address.
 * @param isMainnet - True if on mainnet, False if on testnet.
 * @returns Formatted arguments for the register contract method.
 */
function createRegisterContractMethodArgs(
  baseName: string,
  addressId: string,
  isMainnet: boolean,
): object {
  const l2ResolverAddress = isMainnet ? L2_RESOLVER_ADDRESS_MAINNET : L2_RESOLVER_ADDRESS_TESTNET;
  const suffix = isMainnet ? ".base.eth" : ".basetest.eth";

  const addressData = encodeFunctionData({
    abi: L2_RESOLVER_ABI,
    functionName: "setAddr",
    args: [namehash(baseName), addressId],
  });
  const nameData = encodeFunctionData({
    abi: L2_RESOLVER_ABI,
    functionName: "setName",
    args: [namehash(baseName), baseName],
  });

  const registerArgs = {
    request: [
      baseName.replace(suffix, ""),
      addressId,
      REGISTRATION_DURATION,
      l2ResolverAddress,
      [addressData, nameData],
      true,
    ],
  };

  return registerArgs;
}

/**
 * Registers a Basename for the agent.
 *
 * @param wallet - The wallet to register the Basename with.
 * @param args - The input arguments for the action.
 * @returns Confirmation message with the basename.
 */
export async function registerBasename(
  wallet: Wallet,
  args: z.infer<typeof RegisterBasenameInput>,
): Promise<string> {
  const addressId = (await wallet.getDefaultAddress()).getId();
  const isMainnet = wallet.getNetworkId() === Coinbase.networks.BaseMainnet;

  const suffix = isMainnet ? ".base.eth" : ".basetest.eth";
  if (!args.basename.endsWith(suffix)) {
    args.basename += suffix;
  }

  const registerArgs = createRegisterContractMethodArgs(args.basename, addressId, isMainnet);

  try {
    const contractAddress = isMainnet
      ? BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_MAINNET
      : BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_TESTNET;

    const invocation = await wallet.invokeContract({
      contractAddress,
      method: "register",
      args: registerArgs,
      abi: REGISTRAR_ABI,
      amount: new Decimal(args.amount),
      assetId: "eth",
    });

    await invocation.wait();
    return `Successfully registered basename ${args.basename} for address ${addressId}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    return `Error registering basename: Error: ${error}`;
  }
}

/**
 * Register Basename action.
 */
export class RegisterBasenameAction implements CdpAction<typeof RegisterBasenameInput> {
  public name = "register_basename";
  public description = REGISTER_BASENAME_PROMPT;
  public argsSchema = RegisterBasenameInput;
  public func = registerBasename;
}
