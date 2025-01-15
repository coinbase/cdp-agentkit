import { Coinbase, ContractInvocation, Wallet } from "@coinbase/coinbase-sdk";

import { WOW_ABI } from "../actions/cdp/defi/wow/constants";
import { wowBuyToken, WowBuyTokenInput } from "../actions/cdp/defi/wow/actions/buy_token";
import { getBuyQuote } from "../actions/cdp/defi/wow/utils";
import { getHasGraduated } from "../actions/cdp/defi/wow/uniswap/utils";

jest.mock("../actions/cdp/defi/wow/utils", () => ({
  getBuyQuote: jest.fn(),
}));

jest.mock("../actions/cdp/defi/wow/uniswap/utils", () => ({
  getHasGraduated: jest.fn(),
}));

const MOCK_CONTRACT_ADDRESS = "0xabcdef123456789";
const MOCK_AMOUNT_ETH_IN_WEI = "100000000000000000";

describe("Wow Buy Token Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountEthInWei: MOCK_AMOUNT_ETH_IN_WEI,
    };

    const result = WowBuyTokenInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail parsing empty input", () => {
    const emptyInput = {};
    const result = WowBuyTokenInput.safeParse(emptyInput);

    expect(result.success).toBe(false);
  });
});

describe("Wow Buy Token Action", () => {
  const NETWORK_ID = Coinbase.networks.BaseSepolia;
  const TRANSACTION_HASH = "0xghijkl987654321";

  let mockContractInvocation: jest.Mocked<ContractInvocation>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      invokeContract: jest.fn(),
      getDefaultAddress: jest.fn().mockResolvedValue({
        getId: jest.fn().mockReturnValue(TRANSACTION_HASH),
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

  it("should successfully buy a token", async () => {
    const args = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountEthInWei: MOCK_AMOUNT_ETH_IN_WEI,
    };

    (getHasGraduated as jest.Mock).mockResolvedValue(true);
    (getBuyQuote as jest.Mock).mockResolvedValue(1.0);

    const response = await wowBuyToken(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalledWith({
      contractAddress: MOCK_CONTRACT_ADDRESS,
      method: "buy",
      abi: WOW_ABI,
      args: {
        recipient: expect.any(String),
        refundRecipient: expect.any(String),
        orderReferrer: "0x0000000000000000000000000000000000000000",
        expectedMarketType: "1",
        minOrderSize: expect.any(String),
        sqrtPriceLimitX96: "0",
        comment: "",
      },
      amount: BigInt(args.amountEthInWei),
      assetId: "wei",
    });
    expect(getBuyQuote).toHaveBeenCalled();
    expect(getHasGraduated).toHaveBeenCalled();
    expect(response).toContain(
      `Purchased WoW ERC20 memecoin with transaction hash: ${TRANSACTION_HASH}`,
    );
  });

  it("should handle errors when buying a token", async () => {
    const args = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      amountEthInWei: MOCK_AMOUNT_ETH_IN_WEI,
    };

    const error = new Error("An error has occurred");
    mockWallet.invokeContract.mockRejectedValue(error);
    (getHasGraduated as jest.Mock).mockResolvedValue(true);

    const response = await wowBuyToken(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalled();
    expect(response).toContain(`Error buying Zora Wow ERC20 memecoin: ${error}`);
  });
});
