import { Coinbase, ContractInvocation, Wallet } from "@coinbase/coinbase-sdk";

import {
  getFactoryAddress,
  GENERIC_TOKEN_METADATA_URI,
  WOW_FACTORY_ABI,
} from "../actions/cdp/defi/wow/constants";
import { wowCreateToken, WowCreateTokenInput } from "../actions/cdp/defi/wow/actions/create_token";

jest.mock("../actions/cdp/defi/wow/constants", () => ({
  getFactoryAddress: jest.fn(),
}));

const MOCK_NAME = "Test Token";
const MOCK_SYMBOL = "TEST";
const MOCK_URI = "ipfs://QmY1GqprFYvojCcUEKgqHeDj9uhZD9jmYGrQTfA9vAE78J";

describe("Wow Create Token Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      tokenUri: MOCK_URI,
    };

    const result = WowCreateTokenInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should successfully parse input without tokenUri", () => {
    const validInput = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
    };

    const result = WowCreateTokenInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail with missing required fields", () => {
    const invalidInput = {
      symbol: MOCK_SYMBOL,
    };
    const result = WowCreateTokenInput.safeParse(invalidInput);

    expect(result.success).toBe(false);
  });

  it("should fail with invalid tokenUri", () => {
    const invalidInput = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      tokenUri: 12345,
    };
    const result = WowCreateTokenInput.safeParse(invalidInput);

    expect(result.success).toBe(false);
  });
});

describe("Wow Create Token Action", () => {
  const CONTRACT_ADDRESS = "0xabcdef123456789";
  const NETWORK_ID = Coinbase.networks.BaseSepolia;
  const TRANSACTION_HASH = "0xghijkl987654321";
  const WALLET_ID = "0x123456789abcdef";

  let mockContractInvocation: jest.Mocked<ContractInvocation>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      invokeContract: jest.fn(),
      getDefaultAddress: jest.fn().mockResolvedValue({
        getId: jest.fn().mockReturnValue(WALLET_ID),
      }),
      getNetworkId: jest.fn().mockReturnValue(NETWORK_ID),
    } as unknown as jest.Mocked<Wallet>;

    mockContractInvocation = {
      wait: jest.fn().mockResolvedValue({
        getTransaction: jest.fn().mockReturnValue({
          getTransactionHash: jest.fn().mockReturnValue(TRANSACTION_HASH),
        }),
      }),
    } as unknown as jest.Mocked<ContractInvocation>;

    mockWallet.invokeContract.mockResolvedValue(mockContractInvocation);
  });

  it("should successfully create a token", async () => {
    const args = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      tokenUri: MOCK_URI,
    };

    (getFactoryAddress as jest.Mock).mockReturnValue(CONTRACT_ADDRESS);

    const response = await wowCreateToken(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalledWith({
      contractAddress: CONTRACT_ADDRESS,
      method: "deploy",
      abi: WOW_FACTORY_ABI,
      args: {
        _tokenCreator: WALLET_ID,
        _platformReferrer: "0x0000000000000000000000000000000000000000",
        _tokenURI: args.tokenUri || GENERIC_TOKEN_METADATA_URI,
        _name: args.name,
        _symbol: args.symbol,
      },
    });
    expect(mockContractInvocation.wait).toHaveBeenCalled();
    expect(response).toContain(`Created WoW ERC20 memecoin ${MOCK_NAME}`);
    expect(response).toContain(`with symbol ${MOCK_SYMBOL}`);
    expect(response).toContain(`on network ${NETWORK_ID}`);
    expect(response).toContain(`Transaction hash for the token creation: ${TRANSACTION_HASH}`);
  });

  it("should handle errors when creating a token", async () => {
    const args = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      tokenUri: MOCK_URI,
    };

    const error = new Error("An error has occurred");
    mockWallet.invokeContract.mockRejectedValue(error);

    const response = await wowCreateToken(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalled();
    expect(response).toContain(`Error creating Zora Wow ERC20 memecoin: ${error}`);
  });
});
