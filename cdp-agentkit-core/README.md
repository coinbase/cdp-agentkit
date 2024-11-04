# Agentkit Core
Core primitives and framework agnostic tools that are meant to be composable and used via Agentkit framework extensions.

## Developing
- `cdp-sdk` has a dependency on `cargo`, please install rust and add `cargo` to your path
  - [Rust Installation Instructions](https://doc.rust-lang.org/cargo/getting-started/installation.html)
  - `export PATH="$HOME/.cargo/bin:$PATH"`
- Agentkit uses `poetry` for package management and tooling
  - [Poetry Installation Instructions](https://python-poetry.org/docs/#installation)
  - Run `poetry install` to install `cdp-agentkit-core` dependencies
  - Run `poetry shell` to activate the virtual environment
  
### Formatting
`make format`

### Linting
- Check linter
`make lint`

- Fix linter errors
`make lint-fix`

### Unit Testing
- Run unit tests
`make test`

## Contributing Agentic Actions
- Actions are defined in `./cdp_agentkit_core/actions` module. See `./cdp_agentkit_core/actions/mint_nft.py` for an example.

### Components of an Agentic Action
Each action will define and export 3 components:
- Prompt - A string that will provide the AI Agent with context on what the function does and a natural language description of the input.
  - E.g. 
```python
MINT_NFT_PROMPT = """
This tool will mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation. It takes the contract address of the NFT onchain and the destination address onchain that will receive the NFT as inputs."""
```
- ArgSchema - A Pydantic Model that defines the input argument schema for the action.
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
        description="The destination address that will receieve the NFT onchain, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`",
    )
```
- Action Callable - A function (or Callable class) that executes the action.
  - E.g.
```python
def mint_nft(wallet: Wallet, contract_address: str, destination: str) -> str:
    """Mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation.

    Args:
        wallet (Wallet): The wallet to trade the asset from.
        contract_address (str): The contract address of the NFT (ERC-721) to mint, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`.
        destination (str): The destination address that will receieve the NFT onchain, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`.

    Returns:
        str: A message containing the NFT mint details.

    """
    mint_args = {"to": destination, "quantity": "1"}

    mint_invocation = wallet.invoke_contract(
        contract_address=contract_address, method="mint", args=mint_args
    ).wait()

    return f"Minted NFT from contract {contract_address} to address {destination} on network {wallet.network_id}.\nTransaction hash for the mint: {mint_invocation.transaction.transaction_hash}\nTransaction link for the mint: {mint_invocation.transaction.transaction_link}"
```
