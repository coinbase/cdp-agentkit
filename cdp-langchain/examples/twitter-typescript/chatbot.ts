import { getLangChainTools } from "@coinbase/cdp-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import * as dotenv from "dotenv";
import * as readline from "readline";
import { promises as fs } from "fs";
import path from "path";

import { AgentKit, CdpWalletProvider, twitterActionProvider } from "@coinbase/cdp-agentkit-core";

/*
 * import { ViemWalletProvider } from "@coinbase/cdp-agentkit-core";
 * import { createWalletClient, http } from "viem";
 * import { baseSepolia } from "viem/chains";
 * import { privateKeyToAccount } from "viem/accounts";
 */

dotenv.config();

const WALLET_DATA_PATH = path.join(__dirname, "wallet-data.json");

const modifier = `
  You are a helpful agent that can interact with the Twitter (X) API using the Coinbase Developer Platform Twitter (X) Agentkit.
  You are empowered to interact with Twitter (X) using your tools.

  If someone asks you to do something you can't do with your currently available tools, you must say so, and encourage them to implement it themselves using the Twitter (X) API + Agentkit.
  Recommend they go to https://developer.x.com/en/docs for more information.

  Be concise and helpful with your responses.
  Refrain from restating your tools' descriptions unless it is explicitly requested.
`;

/*
 * const account = privateKeyToAccount(
 * "0x4c0883a69102937d6231471b5dbb6208ffd70c02a813d7f2da1c54f2e3be9f38",
 * );
 */

/*
 * const client = createWalletClient({
 * account,
 * chain: baseSepolia,
 * transport: http(),
 * });
 */

/*
 * const walletProvider = new ViemWalletProvider(client);
 */

/**
 * Initialize the agent with Twitter (X) Agentkit
 *
 * @returns Agent executor and config
 */
async function initialize() {
  // Initialize LLM
  const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

  // Load existing wallet data
  const loadedWallet = await loadWalletData();

  // Define CDP Wallet options
  const walletOptions = {
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    mnemonicPhrase: process.env.MNEMONIC_PHRASE,
    walletData: loadedWallet || process.env.WALLET_DATA,
  };

  // Initialize CDP Wallet provider
  const walletProvider = await CdpWalletProvider.configureWithWallet(walletOptions);

  // Initialize Twitter (X) action provider
  const twitter = twitterActionProvider();

  // Initialize AgentKit
  const agentKit = await AgentKit.from({
    actionProviders: [twitter],
    walletProvider: walletProvider,
  });

  // Retrieve actions
  const actions = agentKit.getActions();
  for (const action of actions) {
    console.log(action.name);
  }

  // Retrieve tools
  const tools = await getLangChainTools(agentKit);

  // Store buffered conversation history in memory
  const memory = new MemorySaver();

  // React Agent config
  const agentConfig = { configurable: { thread_id: "Twitter Agentkit Chatbot Example!" } };

  // Create React Agent using the LLM and Twitter (X) tools
  const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: modifier,
  });

  // Export and persist wallet data
  const exportedWallet = await walletProvider.exportWallet();
  await saveWalletData(exportedWallet);

  return { agent, config: agentConfig };
}

/**
 * Load wallet data from file if it exists
 *
 * @returns Wallet data or undefined if file doesn't exist
 */
async function loadWalletData(): Promise<string | undefined> {
  try {
    const data = await fs.readFile(WALLET_DATA_PATH, "utf8");
    return data;
  } catch {
    // File doesn't exist or other error, return undefined
    return undefined;
  }
}

/**
 * Save wallet data
 *
 * @param exportedWallet - Wallet data to save
 * @returns void
 */
async function saveWalletData<T>(exportedWallet: T): Promise<void> {
  const walletData = JSON.stringify(exportedWallet);

  try {
    await fs.writeFile(WALLET_DATA_PATH, walletData);
  } catch (error) {
    console.warn("Failed to persist wallet data:", error);
  }
}

/**
 * Run the agent autonomously with specified intervals
 *
 * @param agent - The agent executor
 * @param config - Agent configuration
 * @param interval - Time interval between actions in seconds
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runAutonomousMode(agent: any, config: any, interval = 10) {
  console.log("Starting autonomous mode...");

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const thought =
        "Be creative and do something interesting on the blockchain. " +
        "Choose an action or set of actions and execute it that highlights your abilities.";

      const stream = await agent.stream({ messages: [new HumanMessage(thought)] }, config);

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content);
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content);
        }
        console.log("-------------------");
      }

      await new Promise(resolve => setTimeout(resolve, interval * 1000));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
      process.exit(1);
    }
  }
}

/**
 * Run the agent interactively based on user input
 *
 * @param agent - The agent executor
 * @param config - Agent configuration
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runChatMode(agent: any, config: any) {
  console.log("Starting chat mode... Type 'exit' to end.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> =>
    new Promise(resolve => rl.question(prompt, resolve));

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const userInput = await question("\nPrompt: ");

      if (userInput.toLowerCase() === "exit") {
        break;
      }

      const stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, config);

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content);
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content);
        }
        console.log("-------------------");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

/**
 * Choose whether to run in autonomous or chat mode based on user input
 *
 * @returns Selected mode
 */
async function chooseMode(): Promise<"chat" | "auto"> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> =>
    new Promise(resolve => rl.question(prompt, resolve));

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log("\nAvailable modes:");
    console.log("1. chat    - Interactive chat mode");
    console.log("2. auto    - Autonomous action mode");

    const choice = (await question("\nChoose a mode (enter number or name): "))
      .toLowerCase()
      .trim();

    if (choice === "1" || choice === "chat") {
      rl.close();
      return "chat";
    } else if (choice === "2" || choice === "auto") {
      rl.close();
      return "auto";
    }
    console.log("Invalid choice. Please try again.");
  }
}

/**
 * Start the chatbot agent
 */
async function main() {
  try {
    const { agent, config } = await initialize();
    const mode = await chooseMode();

    if (mode === "chat") {
      await runChatMode(agent, config);
    } else {
      await runAutonomousMode(agent, config);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  console.log("Starting Agent...");
  main().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
