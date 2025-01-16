# CDP AgentKit Langchain Extension Examples - Mnemomic Phrase Wallet Import

This example demonstrates agentkit setup with an imported wallet from a mnemomic phrase through the ENV. An example of a mnemomic phrase could be:
```bash
eternal phone creek robot disorder climb thought eternal noodle flat cage bubble liquid sting can
```

## Requirements

- Node.js 18+
- [CDP API Key](https://portal.cdp.coinbase.com/access/api)

### Checking Node Version

Before using the example, ensure that you have the correct version of Node.js installed. The example requires Node.js 18 or higher. You can check your Node version by running:

```bash
node --version
npm --version
```

## Installation

```bash
npm install
```

## Run the Chatbot

### Set ENV Vars

Ensure the following ENV Vars are set in .env
- "CDP_API_KEY_NAME"
- "CDP_API_KEY_PRIVATE_KEY"
- "MNEMONIC_PHRASE"
- "OPENAI_API_KEY"
- "NETWORK_ID" (Defaults to `base-sepolia`)

The mnemomic phrase example above can be used to validate wallet import functionality.

```bash
npm start
```

## License

Apache-2.0
