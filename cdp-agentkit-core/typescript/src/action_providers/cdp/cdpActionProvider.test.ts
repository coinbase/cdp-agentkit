import { CdpWalletProvider } from "../../wallet_providers";
import { CdpActionProvider } from "./cdpActionProvider";
import { AddressReputationSchema, RequestFaucetFundsSchema } from "./schemas";
import { SmartContract } from "@coinbase/coinbase-sdk";

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
  let mockWallet: jest.Mocked<CdpWalletProvider>;

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

    mockWallet = {
      deployToken: jest.fn(),
      deployContract: jest.fn(),
      getAddress: jest.fn().mockReturnValue("0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83"),
      getNetwork: jest.fn().mockReturnValue({ networkId: "base-sepolia" }),
    } as unknown as jest.Mocked<CdpWalletProvider>;
  });

  describe("addressReputation", () => {
    it("should successfully check address reputation", async () => {
      const args = {
        address: "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83",
        network: "base-mainnet",
      };

      mockExternalAddressInstance.reputation.mockResolvedValue("Good reputation");

      const result = await actionProvider.addressReputation(args);

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

      const result = await actionProvider.addressReputation(args);

      expect(ExternalAddress).toHaveBeenCalledWith(args.network, args.address);
      expect(ExternalAddress).toHaveBeenCalledTimes(1);
      expect(mockExternalAddressInstance.reputation).toHaveBeenCalled();
      expect(mockExternalAddressInstance.reputation).toHaveBeenCalledTimes(1);
      expect(result).toBe(`Error checking address reputation: ${error}`);
    });
  });

  describe("deployToken", () => {
    beforeEach(() => {
      mockWallet = {
        deployToken: jest.fn().mockResolvedValue({
          wait: jest.fn().mockResolvedValue({
            getContractAddress: jest.fn().mockReturnValue("0x123"),
            getTransaction: jest.fn().mockReturnValue({
              getTransactionLink: jest.fn().mockReturnValue("tx-link"),
            }),
          }),
        }),
      } as unknown as jest.Mocked<CdpWalletProvider>;
    });

    it("should successfully deploy a token", async () => {
      const args = {
        name: "Test Token",
        symbol: "TEST",
        totalSupply: 1000000000000000000n,
      };

      const result = await actionProvider.deployToken(mockWallet, args);

      expect(mockWallet.deployToken).toHaveBeenCalledWith(args);
      expect(mockWallet.deployToken).toHaveBeenCalledTimes(1);
      expect(result).toContain(
        "Deployed ERC20 token contract Test Token (TEST) with total supply of 1000000000000000000 tokens at address 0x123. Transaction link: tx-link",
      );
    });

    it("should handle errors when deploying a token", async () => {
      const args = {
        name: "Test Token",
        symbol: "TEST",
        totalSupply: 1000000000000000000n,
      };

      const error = new Error("Token deployment failed");
      mockWallet.deployToken.mockRejectedValue(error);

      const result = await actionProvider.deployToken(mockWallet, args);

      expect(result).toBe(`Error deploying token: ${error}`);
    });
  });

  describe("faucet", () => {
    beforeEach(() => {
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

  describe("deployContract", () => {
    const CONTRACT_ADDRESS = "0x123456789abcdef";
    const TRANSACTION_LINK = "https://etherscan.io/tx/0xghijkl987654321";
    const MOCK_CONTRACT_NAME = "Test Contract";
    const MOCK_SOLIDITY_VERSION = "0.8.0";
    const MOCK_SOLIDITY_INPUT_JSON = "{}";
    const MOCK_CONSTRUCTOR_ARGS = { arg1: "value1", arg2: "value2" };

    beforeEach(() => {
      mockWallet.deployContract.mockResolvedValue({
        wait: jest.fn().mockResolvedValue({
          getContractAddress: jest.fn().mockReturnValue(CONTRACT_ADDRESS),
          getTransaction: jest.fn().mockReturnValue({
            getTransactionLink: jest.fn().mockReturnValue(TRANSACTION_LINK),
          }),
        }),
      } as unknown as SmartContract);
    });

    it("should successfully deploy a contract", async () => {
      const args = {
        solidityVersion: MOCK_SOLIDITY_VERSION,
        solidityInputJson: MOCK_SOLIDITY_INPUT_JSON,
        contractName: MOCK_CONTRACT_NAME,
        constructorArgs: MOCK_CONSTRUCTOR_ARGS,
      };

      const response = await actionProvider.deployContract(mockWallet, args);

      expect(mockWallet.deployContract).toHaveBeenCalledWith({
        solidityVersion: "0.8.0+commit.c7dfd78e",
        solidityInputJson: MOCK_SOLIDITY_INPUT_JSON,
        contractName: MOCK_CONTRACT_NAME,
        constructorArgs: MOCK_CONSTRUCTOR_ARGS,
      });
      expect(response).toContain(
        `Deployed contract ${MOCK_CONTRACT_NAME} at address ${CONTRACT_ADDRESS}`,
      );
      expect(response).toContain(`Transaction link: ${TRANSACTION_LINK}`);
    });

    it("should handle deployment errors", async () => {
      const args = {
        solidityVersion: MOCK_SOLIDITY_VERSION,
        solidityInputJson: MOCK_SOLIDITY_INPUT_JSON,
        contractName: MOCK_CONTRACT_NAME,
        constructorArgs: MOCK_CONSTRUCTOR_ARGS,
      };

      const error = new Error("An error has occurred");
      mockWallet.deployContract.mockRejectedValue(error);

      const response = await actionProvider.deployContract(mockWallet, args);

      expect(mockWallet.deployContract).toHaveBeenCalledWith({
        solidityVersion: "0.8.0+commit.c7dfd78e",
        solidityInputJson: MOCK_SOLIDITY_INPUT_JSON,
        contractName: MOCK_CONTRACT_NAME,
        constructorArgs: MOCK_CONSTRUCTOR_ARGS,
      });
      expect(response).toBe(`Error deploying contract: ${error}`);
    });
  });
});
