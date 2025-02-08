import { DEXSCREENER_BASE_URL } from "./constants";
import { DexScreenerBoostedTokensResponse } from "./interfaces";

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

// Fetch Token Pairs
// export const fetchTokenPairs = async (chainId: string, tokenAddress: string): Promise<any> => {
//   try {
//     const response = await fetch(`${DEXSCREENER_BASE_URL}/${chainId}/${tokenAddress}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json", // Set content type for API requests
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Fetched Token Pairs:", data); // Debugging log
//     return data;
//   } catch (error) {
//     console.error("Error fetching token pairs:", error);
//     return null;
//   }
// };

// Fetch Orders
// export const fetchOrders = async (chainId: string, tokenAddress: string): Promise<any> => {
//   try {
//     const response = await fetch(`${DEXSCREENER_BASE_URL}/${chainId}/${tokenAddress}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json", // Set content type for API requests
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Fetched Orders:", data); // Debugging log
//     return data;
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return null;
//   }
// };

// Fetch Latest Pairs
// export const fetchLatestPairs = async (chainId: string, pairId: string): Promise<any> => {
//   try {
//     const response = await fetch(`${DEXSCREENER_BASE_URL}/${chainId}/${pairId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json", // Set content type for API requests
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Fetched Latest Pairs:", data); // Debugging log
//     return data;
//   } catch (error) {
//     console.error("Error fetching latest pairs:", error);
//     return null;
//   }
// };
