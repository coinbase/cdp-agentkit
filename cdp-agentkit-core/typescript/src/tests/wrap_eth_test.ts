import { ContractInvocation, Wallet } from "@coinbase/coinbase-sdk";

import { WETH_ABI, WETH_ADDRESS, wrapEth, WrapEthInput } from "../actions/cdp/wrap_eth";

const MOCK_AMOUNT_TO_WRAP = "100000000000000000";

describe("Wrap Eth", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      amountToWrap: MOCK_AMOUNT_TO_WRAP,
    };

    const result = WrapEthInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail parsing empty input", () => {
    const emptyInput = {};
    const result = WrapEthInput.safeParse(emptyInput);

    expect(result.success).toBe(false);
  });
});

describe("Wrap Eth Action", () => {
  const TRANSACTION_HASH = "0xghijkl987654321";

  let mockContractInvocation: jest.Mocked<ContractInvocation>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      invokeContract: jest.fn(),
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

  it("should successfully wrap ETH", async () => {
    const args = {
      amountToWrap: MOCK_AMOUNT_TO_WRAP,
    };

    const response = await wrapEth(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalledWith({
      contractAddress: WETH_ADDRESS,
      method: "deposit",
      abi: WETH_ABI,
      args: {},
      amount: BigInt(args.amountToWrap),
      assetId: "wei",
    });
    expect(response).toContain(`Wrapped ETH with transaction hash: ${TRANSACTION_HASH}`);
  });

  it("should fail with an error", async () => {
    const args = {
      amountToWrap: MOCK_AMOUNT_TO_WRAP,
    };

    const error = new Error("Failed to execute transfer");
    mockWallet.invokeContract.mockRejectedValue(error);

    const response = await wrapEth(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalled();
    expect(response).toContain(`Error wrapping ETH: ${error}`);
  });
});
