# CDP Agentkit Extension - Langchain Toolkit

## Developing
- `cdp-sdk` has a dependency on `cargo`, please install rust and add `cargo` to your path
  - [Rust Installation Instructions](https://doc.rust-lang.org/cargo/getting-started/installation.html)
  - `export PATH="$HOME/.cargo/bin:$PATH"`
- Agentkit uses `poetry` for package management and tooling
  - [Poetry Installation Instructions](https://python-poetry.org/docs/#installation)
  - Run `poetry install` to install `cdp-langchain` dependencies
  - Run `poetry shell` to activate the virtual environment

### Formatting
`make format`

### Linting
- Check linter
`make lint`

- Fix linter errors
`make lint-fix`

## Adding an Agentic Action to the Langchain Toolkit
1. Ensure the action is implemented in `cdp-agentkit-core`.
2. Add a wrapper method to `CdpAgentkitWrapper` in `./cdp_langchain/utils/cdp_agentkit_wrapper.py`
   - E.g.
```python
    def mint_nft_wrapper(self, contract_address: str, destination: str) -> str:
        """Mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation.

        Args:
            contract_address (str): "The contract address of the NFT (ERC-721) to mint, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`".
            destination (str): "The destination address that will receieve the NFT onchain, e.g. `0x036CbD53842c5426634e7929541eC2318f3dCF7e`".

        Returns:
            str: A message containing the NFT mint details.

        """
        return mint_nft(
            wallet=self.wallet,
            contract_address=contract_address,
            destination=destination,
        )
```
3. Add call to the wrapper in `CdpAgentkitWrapper.run` in `./cdp_langchain/utils/cdp_agentkit_wrapper.py`
   - E.g.
```python
        if mode == "mint_nft":
            return self.mint_nft_wrapper(**kwargs)

```
4. Add the action to the list of available tools in the `CdpToolkit` in `./cdp_langchain/agent_toolkits/cdp_toolkit.py`
   - E.g.
```python
        actions: List[Dict] = [
            {
                "mode": "mint_nft",
                "name": "mint_nft",
                "description": MINT_NFT_PROMPT,
                "args_schema": MintNftInput,
            },
        ]
```
5. Add the action to the list of tools in the `CdpToolkit` class documentation.
