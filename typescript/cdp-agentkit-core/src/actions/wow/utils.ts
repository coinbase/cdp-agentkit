import type { PriceInfo } from './uniswap/types';

/**
 * Create a PriceInfo object from wei amount and ETH price
 */
export function createPriceInfo(weiAmount: string, ethPrice: string): PriceInfo {
  return {
    weiAmount,
    ethPrice
  };
}

/**
 * Format a number to a fixed number of decimals
 * @param num - Number to format
 * @param decimals - Number of decimals to show
 * @returns Formatted string
 */
export function formatNumber(num: number, decimals: number = 6): string {
  return num.toFixed(decimals);
} 