import { Coinbase, Trade, Wallet } from "@coinbase/coinbase-sdk";

import { trade as createTrade, TradeInput } from "../actions/cdp/trade";

const MOCK_TRADE_AMOUNT = 0.123;
const MOCK_TRADE_ASSET_ID_FROM = Coinbase.assets.Eth;
const MOCK_TRADE_ASSET_ID_TO = Coinbase.assets.Usdc;

describe("Trade Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      amount: MOCK_TRADE_AMOUNT,
      fromAssetId: MOCK_TRADE_ASSET_ID_FROM,
      toAssetId: MOCK_TRADE_ASSET_ID_TO,
    };

    const result = TradeInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail parsing empty input", () => {
    const emptyInput = {};
    const result = TradeInput.safeParse(emptyInput);

    expect(result.success).toBe(false);
  });
});

describe("Trade Action", () => {
  const TO_AMOUNT = 3661.08;
  const TRANSACTION_HASH = "0xghijkl987654321";
  const TRANSACTION_LINK = `https://etherscan.io/tx/${TRANSACTION_HASH}`;

  let mockTrade: jest.Mocked<Trade>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(async () => {
    mockTrade = {
      wait: jest.fn().mockResolvedValue({
        getToAmount: jest.fn().mockReturnValue(TO_AMOUNT),
        getTransaction: jest.fn().mockReturnValue({
          getTransactionHash: jest.fn().mockReturnValue(TRANSACTION_HASH),
          getTransactionLink: jest.fn().mockReturnValue(TRANSACTION_LINK),
        }),
      }),
    } as unknown as jest.Mocked<Trade>;

    mockWallet = {
      createTrade: jest.fn(),
    } as unknown as jest.Mocked<Wallet>;

    mockWallet.createTrade.mockResolvedValue(mockTrade);
  });

  it("should successfully execute the trade", async () => {
    const args = {
      amount: MOCK_TRADE_AMOUNT,
      fromAssetId: MOCK_TRADE_ASSET_ID_FROM,
      toAssetId: MOCK_TRADE_ASSET_ID_TO,
    };

    const response = await createTrade(mockWallet, args);

    expect(mockWallet.createTrade).toHaveBeenCalledWith(args);
    expect(mockTrade.wait).toHaveBeenCalled();
    expect(response).toContain(
      `Traded ${MOCK_TRADE_AMOUNT} of ${MOCK_TRADE_ASSET_ID_FROM} for ${TO_AMOUNT} of ${MOCK_TRADE_ASSET_ID_TO}`,
    );
    expect(response).toContain(`Transaction hash for the trade: ${TRANSACTION_HASH}`);
    expect(response).toContain(`Transaction link for the trade: ${TRANSACTION_LINK}`);
  });

  it("should fail with an error", async () => {
    const args = {
      amount: MOCK_TRADE_AMOUNT,
      fromAssetId: MOCK_TRADE_ASSET_ID_FROM,
      toAssetId: MOCK_TRADE_ASSET_ID_TO,
    };

    const error = new Error("Failed to execute trade");
    mockWallet.createTrade.mockRejectedValue(error);

    const response = await createTrade(mockWallet, args);

    expect(mockWallet.createTrade).toHaveBeenCalled();
    expect(response).toContain(`Error trading assets: ${error}`);
  });
});
