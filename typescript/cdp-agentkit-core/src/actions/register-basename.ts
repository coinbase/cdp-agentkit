import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

/**
 * Input arguments for register basename action
 * @property name - The basename to register (without .base.eth or .basetest.eth)
 */
export interface RegisterBasenameInput extends BaseActionInput {
  name: string;
}

const REGISTER_BASENAME_PROMPT = `
This tool will register a Basename (e.g., 'example.base.eth' on mainnet or 'example.basetest.eth' on testnet) 
for the wallet. It takes the name to register as input (without the .base.eth or .basetest.eth suffix). 
The name will be registered to the wallet's address.

The registration will be on .base.eth if on mainnet or .basetest.eth if on testnet. Make sure to check
the wallet's network before registering to know which suffix will be used.
`;

export const registerBasenameAction: CdpAction<RegisterBasenameInput> = {
  name: 'register_basename',
  description: REGISTER_BASENAME_PROMPT,
  
  async execute(wallet: Wallet, input: RegisterBasenameInput): Promise<string> {
    const { name } = input;
    
    if (!name) {
      return 'Missing required fields: name is required';
    }
    
    try {
      const registration = await (await wallet.registerBasename({
        name,
      })).wait();

      const suffix = wallet.networkId.includes('mainnet') ? '.base.eth' : '.basetest.eth';
      const fullName = `${name}${suffix}`;

      return `Registered Basename ${fullName} to wallet address.\n` +
        `Transaction hash for the registration: ${registration.transaction.transactionHash}\n` +
        `Transaction link for the registration: ${registration.transaction.transactionLink}`;
    } catch (e) {
      return `Failed to register basename: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 