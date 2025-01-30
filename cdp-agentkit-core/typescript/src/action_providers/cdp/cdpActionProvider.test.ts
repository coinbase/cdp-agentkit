import { CdpActionProvider } from "./cdpActionProvider";
import { AddressReputationSchema, RequestFaucetFundsSchema } from "./schemas";
import { EvmWalletProvider } from "../../wallet_providers";

// Mock the entire module
jest.mock("@coinbase/coinbase-sdk");

// Get the mocked constructor
const { ExternalAddress } = jest.requireMock("@coinbase/coinbase-sdk");

describe("CDP Action Provider Input Schemas", () => {
  describe("Address Reputation Schema", () => {
    it("should successfully parse valid input", () => {
      const validInput = {
        address: "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83",
        network: "base-mainnet",
      };

      const result = AddressReputationSchema.safeParse(validInput);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validInput);
    });

    it("should fail parsing invalid address", () => {
      const invalidInput = {
        address: "invalid-address",
        network: "base-mainnet",
      };
      const result = AddressReputationSchema.safeParse(invalidInput);

      expect(result.success).toBe(false);
    });
  });

  describe("Request Faucet Funds Schema", () => {
    it("should successfully parse with optional assetId", () => {
      const validInput = {
        assetId: "eth",
      };

      const result = RequestFaucetFundsSchema.safeParse(validInput);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validInput);
    });

    it("should successfully parse without assetId", () => {
      const validInput = {};
      const result = RequestFaucetFundsSchema.safeParse(validInput);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validInput);
    });
  });
});

describe("CDP Action Provider", () => {
  let actionProvider: CdpActionProvider;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockExternalAddressInstance: jest.Mocked<any>;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    actionProvider = new CdpActionProvider();
    mockExternalAddressInstance = {
      reputation: jest.fn(),
      faucet: jest.fn(),
    };

    // Mock the constructor to return our mock instance
    (ExternalAddress as jest.Mock).mockImplementation(() => mockExternalAddressInstance);
  });

  describe("addressReputation", () => {
    it("should successfully check address reputation", async () => {
      const args = {
        address: "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83",
        network: "base-mainnet",
      };

      mockExternalAddressInstance.reputation.mockResolvedValue("Good reputation");

      const result = await actionProvider.adderessReputation(args);

      expect(ExternalAddress).toHaveBeenCalledWith(args.network, args.address);
      expect(ExternalAddress).toHaveBeenCalledTimes(1);
      expect(mockExternalAddressInstance.reputation).toHaveBeenCalled();
      expect(mockExternalAddressInstance.reputation).toHaveBeenCalledTimes(1);
      expect(result).toBe("Good reputation");
    });

    it("should handle errors when checking reputation", async () => {
      const args = {
        address: "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83",
        network: "base-mainnet",
      };

      const error = new Error("Reputation check failed");
      mockExternalAddressInstance.reputation.mockRejectedValue(error);

      const result = await actionProvider.adderessReputation(args);

      expect(ExternalAddress).toHaveBeenCalledWith(args.network, args.address);
      expect(ExternalAddress).toHaveBeenCalledTimes(1);
      expect(mockExternalAddressInstance.reputation).toHaveBeenCalled();
      expect(mockExternalAddressInstance.reputation).toHaveBeenCalledTimes(1);
      expect(result).toBe(`Error checking address reputation: ${error}`);
    });
  });

  describe("faucet", () => {
    let mockWallet: jest.Mocked<EvmWalletProvider>;

    beforeEach(() => {
      mockWallet = {
        getAddress: jest.fn().mockReturnValue("0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83"),
        getNetwork: jest.fn().mockReturnValue({ networkId: "base-sepolia" }),
      } as unknown as jest.Mocked<EvmWalletProvider>;

      mockExternalAddressInstance.faucet.mockResolvedValue({
        wait: jest.fn().mockResolvedValue({
          getTransactionLink: jest.fn().mockReturnValue("tx-link"),
        }),
      });
    });

    it("should successfully request faucet funds with assetId", async () => {
      const args = {
        assetId: "eth",
      };

      const result = await actionProvider.faucet(mockWallet, args);

      expect(ExternalAddress).toHaveBeenCalledWith("base-sepolia", mockWallet.getAddress());
      expect(ExternalAddress).toHaveBeenCalledTimes(1);
      expect(mockExternalAddressInstance.faucet).toHaveBeenCalledWith("eth");
      expect(mockExternalAddressInstance.faucet).toHaveBeenCalledTimes(1);
      expect(result).toContain("Received eth from the faucet");
      expect(result).toContain("tx-link");
    });

    it("should successfully request faucet funds without assetId", async () => {
      const args = {};

      const result = await actionProvider.faucet(mockWallet, args);

      expect(ExternalAddress).toHaveBeenCalledWith("base-sepolia", mockWallet.getAddress());
      expect(ExternalAddress).toHaveBeenCalledTimes(1);
      expect(mockExternalAddressInstance.faucet).toHaveBeenCalledWith(undefined);
      expect(mockExternalAddressInstance.faucet).toHaveBeenCalledTimes(1);
      expect(result).toContain("Received ETH from the faucet");
    });

    it("should handle faucet errors", async () => {
      const args = {};
      const error = new Error("Faucet request failed");
      mockExternalAddressInstance.faucet.mockRejectedValue(error);

      const result = await actionProvider.faucet(mockWallet, args);

      expect(result).toBe(`Error requesting faucet funds: ${error}`);
    });
  });
});
