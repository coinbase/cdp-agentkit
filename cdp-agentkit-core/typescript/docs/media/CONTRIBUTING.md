# CDP Agentkit Contributing Guide
Thank you for your interest in contributing to CDP Agentkit! We welcome all contributions, no matter how big or small. Some of the ways you can contribute include:
- Adding new actions to the core package
- Updating existing Langchain Toolkits or adding new Langchain Toolkits to support new tools
- Creating new AI frameworks extensions
- Adding tests and improving documentation

### Set-up

Clone the repo by running:

```bash
git clone git@github.com:coinbase/cdp-agentkit.git
```

## Python Development
### Prerequisites
- Python 3.10 or higher
- Rust/Cargo installed ([Rust Installation Instructions](https://doc.rust-lang.org/cargo/getting-started/installation.html))
- Poetry for package management and tooling
  - [Poetry Installation Instructions](https://python-poetry.org/docs/#installation)

`cdp-langchain` also requires a [CDP API Key](https://portal.cdp.coinbase.com/access/api).

### Development Tools
#### Formatting
`make format`

#### Linting
- Check linter
`make lint`

- Fix linter errors
`make lint-fix`

#### Unit Testing
- Run unit tests
`make test`

## Typescript Development
### Prerequisites
- Node.js 18 or higher
- npm for package management

Install dependencies:

```bash
npm install
```

### Development Tools
#### Building

To build all packages:

```bash
npm run build
```

#### Linting & Formatting

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

#### Testing

To run all tests:

```bash
npm test
```

#### Documentation

To generate documentation:

```bash
npm run docs
```

#### Typescript Code Style

All code must follow the project's ESLint and Prettier configurations. The key rules are:
- Use TypeScript
- Follow JSDoc documentation standards
- Use 2 spaces for indentation
- Maximum line length of 100 characters
- Double quotes for strings
- Semicolons required


## Adding an Action to Agentkit Core
### Python
- Actions are defined in `./cdp-agentkit-core/python/cdp_agentkit_core/actions` module. See `./cdp-agentkit-core/python/cdp_agentkit_core/actions/mint_nft.py` for an example.
- Actions are created by subclassing `CdpAction`
  E.g.
```python
class DeployNftAction(CdpAction):
    """Deploy NFT action."""

    name: str = "mint_nft"
    description: str = MINT_NFT_PROMPT
    args_schema: type[BaseModel] | None = MintNftInput
    func: Callable[..., str] = mint_nft
```

#### Components of an Agentic Action
- `name` - Name of the action.
- `description` - A string that will provide the AI Agent with context on what the function does and a natural language description of the input.
  - E.g. 
```python
MINT_NFT_PROMPT = """
This tool will mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation. It takes the contract address of the NFT onchain and the destination address onchain that will receive the NFT as inputs."""
```
- `arg_schema` - A Pydantic Model that defines the input argument schema for the action.
  - E.g.
```python
class MintNftInput(BaseModel):
    """Input argument schema for mint NFT action."""

    contract_address: str = Field(
        ...,
        description="The contract address of the NFT (ERC-721) to mint, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`",
    )
    destination: str = Field(
        ...,
        description="The destination address that will receive the NFT onchain, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`",
    )
```
- `func` - A function (or Callable class) that executes the action.
  - E.g.
```python
def mint_nft(wallet: Wallet, contract_address: str, destination: str) -> str:
    """Mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation.

    Args:
        wallet (Wallet): The wallet to trade the asset from.
        contract_address (str): The contract address of the NFT (ERC-721) to mint, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`.
        destination (str): The destination address that will receive the NFT onchain, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`.

    Returns:
        str: A message containing the NFT mint details.

    """
    mint_args = {"to": destination, "quantity": "1"}

    mint_invocation = wallet.invoke_contract(
        contract_address=contract_address, method="mint", args=mint_args
    ).wait()

    return f"Minted NFT from contract {contract_address} to address {destination} on network {wallet.network_id}.\nTransaction hash for the mint: {mint_invocation.transaction.transaction_hash}\nTransaction link for the mint: {mint_invocation.transaction.transaction_link}"
```

### Typescript
Actions are defined in `cdp-agentkit-core/typescript/src/actions` module. See `cdp-agentkit-core/typescript/src/actions/cdp/mint_nft.ts` for an example.

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

#### Components of an Agentic Action

1. **Input Schema**: Define the input parameters using Zod schemas
2. **Prompt**: A description that helps the AI understand when and how to use the action
3. **Action Class**: Implements the `CdpAction` interface with:
   - `name`: Unique identifier for the action
   - `description`: The prompt text
   - `argsSchema`: The Zod schema for validating inputs
   - `func`: The implementation function
4. **Implementation Function**: The actual logic that executes the action

## Adding an Agentic Action to Langchain Toolkit
For both Python and Typescript, follow these steps:
1. Ensure the action is implemented in `cdp-agentkit-core` and in a released version.
2. Update the `cdp-agentkit-core` dependency to the latest version.
3. Add the action to the list of tools in the `CdpToolkit` class documentation.

## Adding an Agentic Action to the Twitter Toolkit
### Python
1. Ensure the action is implemented in `cdp-agentkit-core/actions/social/twitter`.
2. Add a wrapper method to `TwitterApiWrapper` in `./twitter_langchain/twitter_api_wrapper.py`
   - E.g.
```python
    def post_tweet_wrapper(self, tweet: str) -> str:
        """Post tweet to Twitter.

        Args:
            client (tweepy.Client): The tweepy client to use.
            tweet (str): The text of the tweet to post to twitter. Tweets can be maximum 280 characters.

        Returns:
            str: A message containing the result of the post action and the tweet.

        """

        return post_tweet(client=self.client, tweet=tweet)
```
3. Add call to the wrapper in `TwitterApiWrapper.run` in `./twitter_langchain/twitter_api_wrapper.py`
   - E.g.
```python
        if mode == "post_tweet":
            return self.post_tweet_wrapper(**kwargs)

```
4. Add the action to the list of available tools in the `TwitterToolkit` in `./twitter_langchain/twitter_toolkit.py`
   - E.g.
```python
        actions: List[Dict] = [
            {
                "mode": "post_tweet",
                "name": "post_tweet",
                "description": POST_TWEET_PROMPT,
                "args_schema": PostTweetInput,
            },
        ]
```
5. Update `TwitterToolkit` documentation
    - Add the action to the list of tools
    - Add any additional ENV requirements



## Changelog
- For new features and bug fixes, please add a new changelog entry to the `CHANGELOG.md` file in the appropriate packages and include that in your Pull Request.

## Pull Request Process

1. Create a new branch for your changes
2. Make your changes following the coding standards
3. Add tests for any new functionality
4. Update documentation as needed
5. Update the CHANGELOG.md
6. Submit a pull request

## Getting Help

If you have questions or need help, please:
1. Check the existing documentation
2. Search through existing issues
3. Create a new issue with your question

Thank you for contributing to CDP AgentKit!



