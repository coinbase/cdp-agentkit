import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

export interface TradeInput extends BaseActionInput {
  readonly amount: string;
  readonly fromAssetId: string;
  readonly toAssetId: string;
}

const TRADE_PROMPT = `
This tool will trade one asset for another onchain via a swap. 
It takes the amount to trade, the asset ID to trade from, and the asset ID to trade to as inputs.
`;

export const tradeAction: CdpAction<TradeInput> = {
  name: 'trade',
  description: TRADE_PROMPT,
  
  async execute(wallet: Wallet, input: TradeInput): Promise<string> {
    const { amount, fromAssetId, toAssetId } = input;
    
    const trade = await (await wallet.trade({
      amount,
      fromAssetId,
      toAssetId,
    })).wait();

    return `Traded ${amount} of ${fromAssetId} for ${trade.toAmount} of ${toAssetId}.\nTransaction hash for the trade: ${trade.transaction.transactionHash}\nTransaction link for the trade: ${trade.transaction.transactionLink}`;
  }
}; 