import { ActionProvider } from "../../agentkit/src/action-providers/actionProvider";
import { CdpWalletProvider } from "../../agentkit/src/wallet-providers";
import { Action } from "../../agentkit/src/types";
import { erc20ActionProvider } from "../../agentkit/src/action-providers";
import * as readline from "readline";
import * as dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify readline question
const question = (prompt: string): Promise<string> =>
  new Promise(resolve => rl.question(prompt, resolve));

// WETH contract address on Base Sepolia
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";

class SimpleClaudeProvider extends ActionProvider<CdpWalletProvider> {
  private apiKeyName: string;
  private apiKeyPrivateKey: string;

  constructor(apiKeyName: string, apiKeyPrivateKey: string) {
    super("claude", []);
    this.apiKeyName = apiKeyName;
    this.apiKeyPrivateKey = apiKeyPrivateKey;
  }

  getActions(): Action[] {
    return [
      {
        name: "ClaudeActionProvider_register_tool",
        description: "Register a new tool with Claude",
        schema: z.object({
          name: z.string(),
          description: z.string(),
          parameters: z.object({
            type: z.string(),
            properties: z.record(z.object({
              type: z.string(),
              description: z.string().optional()
            })),
            required: z.array(z.string())
          }),
          function: z.string()
        }),
        invoke: async (params) => {
          // Implementation would go here
          console.log("Registering tool:", params.name);
          return { success: true };
        }
      },
      {
        name: "ClaudeActionProvider_chat",
        description: "Chat with Claude",
        schema: z.object({
          message: z.string(),
          tools: z.array(z.string()),
          temperature: z.number(),
          systemPrompt: z.string()
        }),
        invoke: async (params) => {
          // Implementation would go here
          console.log("Chat message:", params.message);
          return { response: "Simulated response from Claude" };
        }
      }
    ];
  }

  supportsNetwork = () => true;
}

async function main() {
  // Check required environment variables
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }
  if (!process.env.CDP_API_KEY_NAME || !process.env.CDP_API_KEY_PRIVATE_KEY) {
    throw new Error("CDP_API_KEY_NAME and CDP_API_KEY_PRIVATE_KEY environment variables are required");
  }

  // Format private key
  const formattedPrivateKey = process.env.CDP_API_KEY_PRIVATE_KEY.replace(/\\n/g, "\n");

  // Create wallet provider
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: formattedPrivateKey,
    networkId: "base-sepolia"
  });

  // Initialize ERC20 action provider
  const erc20Provider = erc20ActionProvider();
  const erc20Actions = erc20Provider.getActions(walletProvider);
  
  // Create simple Claude provider
  const claudeProvider = new SimpleClaudeProvider(
    process.env.CDP_API_KEY_NAME,
    formattedPrivateKey
  );

  // Get Claude actions
  const claudeActions = claudeProvider.getActions();
  
  // Combine all actions
  const actions = [...erc20Actions, ...claudeActions];
  console.log("Available actions:", actions.map(a => a.name));

  // Find the required actions
  const registerToolAction = actions.find(action => action.name === "ClaudeActionProvider_register_tool");
  const chatAction = actions.find(action => action.name === "ClaudeActionProvider_chat");
  const getBalanceAction = actions.find(action => action.name === "ERC20ActionProvider_get_balance");
  
  if (!registerToolAction || !chatAction || !getBalanceAction) {
    throw new Error("Required actions not found");
  }

  // Register WETH balance checking tool
  console.log("\nRegistering WETH balance tool...");
  await registerToolAction.invoke({
    name: 'check_weth_balance',
    description: 'Check WETH balance for a given address',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'The wallet address to check'
        }
      },
      required: ['address']
    },
    function: `
async def check_weth_balance(address):
    result = await getBalanceAction.invoke({
        "contractAddress": "${WETH_ADDRESS}",
        "address": address
    })
    return result
`
  });

  try {
    while (true) {
      // Get address from user input
      const address = await question("\nEnter wallet address to check WETH balance (or 'exit' to quit): ");
      
      if (address.toLowerCase() === 'exit') {
        break;
      }

      // Validate address format
      if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        console.log("Invalid wallet address format. Please enter a valid address.");
        continue;
      }

      console.log(`\nChecking WETH balance for ${address}...`);
      
      // First get the balance directly
      const balanceResult = await getBalanceAction.invoke({
        contractAddress: WETH_ADDRESS,
        address
      });
      console.log("Direct balance result:", balanceResult);
      
      // Then use it through Claude
      const response = await chatAction.invoke({
        message: `I need to check the WETH balance for address ${address}. Please use the check_weth_balance tool with this address.`,
        tools: ['check_weth_balance'],
        temperature: 0,
        systemPrompt: `You are a helpful assistant that checks WETH balances. When asked to check a balance, you should immediately use the check_weth_balance tool with the provided address. Do not explain what you're going to do, just do it.`
      });

      console.log("Claude response:", response);
    }
  } finally {
    rl.close();
  }
}

// Run the example
main().catch(error => {
  console.error(error);
  rl.close();
  process.exit(1);
});