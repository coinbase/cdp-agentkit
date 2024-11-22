import type { Wallet } from '../types';

/**
 * Base type for all action inputs that ensures string indexing
 */
export type BaseActionInput = Record<string, string | number | boolean | undefined>;

/**
 * Base interface for all CDP actions
 */
export interface CdpAction<T extends BaseActionInput> {
  readonly name: string;
  readonly description: string;
  execute: (wallet: Wallet, input: T) => Promise<string>;
} 