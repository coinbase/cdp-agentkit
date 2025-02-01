import { z } from "zod";
import { Decimal } from "decimal.js";
import { encodeFunctionData, parseEther } from "viem";

import { ActionProvider } from "../actionProvider";
import { EvmWalletProvider } from "../../wallet-providers";
import { CreateAction } from "../actionDecorator";
import { approve } from "../../utils";
import { MTOKEN_ABI, MOONWELL_BASE_ADDRESSES, ETH_ROUTER_ABI, WETH_ROUTER_ADDRESS, MOONWELL_BASE_SEPOLIA_ADDRESSES } from "./constants";
import { DepositSchema, WithdrawSchema } from "./schemas";
import { Network } from "../../network";

export const SUPPORTED_NETWORKS = ["base-mainnet", "base-sepolia"];

/**
 * MoonwellActionProvider is an action provider for Moonwell MToken interactions.
 */
export class MoonwellActionProvider extends ActionProvider {
    /**
     * Constructor for the MoonwellActionProvider class.
     */
    constructor() {
        super("moonwell", []);
    }

    /**
     * Deposits assets into a Moonwell MToken
     *
     * @param wallet - The wallet instance to execute the transaction
     * @param args - The input arguments for the action
     * @returns A success message with transaction details or an error message
     */
    @CreateAction({
        name: "deposit",
        description: `
This tool allows depositing assets into a Moonwell MToken. 

It takes:
- mTokenAddress: The address of the Moonwell MToken to deposit to
- assets: The amount of assets to deposit in whole units
  Examples for WETH:
  - 1 WETH
  - 0.1 WETH
  - 0.01 WETH
- tokenAddress: The address of the token to approve

Important notes:
- Make sure to use the exact amount provided. Do not convert units for assets for this action.
- Please use a token address (example 0x4200000000000000000000000000000000000006) for the tokenAddress field.
`,
        schema: DepositSchema,
    })
    async deposit(wallet: EvmWalletProvider, args: z.infer<typeof DepositSchema>): Promise<string> {
        const assets = new Decimal(args.assets);

        if (assets.comparedTo(new Decimal(0.0)) != 1) {
            return "Error: Assets amount must be greater than 0";
        }

        const network = await wallet.getNetwork();
        const networkObject = network.networkId === "base-mainnet" ? MOONWELL_BASE_ADDRESSES : MOONWELL_BASE_SEPOLIA_ADDRESSES;

        if (!networkObject[args.mTokenAddress]) {
            return "Error: Invalid MToken address";
        }

        try {
            const atomicAssets = parseEther(args.assets);
            const userAddress = await wallet.getAddress();

            // Check if this is a WETH deposit on mainnet
            if (network.networkId === "base-mainnet" && "MOONWELL_WETH" === networkObject[args.mTokenAddress]) {
                // Use the router for ETH deposits - no approval needed since we're sending native ETH
                const data = encodeFunctionData({
                    abi: ETH_ROUTER_ABI,
                    functionName: "mint",
                    args: [userAddress],
                });

                const txHash = await wallet.sendTransaction({
                    to: WETH_ROUTER_ADDRESS as `0x${string}`,
                    data,
                    value: atomicAssets,
                });

                const receipt = await wallet.waitForTransactionReceipt(txHash);

                return `Deposited ${args.assets} ETH to Moonwell WETH via router with transaction hash: ${txHash}\nTransaction receipt: ${JSON.stringify(receipt)}`;
            } else {
                // For all other tokens, we need approval first
                const approvalResult = await approve(
                    wallet,
                    args.tokenAddress,
                    args.mTokenAddress,
                    atomicAssets,
                );
                if (approvalResult.startsWith("Error")) {
                    return `Error approving Moonwell MToken as spender: ${approvalResult}`;
                }

                const data = encodeFunctionData({
                    abi: MTOKEN_ABI,
                    functionName: "mint",
                    args: [atomicAssets],
                });

                const txHash = await wallet.sendTransaction({
                    to: args.mTokenAddress as `0x${string}`,
                    data,
                });

                const receipt = await wallet.waitForTransactionReceipt(txHash);

                return `Deposited ${args.assets} to Moonwell MToken ${args.mTokenAddress} with transaction hash: ${txHash}\nTransaction receipt: ${JSON.stringify(receipt)}`;
            }
        } catch (error) {
            return `Error depositing to Moonwell MToken: ${error}`;
        }
    }

    /**
     * Withdraws assets from a Moonwell MToken
     *
     * @param wallet - The wallet instance to execute the transaction
     * @param args - The input arguments for the action
     * @returns A success message with transaction details or an error message
     */
    @CreateAction({
        name: "withdraw",
        description: `
This tool allows withdrawing assets from a Moonwell MToken. It takes:

- mTokenAddress: The address of the Moonwell MToken to withdraw from
- assets: The amount of assets to withdraw in atomic units (wei)
`,
        schema: WithdrawSchema,
    })
    async withdraw(wallet: EvmWalletProvider, args: z.infer<typeof WithdrawSchema>): Promise<string> {
        if (BigInt(args.assets) <= 0) {
            return "Error: Assets amount must be greater than 0";
        }

        const network = await wallet.getNetwork();
        const networkObject = network.networkId === "base-mainnet" ? MOONWELL_BASE_ADDRESSES : MOONWELL_BASE_SEPOLIA_ADDRESSES;

        if (!networkObject[args.mTokenAddress]) {
            return "Error: Invalid MToken address";
        }

        try {
            const data = encodeFunctionData({
                abi: MTOKEN_ABI,
                functionName: "redeemUnderlying",
                args: [BigInt(args.assets)],
            });

            const txHash = await wallet.sendTransaction({
                to: args.mTokenAddress as `0x${string}`,
                data,
            });

            const receipt = await wallet.waitForTransactionReceipt(txHash);

            return `Withdrawn ${args.assets} from Moonwell MToken ${args.mTokenAddress} with transaction hash: ${txHash}\nTransaction receipt: ${JSON.stringify(receipt)}`;
        } catch (error) {
            return `Error withdrawing from Moonwell MToken: ${error}`;
        }
    }

    /**
     * Checks if the Moonwell action provider supports the given network.
     *
     * @param network - The network to check.
     * @returns True if the Moonwell action provider supports the network, false otherwise.
     */
    supportsNetwork = (network: Network) =>
        network.protocolFamily === "evm" && SUPPORTED_NETWORKS.includes(network.networkId!);
}

export const moonwellActionProvider = () => new MoonwellActionProvider(); 