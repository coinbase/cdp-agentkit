import type { PoolInfo, Quote } from './wow';

export interface Transaction {
  readonly transactionHash: string;
  readonly transactionLink: string;
}

export interface SmartContract {
  readonly contractAddress: string;
  readonly transaction: Transaction;
  wait(): Promise<SmartContract>;
}

export interface Transfer {
  readonly transactionHash: string;
  readonly transactionLink: string;
  wait(): Promise<Transfer>;
}

export interface Trade {
  readonly transaction: Transaction;
  readonly toAmount: string;
  wait(): Promise<Trade>;
}

export interface Wallet {
  readonly networkId: string;
  getBalance(assetId: string): Promise<string>;
  getDefaultAddress(): Promise<string>;
  deployNft(params: {
    name: string;
    symbol: string;
    baseUri: string;
  }): Promise<SmartContract>;
  deployToken(params: {
    name: string;
    symbol: string;
    totalSupply: string;
  }): Promise<SmartContract>;
  mintNft(params: {
    contractAddress: string;
    tokenId?: string;
    to?: string;
  }): Promise<SmartContract>;
  registerBasename(params: {
    name: string;
  }): Promise<SmartContract>;
  transfer(params: {
    amount: string;
    assetId: string;
    to: string;
    gasless?: boolean;
  }): Promise<Transfer>;
  trade(params: {
    amount: string;
    fromAssetId: string;
    toAssetId: string;
  }): Promise<Trade>;
  wowBuyToken(params: {
    tokenAddress: string;
    amountInEth: string;
  }): Promise<Trade>;
  wowSellToken(params: {
    tokenAddress: string;
    amountIn: string;
  }): Promise<Trade>;
  wowCreateToken(params: {
    name: string;
    symbol: string;
    totalSupply: string;
    tokenUri?: string;
  }): Promise<SmartContract>;
  getWowPoolInfo(tokenAddress: string): Promise<PoolInfo>;
  getWowQuote(params: {
    tokenAddress: string;
    amountIn: string;
    isBuy: boolean;
  }): Promise<Quote>;
}

export * from './wow'; 