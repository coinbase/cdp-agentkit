import { WalletProvider } from "../../wallet-providers";
import { walletActionProvider } from "./walletActionProvider";

describe("Wallet Action Provider", () => {
  const MOCK_ADDRESS = "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83";
  const MOCK_BALANCE = 1000000000000000000n; // 1 ETH in wei
  const MOCK_NETWORK = {
    protocolFamily: "evm",
    networkId: "base-sepolia",
    chainId: "123",
  };
  const MOCK_PROVIDER_NAME = "TestWallet";

  let mockWallet: jest.Mocked<WalletProvider>;
  const actionProvider = walletActionProvider();

  beforeEach(() => {
    mockWallet = {
      getAddress: jest.fn().mockReturnValue(MOCK_ADDRESS),
      getNetwork: jest.fn().mockReturnValue(MOCK_NETWORK),
      getBalance: jest.fn().mockResolvedValue(MOCK_BALANCE),
      getName: jest.fn().mockReturnValue(MOCK_PROVIDER_NAME),
    } as unknown as jest.Mocked<WalletProvider>;
  });

  describe("getWalletDetails", () => {
    it("should successfully get wallet details", async () => {
      const response = await actionProvider.getWalletDetails(mockWallet, {});

      expect(mockWallet.getAddress).toHaveBeenCalled();
      expect(mockWallet.getNetwork).toHaveBeenCalled();
      expect(mockWallet.getBalance).toHaveBeenCalled();
      expect(mockWallet.getName).toHaveBeenCalled();

      const expectedResponse = `Wallet Details:
- Provider: ${MOCK_PROVIDER_NAME}
- Address: ${MOCK_ADDRESS}
- Network: 
  * Protocol Family: ${MOCK_NETWORK.protocolFamily}
  * Network ID: ${MOCK_NETWORK.networkId}
  * Chain ID: ${MOCK_NETWORK.chainId}
- ETH Balance: 1.000000 ETH
- Native Balance: ${MOCK_BALANCE.toString()} WEI`;

      expect(response).toBe(expectedResponse);
    });

    it("should handle missing network IDs gracefully", async () => {
      mockWallet.getNetwork.mockReturnValue({
        protocolFamily: "evm",
      });

      const response = await actionProvider.getWalletDetails(mockWallet, {});

      expect(response).toContain("Network ID: N/A");
      expect(response).toContain("Chain ID: N/A");
    });

    it("should handle errors when getting wallet details", async () => {
      const error = new Error("Failed to get wallet details");
      mockWallet.getBalance.mockRejectedValue(error);

      const response = await actionProvider.getWalletDetails(mockWallet, {});
      expect(response).toBe(`Error getting wallet details: ${error}`);
    });
  });

  describe("supportsNetwork", () => {
    it("should return true for any network", () => {
      const evmNetwork = { protocolFamily: "evm", networkId: "base-sepolia" };
      const solanaNetwork = { protocolFamily: "solana", networkId: "mainnet" };
      const bitcoinNetwork = { protocolFamily: "bitcoin", networkId: "mainnet" };

      expect(actionProvider.supportsNetwork(evmNetwork)).toBe(true);
      expect(actionProvider.supportsNetwork(solanaNetwork)).toBe(true);
      expect(actionProvider.supportsNetwork(bitcoinNetwork)).toBe(true);
    });
  });

  describe("action provider setup", () => {
    it("should have the correct name", () => {
      expect(actionProvider.name).toBe("wallet");
    });

    it("should have empty actionProviders array", () => {
      expect(actionProvider.actionProviders).toEqual([]);
    });
  });
});
