import * as dotenv from "dotenv";
import * as fs from "fs";

import { ChatOpenAI } from "@langchain/openai";

import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";

// load the env
dotenv.config();

// agent modifier
const AGENT_MODIFIER = `
  You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit.
  You are empowered to interact onchain using your tools.

  If you ever need funds, you can request them from the faucet if you are on network ID 'base-sepolia'.
  If not, you can provide your wallet details and request funds from the user.

  Before executing your first action, get the wallet details to see what network you're on.
  If there is a 5XX (internal) HTTP error code, ask the user to try again later.

  If someone asks you to do something you can't do with your currently available tools, you must say so.
  Encourage them to implement it themselves using the CDP SDK + Agentkit.
  Recommend they go to docs.cdp.coinbase.com for more information.

  Be concise and helpful with your responses.
  Refrain from restating your tools' descriptions unless it is explicitly requested.
`;

// persisted cdp mpc wallet data
const WALLET_DATA_FILE = "wallet_data.txt";

/**
 * Initialize the CDP Agentkit
 *
 * @returns Agent executor and config
 */
async function initializeAgent() {
  // llm
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
  });

  // load wallet file if exists
  let walletData: string | undefined;
  if (fs.existsSync(WALLET_DATA_FILE)) {
    walletData = fs.readFileSync(WALLET_DATA_FILE, "utf-8");
  }

  // agentkit
  const agentkitConfig = {
    cdpWalletData: walletData,
  };

  const agentkit = await CdpAgentkit.configureWithWallet(agentkitConfig);

  // toolkit
  const cdpToolkit = new CdpToolkit(agentkit);
  const tools = cdpToolkit.getTools();

  // store conversation history in memory
  const memory = new MemorySaver();

  // agent
  const agentConfig = {
    configurable: {
      thread_id: "CDP AgentKit Wallet Import Example!",
    },
  };

  const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: AGENT_MODIFIER,
  });

  // persist wallet
  walletData = await agentkit.exportWallet();
  fs.writeFileSync(WALLET_DATA_FILE, walletData);

  // return
  return { agent, config: agentConfig };
}

/**
 * Start the agent
 */
async function main() {
  console.log("initializing agent...");
  const { agent, config } = await initializeAgent();

  const messages = [
    new HumanMessage("what are my wallet details?"),
    new HumanMessage("can you please fund my wallet with 0.01 ETH?"),
    new HumanMessage("can you please show my updated wallet balance from the fund action?"),
  ];

  const stream = await agent.stream({ messages }, config);

  for await (const chunk of stream) {
    if ("agent" in chunk) {
      console.log(chunk.agent.messages[0].content);
    } else if ("tools" in chunk) {
      console.log(chunk.tools.messages[0].content);
    }
    console.log("-------------------");
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
