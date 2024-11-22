export interface PriceInfo {
  eth: string; // Wei amount
  usd: string; // Decimal string
}

export interface Balance {
  erc20: string; // Wei amount
  weth: string; // Wei amount
}

export interface Quote {
  amountIn: string;
  amountOut: string;
  balance: Balance | null;
  fee: number | null;
  error: string | null;
}

export interface PoolInfo {
  token0: string;
  balance0: string;
  token1: string;
  balance1: string;
  fee: number;
  liquidity: string;
  sqrtPriceX96: string;
} 