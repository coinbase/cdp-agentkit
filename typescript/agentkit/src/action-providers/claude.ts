import "reflect-metadata";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ActionProvider } from "./actionProvider";
import { CdpWalletProvider } from "../wallet-providers";
import { Network } from "../network";
import { Action } from "../types";
import {
  wethActionProvider,
  pythActionProvider,
  walletActionProvider,
  erc20ActionProvider,
  cdpApiActionProvider,
  cdpWalletActionProvider,
} from "./index";

// Type definitions
export type GetClaudeToolsParams = {
  apiKeyName: string;
  apiKeyPrivateKey: string;
};

/**
 * Gets the Claude tools with proper typing and schema conversion
 */
export function getClaudeTools(config: GetClaudeToolsParams, walletProvider: CdpWalletProvider): Action[] {
  // Initialize all CDP action providers
  const providers = [
    wethActionProvider(),
    pythActionProvider(),
    walletActionProvider(),
    erc20ActionProvider(),
    cdpApiActionProvider(config),
    cdpWalletActionProvider(config)
  ];

  // Get actions from all providers
  const actions = providers.flatMap(provider => provider.getActions(walletProvider));
  
  // Add Claude-specific actions
  const claudeActions = new ClaudeActionProvider(config).getActions(walletProvider);

  // Return combined actions
  return [...actions, ...claudeActions];
}

/**
 * ClaudeActionProvider provides actions for interacting with Claude AI.
 */
export class ClaudeActionProvider extends ActionProvider<CdpWalletProvider> {
  private config: GetClaudeToolsParams;

  /**
   * Constructor for the ClaudeActionProvider.
   */
  constructor(config: GetClaudeToolsParams) {
    super("claude", []);
    this.config = config;
  }

  /**
   * Get all available actions from the provider
   */
  getActions(walletProvider: CdpWalletProvider): Action[] {
    return getClaudeTools(this.config, walletProvider).map(action => ({
      name: action.name,
      description: action.description,
      schema: action.schema,
      invoke: action.invoke
    }));
  }

  /**
   * Checks if the action provider supports the given network.
   * Since Claude actions are network-agnostic, this always returns true.
   */
  supportsNetwork = (_: Network): boolean => true;
}

/**
 * Factory function to create a new ClaudeActionProvider instance.
 */
export const claudeActionProvider = (config: GetClaudeToolsParams) => new ClaudeActionProvider(config);