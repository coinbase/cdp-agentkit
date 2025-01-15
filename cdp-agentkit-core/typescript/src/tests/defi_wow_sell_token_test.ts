import { Coinbase, ContractInvocation, Wallet } from "@coinbase/coinbase-sdk";

import { WOW_ABI } from "../actions/cdp/defi/wow/constants";
import { wowSellToken, WowSellTokenInput } from "../actions/cdp/defi/wow/actions/sell_token";
import { getSellQuote } from "../actions/cdp/defi/wow/utils";
import { getHasGraduated } from "../actions/cdp/defi/wow/uniswap/utils";

jest.mock("../actions/cdp/defi/wow/utils", () => ({
  getSellQuote: jest.fn(),
}));

jest.mock("../actions/cdp/defi/wow/uniswap/utils", () => ({
  getHasGraduated: jest.fn(),
}));

const MOCK_CONTRACT_ADDRESS = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";
const MOCK_AMOUNT_TOKENS_IN_WEI = "1000000000000000000";

describe("Wow Sell Token Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountTokensInWei: MOCK_AMOUNT_TOKENS_IN_WEI,
    };

    const result = WowSellTokenInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail with missing amountTokensInWei", () => {
    const invalidInput = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
    };
    const result = WowSellTokenInput.safeParse(invalidInput);

    expect(result.success).toBe(false);
  });

  it("does not fail with invalid contract address", () => {
    const invalidInput = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountTokensInWei: MOCK_AMOUNT_TOKENS_IN_WEI,
    };
    const result = WowSellTokenInput.safeParse(invalidInput);

    expect(result.success).toBe(true);
  });

  it("does not fail with non-numeric amountTokensInWei", () => {
    const invalidInput = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountTokensInWei: "not_a_number",
    };
    const result = WowSellTokenInput.safeParse(invalidInput);

    expect(result.success).toBe(true);
  });
});

describe("Wow Sell Token Action", () => {
  const ADDRESS_ID = "0xabcdef123456789";
  const NETWORK_ID = Coinbase.networks.BaseSepolia;
  const TRANSACTION_HASH = "0xghijkl987654321";

  let mockContractInvocation: jest.Mocked<ContractInvocation>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      invokeContract: jest.fn(),
      getNetworkId: jest.fn().mockReturnValue(NETWORK_ID),
      getDefaultAddress: jest.fn().mockResolvedValue({
        getId: jest.fn().mockReturnValue(ADDRESS_ID),
      }),
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

  it("should successfully sell tokens", async () => {
    const args = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountTokensInWei: MOCK_AMOUNT_TOKENS_IN_WEI,
    };

    (getHasGraduated as jest.Mock).mockResolvedValue(true);
    (getSellQuote as jest.Mock).mockResolvedValue(1.0);

    const response = await wowSellToken(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalledWith({
      contractAddress: MOCK_CONTRACT_ADDRESS,
      method: "sell",
      abi: WOW_ABI,
      args: {
        tokensToSell: MOCK_AMOUNT_TOKENS_IN_WEI,
        recipient: expect.any(String),
        orderReferrer: "0x0000000000000000000000000000000000000000",
        comment: "",
        expectedMarketType: "1",
        minPayoutSize: expect.any(String),
        sqrtPriceLimitX96: "0",
      },
    });
    expect(getSellQuote).toHaveBeenCalled();
    expect(getHasGraduated).toHaveBeenCalled();
    expect(response).toContain(
      `Sold WoW ERC20 memecoin with transaction hash: ${TRANSACTION_HASH}`,
    );
  });

  it("should handle errors when selling tokens", async () => {
    const args = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountTokensInWei: MOCK_AMOUNT_TOKENS_IN_WEI,
    };

    const error = new Error("An error has occurred");
    mockWallet.invokeContract.mockRejectedValue(error);
    (getHasGraduated as jest.Mock).mockResolvedValue(true);

    const response = await wowSellToken(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalled();
    expect(response).toContain(`Error selling Zora Wow ERC20 memecoin: ${error}`);
  });
});
