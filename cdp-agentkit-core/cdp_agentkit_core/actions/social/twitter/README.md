# Twitter Account Details Action

This action retrieves the account details for the currently authenticated Twitter (X) user context.

## Overview

The `account_details` function in `account_details.py` is used to get the authenticated Twitter (X) user account details. It returns a message containing the account details for the authenticated user context.

## Usage Instructions

### Prerequisites

- You need to have a Twitter Developer account and create a Twitter App to get the necessary API keys and tokens.
- Install the required dependencies:
  ```bash
  pip install tweepy
  ```

### Setup

1. Set up your Twitter API credentials as environment variables:
   ```bash
   export TWITTER_API_KEY="your_api_key"
   export TWITTER_API_SECRET="your_api_secret"
   export TWITTER_ACCESS_TOKEN="your_access_token"
   export TWITTER_ACCESS_TOKEN_SECRET="your_access_token_secret"
   export TWITTER_BEARER_TOKEN="your_bearer_token"
   ```

2. Create a `tweepy.Client` instance using your credentials:
   ```python
   import tweepy

   client = tweepy.Client(
       consumer_key="your_api_key",
       consumer_secret="your_api_secret",
       access_token="your_access_token",
       access_token_secret="your_access_token_secret",
       bearer_token="your_bearer_token",
       return_type=dict,
   )
   ```

### Example Usage

```python
from cdp_agentkit_core.actions.social.twitter.account_details import account_details

# Create a tweepy.Client instance
client = tweepy.Client(
    consumer_key="your_api_key",
    consumer_secret="your_api_secret",
    access_token="your_access_token",
    access_token_secret="your_access_token_secret",
    bearer_token="your_bearer_token",
    return_type=dict,
)

# Get account details
response = account_details(client)
print(response)
```

### Expected Input and Output

#### Input

- `client` (tweepy.Client): The Twitter (X) client used to authenticate with.

#### Output

- A message containing account details for the authenticated user context.

#### Example Output

```json
{
  "data": {
    "id": "123456789",
    "name": "Your Name",
    "username": "yourusername",
    "url": "https://x.com/yourusername"
  }
}
```

In case of an error, the output will be an error message:
```json
{
  "error": "Error retrieving authenticated user account details: <error_message>"
}
```
