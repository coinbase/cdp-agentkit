# FlippandoAgentkit

The `flippando-agentkit.ts` file defines the `FlippandoAgentkit` class, which serves as the main interface for interacting with the Flippando game contracts and related services.

## Key Components

### `FlippandoAgentkitConfig` Interface

This interface defines the configuration options for the `FlippandoAgentkit`:

- `privateKey`: A string representing the private key for the wallet.
- `twitterApiKey`: Twitter API key for posting tweets.
- `twitterApiSecret`: Twitter API secret.
- `twitterAccessToken`: Twitter access token.
- `twitterAccessSecret`: Twitter access token secret.
- `neynarApiKey`: API key for the Neynar service (used for Farcaster interactions).
- `farcasterSignerUuid`: UUID for the Farcaster signer.
- `chainId`: The ID of the blockchain network.
- `rpcUrl`: The URL of the RPC endpoint for the blockchain network.
- `flippandoAddress`: The address of the Flippando game contract.
- `flipndAddress`: The address of the FLIPND token contract.
- `flippandoGameMasterAddress`: The address of the Flippando game master contract.
- `flipndBundlerAddress`: The address of the Flippando bundler contract.

### `FlippandoAgentkit` Class

This class is the core of the Flippando agent, managing all interactions with the game contracts and external services.

#### Properties

- `provider`: An instance of `ethers.providers.JsonRpcProvider` for connecting to the blockchain.
- `signer`: An instance of `ethers.Signer` for signing transactions.
- `privateKey`: To be used as the main address for the agent
- `cdpApiKeyName`,`cdpApiKeyPrivateKey`: To be used when interacting with Coinbase Developer Platform
- `flippandoAddress`: To be used as an instance of `ethers.Contract` representing the Flippando game contract.
- `flipndAddress`: To be used as an instance of `ethers.Contract` representing the FLIPND token contract.
- `flippandoBundlerAddress`: To be used as an instance of `ethers.Contract` representing the Flippando game master contract.
- `flippandoGameMasterAddress`: To be used as an instance of `ethers.Contract` representing the FLIPND token contract.
- `titterApiKey`, `twitterApiSecret`,`twitterAccessToken`,`twitterAccessSecret`: To be used while interacting with Twitter
- `neynarApiKey`,`signerUUID`: To be used when interacting with Farcaster

#### Constructor

The constructor takes a `FlippandoAgentkitConfig` object and initializes all the necessary connections and instances.

#### Methods

1. `getProvider()`
   - Returns the provider for the chain

2. `getSigner()`
   - Returns the signer for signing transactions
  
3. `getFlippandoGameMasterAddress()`
   - Returns the Flippando Game Master contract address

4. `getFlippandoAddress()`
   - Returns the Flippando Game contract address

5. `getFlippandoBundlerAddress()`
   - Returns the Flippando Bundler contract address

6. `getFlipndAddress()`
   - Returns the fungible token $FLIPND contract address

7. `getChainId()`
   - Returns the current chain id

7. `getTwitterApiKey()`
   - Returns the Twitter API key

8. `getTwitterApiSecret()`
   - Returns the Twitter API key secret

9. `getTwitterAccessToken()`
   - Returns the Twitter Access token

10. `getTwitterAccessSecret()`
      - Returns the Twitter Access secret
   
11. `getNeynarApiKey()`
      - Returns the Neynar API key.

12. `getFarcasterSignerUuid()`
      - Returns the Farcaster signer UUID.

13. `updateNetwork(chainId: number, rpcUrl: string, flippandoContractAddress: string, flipndContractAddress: string)`
      - Updates the network configuration and reinitializes contracts. Must be passed valid addresses for a deployed Flippando game.
      - This method allows for changing the blockchain network dynamically.


## Usage

The `FlippandoAgentkit` is typically instantiated once and then used throughout the application to interact with the Flippando game. It provides a high-level interface for game actions, metadata retrieval, image generation, and social media interactions.

In this implementation it is instatiated once in `flippando-agent.ts`, where we assign tools and then call them directly.

Potential usage:

```typescript

const flippandoAgentkit = new FlippandoAgentkit()

// Get metadata for a flip
const metadata = await flippandoAgentkit.getFlipMetadata("tokenId123");

// Generate an image for a flip
const image = await flippandoAgentkit.generateImageForFlip("tokenId123", metadata);

// Change network
await flippandoAgentkit.updateNetwork(
  80001,
  "https://rpc-mumbai.matic.today",
  "0x1234...5678",
  "0xabcd...ef01"
);
