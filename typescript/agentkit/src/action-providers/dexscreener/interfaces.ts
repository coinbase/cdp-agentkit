export interface DexScreenerBoostedTokensResponse {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string;
  openGraph: string;
  description: string;
  links: Link[];
}

export interface Link {
  label?: string; // Some links use "label", while others use "type"
  type?: string;
  url: string;
}

// -----

export interface DexScreenerTokenProfileResponse {
  url: string;
  chainId: string;
  tokenAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

export interface DexScreenerOrdersResponse {
  type: "tokenProfile" | "communityTakeover" | "tokenAd" | "trendingBarAd";
  status: "processing" | "cancelled" | "on-hold" | "approved" | "rejected";
  paymentTimestamp: number;
}
