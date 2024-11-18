# CDP Agentkit Langchain Extension Examples - Chatbot

This example demonstrates an agent setup as a terminal style chatbot with access to the full set of CDP Agentkit actions.

## Ask the chatbot to engage in the Web3 ecosystem!
- "Transfer a portion of your ETH to john2879.base.eth"
- "Deploy an NFT that will go super viral!"
- "Choose a name for yourself and register a Basename for your wallet"
- "Deploy an ERC-20 token with total supply 1 billion"

## Requirements
- Python 3.10+
- [CDP API Key](https://portal.cdp.coinbase.com/access/api)
- [OpenAI API Key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key)

### Checking Python Version
Before using the example, ensure that you have the correct version of Python installed. The example requires Python 3.10 or higher. You can check your Python version by running the following code:

```bash
python --version
pip --version
```

## Installation
```bash
pip install cdp-langchain
```

## Run the Chatbot

### Set ENV Vars
- Ensure the following ENV Vars are set:
  - "CDP_API_KEY_NAME"
  - "CDP_API_KEY_PRIVATE_KEY"
  - "OPENAI_API_KEY"
  - "NETWORK_ID" (Defaults to `base-sepolia`)

```bash
python chatbot.py
```

## Run it on a Gaia node

You can run an LLM on your own machine using the [Gaia network node software](https://github.com/GaiaNet-AI/gaianet-node). With open-source LLMs fine-tined for tool calls, such as the [Llama-3-Groq model on Gaia](https://github.com/GaiaNet-AI/node-configs/tree/main/llama-3-groq-8b-tool), you can use your own Gaia node as a free and decentrailized alternative to OpenAI.

To configure the agentic chatbot to use decentrailized AI, you just need to change one line of code to point the `base_url` to your Gaia node. 
In this example, the `https://llamatool.us.gaianet.network/v1` is a [public Gaia node](https://docs.gaianet.ai/user-guide/nodes#tool-use-llama) running a [tool call LLM](https://docs.gaianet.ai/tutorial/tool-call).

```
llm = ChatOpenAI(model="llama", api_key="GAIA", base_url="https://llamatool.us.gaianet.network/v1")
```

That's it. Now you can chat with the agent to perform on-chain actions through your COinbase MPC wallet!



