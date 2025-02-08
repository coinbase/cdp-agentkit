// API Endpoints
export const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex";
export const DEXSCREENER_PROFILES_API = "https://api.dexscreener.com/token-profiles/latest/v1";
export const DEXSCREENER_TOKEN_PAIRS_API = "https://api.dexscreener.com/token-pairs/v1";
export const DEXSCREENER_ORDERS_API = "https://api.dexscreener.com/orders/v1";
export const DEXSCREENER_LATEST_PAIRS_API = "https://api.dexscreener.com/latest/dex/pairs";

// Fetch Token Profiles
export const fetchTokenProfiles = async (): Promise<any> => {
  try {
    const response = await fetch(DEXSCREENER_PROFILES_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set content type for API requests
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Token Profiles:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error fetching token profiles:", error);
    return null;
  }
};

// Fetch Token Pairs
export const fetchTokenPairs = async (chainId: string, tokenAddress: string): Promise<any> => {
  try {
    const response = await fetch(`${DEXSCREENER_TOKEN_PAIRS_API}/${chainId}/${tokenAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set content type for API requests
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Token Pairs:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error fetching token pairs:", error);
    return null;
  }
};

// Fetch Orders
export const fetchOrders = async (chainId: string, tokenAddress: string): Promise<any> => {
  try {
    const response = await fetch(`${DEXSCREENER_ORDERS_API}/${chainId}/${tokenAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set content type for API requests
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Orders:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

// Fetch Latest Pairs
export const fetchLatestPairs = async (chainId: string, pairId: string): Promise<any> => {
  try {
    const response = await fetch(`${DEXSCREENER_LATEST_PAIRS_API}/${chainId}/${pairId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set content type for API requests
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Latest Pairs:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error fetching latest pairs:", error);
    return null;
  }
};
