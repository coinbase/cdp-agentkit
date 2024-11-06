# Twitter (X) Langchain Toolkit

## Developing
- `cdp-sdk` has a dependency on `cargo`, please install rust and add `cargo` to your path
  - [Rust Installation Instructions](https://doc.rust-lang.org/cargo/getting-started/installation.html)
  - `export PATH="$HOME/.cargo/bin:$PATH"`
- Agentkit uses `poetry` for package management and tooling
  - [Poetry Installation Instructions](https://python-poetry.org/docs/#installation)
  - Run `poetry install` to install `cdp-langchain` dependencies
  - Run `poetry shell` to activate the virtual environment

## Documentation
- [Agentkit-Core](https://coinbase.github.io/cdp-agentkit-core)
- [Agentkit-Langchain](https://coinbase.github.io/cdp-langchain)
- [Agentkit-Twitter-Langchain](https://coinbase.github.io/twitter-langchain)

### Formatting
`make format`

### Linting
- Check linter
`make lint`

- Fix linter errors
`make lint-fix`

## Adding an Agentic Action to the Langchain Toolkit
1. Ensure the action is implemented in `cdp-agentkit-core`.
2. Add a wrapper method to `TwitterApiWrapper` in `./twitter_langchain/twitter_api_wrapper.py`
   - E.g.
```python
    def post_text_wrapper(self, text: str) -> str:
        """Post text to Twitter.

        Args:
            text (str): The text to post.

        Returns:
            str: A text containing the result of the post text to twitter response.

        """
        return post_text(client=self.client, text=text)
```
3. Add call to the wrapper in `TwitterApiWrapper.run` in `./twitter_langchain/twitter_api_wrapper.py`
   - E.g.
```python
        if mode == "post_text":
            return self.post_text_wrapper(**kwargs)

```
4. Add the action to the list of available tools in the `TwitterToolkit` in `./twitter_langchain/twitter_toolkit.py`
   - E.g.
```python
        actions: List[Dict] = [
            {
                "mode": "post_text",
                "name": "post_text",
                "description": POST_TEXT_PROMPT,
                "args_schema": PostTextInput,
            },
        ]
```
5. Update `TwitterToolkit` documentation
    - Add the action to the list of tools
    - Add any additional ENV requirements
