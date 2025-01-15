import { Coinbase, FaucetTransaction, Wallet } from "@coinbase/coinbase-sdk";

import { requestFaucetFunds, RequestFaucetFundsInput } from "../actions/cdp/request_faucet_funds";

const MOCK_ASSET_ID = Coinbase.assets.Usdc;

describe("Request Faucet Funds Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      assetId: MOCK_ASSET_ID,
    };

    const result = RequestFaucetFundsInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should successfully parsing empty input", () => {
    const emptyInput = {};
    const result = RequestFaucetFundsInput.safeParse(emptyInput);

    expect(result.success).toBe(true);
  });
});

describe("Request Faucet Funds Action", () => {
  const TRANSACTION_HASH = "0xghijkl987654321";
  const TRANSACTION_LINK = `https://etherscan.io/tx/${TRANSACTION_HASH}`;

  let mockFaucetTransaction: jest.Mocked<FaucetTransaction>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockFaucetTransaction = {
      wait: jest.fn().mockResolvedValue({
        getTransactionLink: jest.fn().mockReturnValue(TRANSACTION_LINK),
      }),
    } as unknown as jest.Mocked<FaucetTransaction>;

    mockWallet = {
      faucet: jest.fn(),
    } as unknown as jest.Mocked<Wallet>;

    mockWallet.faucet.mockResolvedValue(mockFaucetTransaction);
  });

  it("should successfully request faucet funds", async () => {
    const args = {};
    const response = await requestFaucetFunds(mockWallet, args);

    expect(mockWallet.faucet).toHaveBeenCalled();
    expect(mockFaucetTransaction.wait).toHaveBeenCalled();
    expect(response).toContain(`Received ETH from the faucet. Transaction: ${TRANSACTION_LINK}`);
  });

  it("should successfully request faucet funds with an asset id", async () => {
    const args = { assetId: MOCK_ASSET_ID };
    const response = await requestFaucetFunds(mockWallet, args);

    expect(mockWallet.faucet).toHaveBeenCalledWith(MOCK_ASSET_ID);
    expect(mockFaucetTransaction.wait).toHaveBeenCalled();
    expect(response).toContain(`Received ${MOCK_ASSET_ID} from the faucet`);
    expect(response).toContain(`Transaction: ${TRANSACTION_LINK}`);
  });

  it("should fail with an error", async () => {
    const args = { assetId: MOCK_ASSET_ID };

    const error = new Error("Failed to request funds");
    mockWallet.faucet.mockRejectedValue(error);

    const response = await requestFaucetFunds(mockWallet, args);

    expect(mockWallet.faucet).toHaveBeenCalled();
    expect(response).toContain(`Error requesting faucet funds: ${error}`);
  });
});
