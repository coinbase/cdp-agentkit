import { Wallet } from "@coinbase/coinbase-sdk";
import { crossChainSwap, CrossChainSwapInput } from "../actions/cdp/cross_chain_swap";
import { getQuote, executeRoute } from "@lifi/sdk";
import { z } from "zod";

// Mock the dependencies
jest.mock("@lifi/sdk", () => ({
  getQuote: jest.fn(),
  executeRoute: jest.fn(),
}));

describe("crossChainSwap", () => {
  let mockWallet: Wallet;
  let mockArgs: z.infer<typeof CrossChainSwapInput>;

  beforeEach(() => {
    mockWallet = {
      getDefaultAddress: jest.fn().mockResolvedValue({
        getId: jest.fn().mockReturnValue("0xMockAddress"),
        export: jest.fn().mockReturnValue("0xMockPrivateKey"),
      }),
    } as unknown as Wallet;

    mockArgs = {
      fromChain: 8453,
      toChain: 10,
      fromToken: "0xMockFromToken",
      toToken: "0xMockToToken",
      fromAmount: "1000000000000000000", // 1 token in smallest unit
      fromAddress: "0xMockAddress",
    };

    (getQuote as jest.Mock).mockResolvedValue({
      // Mocked quote response
    });

    (executeRoute as jest.Mock).mockResolvedValue({
      // Mocked executed route response
    });
  });

  it("should execute a cross-chain swap successfully", async () => {
    const result = await crossChainSwap(mockWallet, mockArgs);

    expect(getQuote).toHaveBeenCalledWith({
      fromChain: mockArgs.fromChain,
      toChain: mockArgs.toChain,
      fromToken: mockArgs.fromToken,
      toToken: mockArgs.toToken,
      fromAmount: mockArgs.fromAmount,
      fromAddress: "0xMockAddress",
    });

    expect(executeRoute).toHaveBeenCalled();
    expect(result).toContain("Cross-chain swap executed successfully");
  });

  it("should throw an error if the swap fails", async () => {
    (executeRoute as jest.Mock).mockRejectedValue(new Error("Swap failed"));

    await expect(crossChainSwap(mockWallet, mockArgs)).rejects.toThrow("Swap failed");
  });
});
