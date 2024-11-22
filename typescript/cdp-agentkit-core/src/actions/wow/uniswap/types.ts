export interface PriceInfo {
  readonly weiAmount: string;
  readonly ethPrice: string;
}

export interface Balance {
  erc20: string; // Wei amount
  weth: string; // Wei amount
}

export interface Price {
  perToken: PriceInfo;
  total: PriceInfo;
}

export interface Quote {
  readonly amountOut: string;
  readonly priceImpact: string;
  readonly route: readonly string[];
}

export interface PoolInfo {
  readonly liquidity: string;
  readonly sqrtPriceX96: string;
  readonly tick: number;
  readonly token0: string;
  readonly token1: string;
  readonly fee: number;
} 