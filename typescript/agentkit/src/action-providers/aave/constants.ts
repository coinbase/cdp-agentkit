import { type Address } from "viem";
import { AaveV3Base } from "@bgd-labs/aave-address-book";

// Supported networks for Aave
export const SUPPORTED_NETWORKS = ["base-mainnet"] as const;
export type SupportedNetwork = (typeof SUPPORTED_NETWORKS)[number];

export const AAVE_V3_ADDRESSES: Record<
  SupportedNetwork,
  {
    POOL: Address;
    WETH_GATEWAY: Address;
    ASSETS: Record<string, Address>;
  }
> = {
  "base-mainnet": {
    POOL: AaveV3Base.POOL as Address,
    WETH_GATEWAY: AaveV3Base.WETH_GATEWAY as Address,
    ASSETS: {
      WETH: AaveV3Base.ASSETS.WETH.UNDERLYING as Address,
      USDC: AaveV3Base.ASSETS.USDC.UNDERLYING as Address,
    },
  },
};

export const SUPPORTED_ASSETS = {
  ETH: {
    symbol: "ETH",
    decimals: 18,
  },
  WETH: {
    symbol: "WETH",
    decimals: 18,
  },
  USDC: {
    symbol: "USDC",
    decimals: 6,
  },
  // Add other supported assets
};
