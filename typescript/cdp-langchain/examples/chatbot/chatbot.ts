import { config } from 'dotenv';
// Load environment variables before any other imports
config({ path: './.env' });  // Explicitly specify the path

import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { CdpAgentkitWrapper, CdpToolkit } from "@cdp/langchain/dist";
import { readFile, writeFile } from 'fs/promises';
import { pull } from "langchain/hub";
import type { PromptTemplate } from "@langchain/core/prompts";
import * as readline from 'readline';

// Validate required environment variables
const requiredEnvVars = [
  'OPENAI_API_KEY',
  'CDP_API_KEY_NAME',
  'CDP_API_KEY_PRIVATE_KEY',
  'CDP_NETWORK_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Configure a file to persist the agent's CDP MPC Wallet Data
const WALLET_DATA_FILE = "wallet_data.txt";

async function initializeAgent() {
  // Initialize LLM
  const llm = new ChatOpenAI({ modelName: "gpt-4o-mini" });

  let walletData: string | undefined;

  try {
    walletData = await readFile(WALLET_DATA_FILE, 'utf8');
  } catch (e) {
    // File doesn't exist yet
  }

  // Configure CDP Agentkit Wrapper
  const values = {
    cdpApiKeyName: process.env.CDP_API_KEY_NAME,
    cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
    networkId: process.env.CDP_NETWORK_ID,
    ...(walletData ? { cdpWalletData: walletData } : {})
  };
  
  const agentkit = await CdpAgentkitWrapper.create(values);

  // Persist the agent's CDP MPC Wallet Data
  const newWalletData = agentkit.exportWallet();
  await writeFile(WALLET_DATA_FILE, newWalletData);

  // Initialize CDP Agentkit Toolkit and get tools
  const cdpToolkit = CdpToolkit.fromCdpAgentkitWrapper(agentkit);
  const tools = cdpToolkit.getTools();

  // Get the prompt to use
  const prompt = await pull<PromptTemplate>("hwchase17/react");

  // Create ReAct Agent using the LLM and CDP Agentkit tools
  const agent = await createReactAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: false,
  });

  return { agent: agentExecutor };
}

// Chat Mode
async function runChatMode(agent: AgentExecutor) {
  console.log("Starting chat mode... Type 'exit' to end.");
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query: string) => new Promise<string>((resolve) => {
    rl.question(query, resolve);
  });

  while (true) {
    try {
      const userInput = await question("\nUser: ");
      if (!userInput || userInput.toLowerCase() === "exit") {
        rl.close();
        break;
      }

      const result = await agent.invoke({
        input: userInput,
      });

      console.log("\nAgent:", result.output);
      console.log("-".repeat(20));
    } catch (e) {
      console.error("Error:", e);
      rl.close();
      break;
    }
  }
}

async function main() {
  console.log("Starting Agent...");
  const { agent } = await initializeAgent();
  await runChatMode(agent);
}

main().catch(console.error); 
