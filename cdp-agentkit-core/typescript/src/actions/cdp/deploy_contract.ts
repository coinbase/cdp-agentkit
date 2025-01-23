import { CdpAction } from "./cdp_action";
import { Wallet } from "@coinbase/coinbase-sdk";
import { z } from "zod";

const DEPLOY_CONTRACT_PROMPT = `
Deploys smart contract with required args: solidity version (string), solidity input json (string), contract name (string), and optional constructor args (Record<string,any>).

Input json structure:
{"language":"Solidity","settings":{"remappings":[],"outputSelection":{"*":{"*":["abi","evm.bytecode"]}}},"sources":{}}

The solidity version must be >= 0.8.0 and <= 0.8.28.

You must set the abi and evm.bytecode in the outputSelection. Do not include any extra spaces in the JSON key fields. Remappings can be set as needed in settings. 
Sources should contain inline contract code. Include library source if needed. If the constructor takes in parameters, you must pass in the constructor args, which is a key-value
map where the key is the argument name and the value is the argument value. Encode uint/int/bytes/string/address values as strings, boolean values as true/false. For arrays/tuples, encode based on contained type.
`;

const SolidityVersions = {
  "0.8.28": "0.8.28+commit.7893614a",
  "0.8.27": "0.8.27+commit.40a35a09", 
  "0.8.26": "0.8.26+commit.8a97fa7a",
  "0.8.25": "0.8.25+commit.b61c2a91",
  "0.8.24": "0.8.24+commit.e11b9ed9",
  "0.8.23": "0.8.23+commit.f704f362",
  "0.8.22": "0.8.22+commit.4fc1097e",
  "0.8.21": "0.8.21+commit.d9974bed",
  "0.8.20": "0.8.20+commit.a1b79de6",
  "0.8.19": "0.8.19+commit.7dd6d404",
  "0.8.18": "0.8.18+commit.87f61d96",
  "0.8.17": "0.8.17+commit.8df45f5f",
  "0.8.16": "0.8.16+commit.07a7930e",
  "0.8.15": "0.8.15+commit.e14f2714",
  "0.8.14": "0.8.14+commit.80d49f37",
  "0.8.13": "0.8.13+commit.abaa5c0e",
  "0.8.12": "0.8.12+commit.f00d7308",
  "0.8.11": "0.8.11+commit.d7f03943",
  "0.8.10": "0.8.10+commit.fc410830",
  "0.8.9": "0.8.9+commit.e5eed63a",
  "0.8.8": "0.8.8+commit.dddeac2f", 
  "0.8.7": "0.8.7+commit.e28d00a7",
  "0.8.6": "0.8.6+commit.11564f7e",
  "0.8.5": "0.8.5+commit.a4f2e591",
  "0.8.4": "0.8.4+commit.c7e474f2",
  "0.8.3": "0.8.3+commit.8d00100c",
  "0.8.2": "0.8.2+commit.661d1103",
  "0.8.1": "0.8.1+commit.df193b15",
  "0.8.0": "0.8.0+commit.c7dfd78e"
 } as const;

/**
 * Input schema for deploy contract action.
 */
export const DeployContractInput = z
  .object({
    solidityVersion: z.enum(Object.keys(SolidityVersions) as [string, ...string[]]).describe("The solidity compiler version"),
    solidityInputJson: z.string().describe("The input json for the solidity compiler"),
    contractName: z.string().describe("The name of the contract class to be deployed"),
    constructorArgs: z
      .record(z.string(), z.any())
      .describe("The constructor arguments for the contract")
      .optional(),
  })
  .strip()
  .describe("Instructions for deploying an arbitrary contract");

/**
 * Deploys an arbitrary contract.
 *
 * @param wallet - The wallet to deploy the contract from.
 * @param args - The input arguments for the action. The three required fields are solidityVersion, solidityInputJson, and contractName. The constructorArgs field is only required if the contract has a constructor.
 * @returns A message containing the deployed contract address and details.
 */
export async function deployContract(
  wallet: Wallet,
  args: z.infer<typeof DeployContractInput>,
): Promise<string> {
  try {
    const solidityVersion = SolidityVersions[args.solidityVersion];

    const contract = await wallet.deployContract({
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
 * Deploy contract action.
 */
export class DeployContractAction implements CdpAction<typeof DeployContractInput> {
  public name = "deploy_contract";
  public description = DEPLOY_CONTRACT_PROMPT;
  public argsSchema = DeployContractInput;
  public func = deployContract;
}
