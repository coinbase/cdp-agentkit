import { ExternalAddress } from "@coinbase/coinbase-sdk";
import { z } from "zod";

import { CreateAction } from "../action_decorator";
import { ActionProvider } from "../action_provider";
import { Network } from "../../network";
import { CdpWalletProvider } from "../../wallet_providers";

import { SolidityVersions } from "./constants";
import {
  AddressReputationSchema,
  DeployContractSchema,
  DeployNftSchema,
  DeployTokenSchema,
  RequestFaucetFundsSchema,
} from "./schemas";

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
   * Deploys a contract.
   *
   * @param walletProvider - The wallet provider to deploy the contract from
   * @param args - The input arguments for the action
   * @returns A message containing the deployed contract address and details
   */
  @CreateAction({
    name: "deploy_contract",
    description: `
Deploys smart contract with required args: solidity version (string), solidity input json (string), contract name (string), and optional constructor args (Dict[str, Any])

Input json structure:
{"language":"Solidity","settings":{"remappings":[],"outputSelection":{"*":{"*":["abi","evm.bytecode"]}}},"sources":{}}

You must set the outputSelection to {"*":{"*":["abi","evm.bytecode"]}} in the settings. The solidity version must be >= 0.8.0 and <= 0.8.28.

Sources should contain one or more contracts with the following structure:
{"contract_name.sol":{"content":"contract code"}}

The contract code should be escaped. Contracts cannot import from external contracts but can import from one another.

Constructor args are required if the contract has a constructor. They are a key-value
map where the key is the arg name and the value is the arg value. Encode uint/int/bytes/string/address values as strings, boolean values as true/false. For arrays/tuples, encode based on contained type.`,
    schema: DeployContractSchema,
  })
  async deployContract(
    walletProvider: CdpWalletProvider,
    args: z.infer<typeof DeployContractSchema>,
  ): Promise<string> {
    try {
      const solidityVersion = SolidityVersions[args.solidityVersion];

      const contract = await walletProvider.deployContract({
        solidityVersion: solidityVersion,
        solidityInputJson: args.solidityInputJson,
        contractName: args.contractName,
        constructorArgs: args.constructorArgs ?? {},
      });

      const result = await contract.wait();

      return `Deployed contract ${args.contractName} at address ${result.getContractAddress()}. Transaction link: ${result
        .getTransaction()!
        .getTransactionLink()}`;
    } catch (error) {
      return `Error deploying contract: ${error}`;
    }
  }

  /**
   * Deploys an NFT (ERC-721) token collection onchain from the wallet.
   *
   * @param walletProvider - The wallet provider to deploy the NFT from.
   * @param args - The input arguments for the action.
   * @returns A message containing the NFT token deployment details.
   */
  @CreateAction({
    name: "deploy_nft",
    description: `This tool will deploy an NFT (ERC-721) contract onchain from the wallet. 
  It takes the name of the NFT collection, the symbol of the NFT collection, and the base URI for the token metadata as inputs.`,
    schema: DeployNftSchema,
  })
  async deployNFT(
    walletProvider: CdpWalletProvider,
    args: z.infer<typeof DeployNftSchema>,
  ): Promise<string> {
    try {
      const nftContract = await walletProvider.deployNFT({
        name: args.name,
        symbol: args.symbol,
        baseURI: args.baseURI,
      });

      const result = await nftContract.wait();

      const transaction = result.getTransaction()!;
      const networkId = walletProvider.getNetwork().networkId;
      const contractAddress = result.getContractAddress();

      return [
        `Deployed NFT Collection ${args.name}:`,
        `- to address ${contractAddress}`,
        `- on network ${networkId}.`,
        `Transaction hash: ${transaction.getTransactionHash()}`,
        `Transaction link: ${transaction.getTransactionLink()}`,
      ].join("\n");
    } catch (error) {
      return `Error deploying NFT: ${error}`;
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
