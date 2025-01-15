# CDP Agentkit Contributing Guide

Thank you for your interest in contributing to CDP Agentkit! We welcome all contributions, no matter how big or small. Some of the ways you can contribute include:
- Adding new actions to the core package
- Creating new AI framework extensions
- Adding tests and improving documentation

## Development

### Prerequisites
- Node.js 18 or higher
- npm for package management

### Set-up

Clone the repo by running:

```bash
git clone git@github.com:coinbase/cdp-agentkit-nodejs.git
cd cdp-agentkit-nodejs
```

Install dependencies:

```bash
npm install
```

### Building

To build all packages:

```bash
npm run build
```

### Linting & Formatting

To check for lint errors:

```bash
npm run lint
```

To automatically fix lint errors:

```bash
npm run lint-fix
```

To format code:

```bash
npm run format
```

### Testing

To run all tests:

```bash
npm test
```

### Documentation

To generate documentation:

```bash
npm run docs
```

## Adding an Action to Agentkit Core

Actions are defined in `cdp-agentkit-core/src/actions` module. See `cdp-agentkit-core/src/actions/mint_nft.ts` for an example.

Actions are created by implementing the `CdpAction` interface:

```typescript
import { CdpAction } from "./cdp_action";
import { Wallet } from "@coinbase/coinbase-sdk";
import { z } from "zod";

const MINT_NFT_PROMPT = `
This tool will mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation. It takes the contract address of the NFT onchain and the destination address onchain that will receive the NFT as inputs. Do not use the contract address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.`;

/**
 * Input schema for mint NFT action.
 */
const MintNftInput = z
  .object({
    contractAddress: z.string().describe("The contract address of the NFT to mint"),
    destination: z.string().describe("The destination address that will receive the NFT"),
  })
  .strip()
  .describe("Instructions for minting an NFT");

/**
 * Mints an NFT (ERC-721) to a specified destination address onchain.
 *
 * @param wallet - The wallet to mint the NFT from.
 * @param args - The input arguments for the action.
 * @returns A message containing the NFT mint details.
 */
async function mintNft(wallet: Wallet, args: z.infer<typeof MintNftInput>): Promise<string> {
  const mintArgs = {
    to: args.destination,
    quantity: "1",
  };

  try {
    const mintInvocation = await wallet.invokeContract({
      contractAddress: args.contractAddress,
      method: "mint",
      args: mintArgs,
    });

    const result = await mintInvocation.wait();

    return `Minted NFT from contract ${args.contractAddress} to address ${args.destination} on network ${wallet.getNetworkId()}.\nTransaction hash for the mint: ${result.getTransaction().getTransactionHash()}\nTransaction link for the mint: ${result.getTransaction().getTransactionLink()}`;
  } catch (error) {
    return `Error minting NFT: ${error}`;
  }
}

/**
 * Mint NFT action.
 */
export class MintNftAction implements CdpAction<typeof MintNftInput> {
  public name = "mint_nft";
  public description = MINT_NFT_PROMPT;
  public argsSchema = MintNftInput;
  public func = mintNft;
}
```

### Components of an Agentic Action

1. **Input Schema**: Define the input parameters using Zod schemas
2. **Prompt**: A description that helps the AI understand when and how to use the action
3. **Action Class**: Implements the `CdpAction` interface with:
   - `name`: Unique identifier for the action
   - `description`: The prompt text
   - `argsSchema`: The Zod schema for validating inputs
   - `func`: The implementation function
4. **Implementation Function**: The actual logic that executes the action

## Adding an Agentic Action to the Langchain Toolkit

1. Ensure the action is implemented in `cdp-agentkit-core` and in a released version
2. Update the `cdp-agentkit-core` dependency to the latest version
3. Add the action to the list of tools in `CdpToolkit`

## Development Tools

### Formatting
```bash
npm run format
```

### Linting
```bash
# Check for lint errors
npm run lint

# Fix lint errors
npm run lint-fix
```

### Testing
```bash
npm test
```

### Documentation
```bash
npm run docs
```

## Changelog

For new features and bug fixes, please add a new changelog entry to the `CHANGELOG.md` file in the appropriate packages and include that in your Pull Request.

## Pull Request Process

1. Create a new branch for your changes
2. Make your changes following the coding standards
3. Add tests for any new functionality
4. Update documentation as needed
5. Update the CHANGELOG.md
6. Submit a pull request

## Code Style

All code must follow the project's ESLint and Prettier configurations. The key rules are:
- Use TypeScript
- Follow JSDoc documentation standards
- Use 2 spaces for indentation
- Maximum line length of 100 characters
- Double quotes for strings
- Semicolons required

## Getting Help

If you have questions or need help, please:
1. Check the existing documentation
2. Search through existing issues
3. Create a new issue with your question

Thank you for contributing to CDP Agentkit!
