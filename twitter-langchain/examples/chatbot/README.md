# CDP Agentkit Twitter Langchain Extension Examples - Chatbot

This example demonstrates an agent setup as a terminal style chatbot with access to Twitter (X) API actions.

## Ask the chatbot to engage in the Twitter (X) ecosystem!
- "Transfer a portion of your ETH to john2879.base.eth"
- "What are my account details?"
- "Please post a message for me to Twitter"
- "Please get my mentions"
- "Please post responses to my mentions"

## Requirements
- Python 3.10+
- [OpenAI API Key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key)
- [Twitter (X) API Key's](https://developer.x.com/en/portal/dashboard)

### Checking Python Version

```bash
python --version
pip --version
```

## Installation
```bash
```

## Run the Chatbot

### Env
Ensure the following vars are set in .env-local:
- "OPENAI_API_KEY"
- "TWITTER_ACCESS_TOKEN"
- "TWITTER_ACCESS_TOKEN_SECRET"
- "TWITTER_API_KEY"
- "TWITTER_API_SECRET"
- "TWITTER_BEARER_TOKEN"

```bash
make run
```
