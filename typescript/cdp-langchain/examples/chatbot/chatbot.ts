import { config } from "dotenv";
config({ path: "./.env" });

import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { CdpAgentkitWrapper, CdpToolkit } from "@cdp/langchain/dist";
import { DynamicTool } from "langchain/tools";
import { readFile, writeFile } from "fs/promises";
import * as readline from "readline";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

const WALLET_DATA_FILE = "wallet_data.txt";
const REQUIRED_ENV_VARS = ["OPENAI_API_KEY", "CDP_API_KEY_NAME", "CDP_API_KEY_PRIVATE_KEY", "CDP_NETWORK_ID"];

function ensureEnvVars(vars: string[]) {
  for (const envVar of vars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}

async function handleWalletData(agentkit: CdpAgentkitWrapper) {
  const walletData = agentkit.exportWallet();
  await writeFile(WALLET_DATA_FILE, walletData);
}

async function initializeAgent() {
  ensureEnvVars(REQUIRED_ENV_VARS);

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-16k",
    temperature: 0,
    maxConcurrency: 5,
  });

  const walletData = await (async () => {
    try {
      return await readFile(WALLET_DATA_FILE, "utf8");
    } catch {
      return null;
    }
  })();

  const agentkit = await CdpAgentkitWrapper.create({
    cdpApiKeyName: process.env.CDP_API_KEY_NAME!,
    cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
    networkId: process.env.CDP_NETWORK_ID!,
    ...(walletData && { cdpWalletData: walletData }),
  });

  await handleWalletData(agentkit);

  const cdpTools = CdpToolkit.fromCdpAgentkitWrapper(agentkit).getTools();

  const respondTool = new DynamicTool({
    name: "respond",
    description: "Use this to give a conversational response to the user",
    func: async (input: string) => input,
  });

  const allTools = [...cdpTools, respondTool];

  const SYSTEM_MESSAGE = `
    You are a helpful and friendly blockchain assistant that can interact with the Coinbase Developer Platform. Speak in a conversational manner, in lower case and use emojis. Like a genz new yorker.
    
    Available CDP Tools:
    - get_wallet_details: Shows your wallet address and network
    - get_balance: Check balance (use with assetId: "eth" or "usdc")
    - request_faucet_funds: Request testnet funds
    - deploy_token, deploy_nft, mint_nft: For token/NFT operations
    
    Guidelines:
    1. For blockchain operations, use CDP tools first, then explain results
    2. For conversational responses:
       - Acknowledge previous context
       - Stay relevant to the blockchain/wallet context
       - Be friendly but professional
    
    Example responses:
    - To "nice": "Thanks! Yes, your wallet is all set up on base-sepolia. Would you like to check your balance or get some testnet funds?"
    - To "thanks": "You're welcome! Let me know if you'd like to try out any blockchain operations."
    
    Keep responses natural and contextual while maintaining blockchain expertise.
  `;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_MESSAGE],
    ["human", "{input}"],
    ["system", "{agent_scratchpad}"],
  ]);

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools: allTools,
    prompt,
  });

  return { agent, tools: allTools };
}

async function runChatMode(agent: AgentExecutor) {
  console.log("Chat mode active. Type 'exit' to quit.");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  for await (const input of rl) {
    if (input.trim().toLowerCase() === "exit") {
      rl.close();
      break;
    }
    try {
      const { output } = await agent.invoke({ input });
      console.log("Agent:", output);
    } catch (error: unknown) {
      console.error("Error:", error instanceof Error ? error.message : String(error));
    }
  }
}

async function main() {
  try {
    const { agent, tools } = await initializeAgent();
    const executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
      maxIterations: 3,
      verbose: false,
      returnIntermediateSteps: false,
    });
    await runChatMode(executor);
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
  }
}

main();
