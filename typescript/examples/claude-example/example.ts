import { AgentKit, claudeActionProvider, CdpWalletProvider } from "@coinbase/agentkit";

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }

  // Create wallet provider with CDP credentials
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: "organizations/3dd6c6c1-bc18-4d51-bbee-fd9a0faeefa1/apiKeys/04836720-41e3-4e21-a3e0-4b81462f1d0e",
    apiKeyPrivateKey: "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEINMP7Zxc8zlevPn7oUP7Zg5LXEXoRx23X2bRulG7h82BoAoGCCqGSM49\nAwEHoUQDQgAEQJE9uRqAzVirRAGAmMn0ZHH1LoDo98SCYw8hSoc0p0rJQdBSOMNp\neF9jS3jdBU8b2ZfsvZ35bJgq+vfCv01FWg==\n-----END EC PRIVATE KEY-----\n",
    networkId: "base-sepolia"
  });

  // Initialize AgentKit with Claude action provider
  const agentKit = await AgentKit.from({
    walletProvider,
    actionProviders: [claudeActionProvider()]
  });

  // Get all available actions
  const actions = agentKit.getActions();
  
  console.log("Available actions:", actions.map(a => a.name));

  // Find the chat action
  const chatAction = actions.find(action => action.name === "ClaudeActionProvider_chat");
  if (!chatAction) {
    throw new Error("Chat action not found");
  }

  // Send a message to Claude
  const response = await chatAction.invoke({
    message: "Hello Claude! Please explain what you can do.",
    model: "claude-3-opus-20240229",
    temperature: 0.7
  });

  console.log("Claude's response:", response);
}

// Run the example
main().catch(console.error);