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

  // Register ETH balance checking tool
  console.log("Registering ETH balance tool...");
  await registerToolAction.invoke({
    name: 'check_eth_balance',
    description: 'Check ETH balance for a given address',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'The Ethereum address to check'
        }
      },
      required: ['address']
    },
    function: `
async def check_eth_balance(address):
    from web3 import Web3
    w3 = Web3(Web3.HTTPProvider('https://base-sepolia.g.alchemy.com/v2/demo'))
    balance = w3.eth.get_balance(address)
    return w3.from_wei(balance, 'ether')
`
  });

  // Register token transfer tool
  console.log("Registering token transfer tool...");
  await registerToolAction.invoke({
    name: 'transfer_eth',
    description: 'Transfer ETH to a specified address',
    parameters: {
      type: 'object',
      properties: {
        to_address: {
          type: 'string',
          description: 'The recipient Ethereum address'
        },
        amount: {
          type: 'number',
          description: 'Amount of ETH to transfer'
        }
      },
      required: ['to_address', 'amount']
    },
    function: `
async def transfer_eth(to_address, amount):
    from web3 import Web3
    w3 = Web3(Web3.HTTPProvider('https://base-sepolia.g.alchemy.com/v2/demo'))
    
    # Get the wallet from environment
    private_key = os.getenv('ETH_PRIVATE_KEY')
    if not private_key:
        raise ValueError("ETH_PRIVATE_KEY environment variable is required")
    
    account = w3.eth.account.from_key(private_key)
    
    # Prepare transaction
    transaction = {
        'nonce': w3.eth.get_transaction_count(account.address),
        'to': to_address,
        'value': w3.to_wei(amount, 'ether'),
        'gas': 21000,
        'gasPrice': w3.eth.gas_price
    }
    
    # Sign and send transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
    # Wait for transaction receipt
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return {
        'transaction_hash': receipt['transactionHash'].hex(),
        'status': 'success' if receipt['status'] == 1 else 'failed'
    }
`
  });

  // Test balance checking
  console.log("\nTesting ETH balance check...");
  const balanceResponse = await chatAction.invoke({
    message: "What's the ETH balance of 0x742d35Cc6634C0532925a3b844Bc454e4438f44e?",
    tools: ['check_eth_balance']
  });
  console.log("Claude's response:", balanceResponse);

  // Test transfer (with confirmation)
  console.log("\nTesting ETH transfer...");
  const transferResponse = await chatAction.invoke({
    message: "Please transfer 0.01 ETH to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    tools: ['transfer_eth']
  });
  console.log("Claude's response:", transferResponse);
}

// Run the example
main().catch(console.error);