import { DEXSCREENER_BASE_URL } from "./constants";
import {
  DexScreenerBoostedTokensResponse,
  DexScreenerTokenProfileResponse,
  DexScreenerOrdersResponse,
} from "./interfaces";

// https://docs.dexscreener.com/api/reference#token-boosts-latest-v1
export const fetchLatestBoosts = async () => {
  const response = await fetch(`${DEXSCREENER_BASE_URL}/token-boosts/latest/v1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set content type for API requests
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = (await response.json()) as DexScreenerBoostedTokensResponse[];
  return data;
};

export const fetchLatestTokenProfiles = async () => {
  const response = await fetch(`${DEXSCREENER_BASE_URL}/token-profiles/latest/v1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = (await response.json()) as DexScreenerTokenProfileResponse[];
  return data;
};

// https://docs.dexscreener.com/api/reference#orders-v1-chainid-tokenaddress
export const fetchTokenOrders = async (
  chainId: string,
  tokenAddress: string,
): Promise<DexScreenerOrdersResponse[]> => {
  // Log the URL being requested for fetching token orders
  const url = `${DEXSCREENER_BASE_URL}/orders/v1/${chainId}/${tokenAddress}`;
  console.log("Fetching token orders from URL:", url); // Log the full URL for verification

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = (await response.json()) as DexScreenerOrdersResponse[];
  return data;
};
