import { AgentKit, claudeActionProvider, CdpWalletProvider } from "@coinbase/agentkit";
import { Coinbase } from "@coinbase/coinbase-sdk";

async function main() {
  // Check required environment variables
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }
  if (!process.env.CDP_API_KEY_NAME || !process.env.CDP_API_KEY_PRIVATE_KEY) {
    throw new Error("CDP_API_KEY_NAME and CDP_API_KEY_PRIVATE_KEY environment variables are required");
  }

  // Configure Coinbase SDK using JSON file
  Coinbase.configureFromJson();

  // Initialize wallet provider with Base Sepolia testnet
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    networkId: Coinbase.networks.BaseSepolia // Use Base Sepolia testnet
  });

  // Initialize AgentKit with the wallet provider and Claude action provider
  const agentKit = await AgentKit.from({
    walletProvider,
    actionProviders: [claudeActionProvider()]
  });

  // Get all available actions
  const actions = agentKit.getActions();
  console.log("Available actions:", actions.map(a => a.name));

  // Find the required actions
  const registerToolAction = actions.find(action => action.name === "ClaudeActionProvider_register_tool");
  const chatAction = actions.find(action => action.name === "ClaudeActionProvider_chat");
  
  if (!registerToolAction || !chatAction) {
    throw new Error("Required actions not found");
  }

  // Register the calculator tool
  console.log("Registering calculator tool...");
  const registerResult = await registerToolAction.invoke({
    name: 'calculator',
    description: 'Perform basic arithmetic calculations',
    parameters: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          enum: ['add', 'subtract', 'multiply', 'divide'],
          description: 'The arithmetic operation to perform'
        },
        a: {
          type: 'number',
          description: 'First number'
        },
        b: {
          type: 'number',
          description: 'Second number'
        }
      },
      required: ['operation', 'a', 'b']
    },
    function: `
def calculator(operation, a, b):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    else:
        raise ValueError(f"Unknown operation: {operation}")
`
  });

  console.log("Register result:", registerResult);

  // Use the calculator tool through Claude's chat
  console.log("\nTesting multiplication...");
  const response = await chatAction.invoke({
    message: "Can you help me calculate 15 multiplied by 7?",
    tools: ['calculator']
  });

  console.log("Claude's response:", response);

  // Try division
  console.log("\nTesting division...");
  const response2 = await chatAction.invoke({
    message: "What is 42 divided by 6?",
    tools: ['calculator']
  });

  console.log("Claude's second response:", response2);
}

// Run the example
main().catch(console.error);