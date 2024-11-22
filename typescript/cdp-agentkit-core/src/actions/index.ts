export * from './deploy-nft';
export * from './deploy-token';
export * from './get-balance';
export * from './get-wallet-details';
export * from './mint-nft';
export * from './register-basename';
export * from './trade';
export * from './transfer';
export * from './types';
export * from './wow/buy-token';
export * from './wow/sell-token';
export * from './wow/create-token';
export * from './request-faucet-funds';

import { deployNftAction } from './deploy-nft';
import { deployTokenAction } from './deploy-token';
import { getBalanceAction } from './get-balance';
import { getWalletDetailsAction } from './get-wallet-details';
import { mintNftAction } from './mint-nft';
import { registerBasenameAction } from './register-basename';
import { tradeAction } from './trade';
import { transferAction } from './transfer';
import { wowBuyTokenAction } from './wow/buy-token';
import { wowSellTokenAction } from './wow/sell-token';
import { wowCreateTokenAction } from './wow/create-token';
import { requestFaucetFundsAction } from './request-faucet-funds';

export const CDP_ACTIONS = [
  deployNftAction,
  deployTokenAction,
  getBalanceAction,
  getWalletDetailsAction,
  mintNftAction,
  registerBasenameAction,
  tradeAction,
  transferAction,
  wowBuyTokenAction,
  wowSellTokenAction,
  wowCreateTokenAction,
  requestFaucetFundsAction,
] as const; 