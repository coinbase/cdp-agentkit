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

export interface DexScreenerTokenProfileResponse {
  url: string;
  chainId: string;
  tokenAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

export interface Link {
  label?: string; // Some links use "label", while others use "type"
  type?: string;
  url: string;
}
