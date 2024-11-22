import { 
  Coinbase, 
  Wallet as CoinbaseWallet,
  APIError,
  InvalidNetworkIDError,
  UnauthorizedError,
  InvalidWalletError
} from '@coinbase/coinbase-sdk';
import axios, { AxiosError } from 'axios';

export class CdpAgentkitWrapper {
  private wallet?: any;

  static async create(config: {
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
    networkId?: string;
    cdpWalletData?: string;
  } = {}): Promise<CdpAgentkitWrapper> {
    const wrapper = new CdpAgentkitWrapper();
    await wrapper.initializeWallet(config);
    return wrapper;
  }

  private constructor() {}

  private async initializeWallet(config: {
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
    networkId?: string;
    cdpWalletData?: string;
  }): Promise<void> {
    try {
      const apiKeyName = config.cdpApiKeyName || process.env.CDP_API_KEY_NAME;
      let apiKeyPrivateKey = config.cdpApiKeyPrivateKey || process.env.CDP_API_KEY_PRIVATE_KEY || '';
      const networkId = config.networkId || process.env.CDP_NETWORK_ID || 'base-sepolia';

      if (!apiKeyName || !apiKeyPrivateKey) {
        throw new Error('CDP API credentials not found');
      }

      // Fix PEM formatting
      apiKeyPrivateKey = apiKeyPrivateKey
        .replace(/\\n/g, '\n')  // Replace escaped newlines with actual newlines
        .split('\n')  // Split into lines
        .map(line => line.trim())  // Trim each line
        .filter(line => line)  // Remove empty lines
        .join('\n');  // Join back with newlines

      console.log('Debug - API Key:', {
        name: apiKeyName,
        keyStart: apiKeyPrivateKey.substring(0, 50),
        keyEnd: apiKeyPrivateKey.substring(apiKeyPrivateKey.length - 50),
        totalLength: apiKeyPrivateKey.length,
        containsNewlines: apiKeyPrivateKey.includes('\n'),
        networkId
      });

      // Try to parse the private key as PEM
      try {
        const pemLines = apiKeyPrivateKey.split('\n');
        console.log('Debug - PEM structure:', {
          lineCount: pemLines.length,
          firstLine: pemLines[0],
          lastLine: pemLines[pemLines.length - 1],
          hasBeginMarker: apiKeyPrivateKey.includes('BEGIN'),
          hasEndMarker: apiKeyPrivateKey.includes('END'),
          lines: pemLines  // Show all lines for debugging
        });
      } catch (e) {
        console.error('Failed to parse PEM:', e);
      }

      try {
        // Configure SDK
        console.log('Configuring SDK...');
        Coinbase.configure({ 
          apiKeyName, 
          privateKey: apiKeyPrivateKey,
          useServerSigner: false
        });
        console.log('SDK configured successfully');

        // Create or restore wallet
        if (config.cdpWalletData) {
          console.log('Importing existing wallet');
          const walletData = JSON.parse(config.cdpWalletData);
          this.wallet = await CoinbaseWallet.import(walletData);
        } else {
          console.log('Creating new wallet with networkId:', networkId);
          try {
            this.wallet = await CoinbaseWallet.create({ networkId });
            console.log('Wallet created successfully:', {
              wallet: this.wallet,
              hasExport: typeof this.wallet.export === 'function'
            });
          } catch (error) {
            console.error('Failed to create wallet:', {
              error,
              type: error instanceof Error ? error.constructor.name : typeof error,
              message: error instanceof Error ? error.message : String(error),
              stack: error instanceof Error ? error.stack : undefined,
              isAxiosError: error instanceof AxiosError,
              response: error instanceof AxiosError ? error.response?.data : undefined
            });
            throw error;
          }
        }
      } catch (error) {
        console.error('SDK Error:', {
          error,
          type: error instanceof Error ? error.constructor.name : typeof error,
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    } catch (error) {
      console.error('Error initializing wallet:', error);
      throw error;
    }
  }

  exportWallet(): string {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }
    return JSON.stringify(this.wallet.export());
  }

  async runAction(
    action: (wallet: any, args: Record<string, unknown>) => Promise<string>,
    args: Record<string, unknown>
  ): Promise<string> {
    try {
      return await action(this.wallet, args);
    } catch (error) {
      console.error('Error running action:', error);
      throw error;
    }
  }
} 