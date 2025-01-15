import { Coinbase, Transfer, Wallet } from "@coinbase/coinbase-sdk";

import { transfer as createTransfer, TransferInput } from "../actions/cdp/transfer";

const MOCK_AMOUNT = 15;
const MOCK_ASSET_ID = Coinbase.assets.Eth;
const MOCK_DESTINATION = "0x321";
const MOCK_GASLESS = true;

describe("Transfer Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      amount: MOCK_AMOUNT,
      assetId: MOCK_ASSET_ID,
      destination: MOCK_DESTINATION,
      gasless: MOCK_GASLESS,
    };

    const result = TransferInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail parsing empty input", () => {
    const emptyInput = {};
    const result = TransferInput.safeParse(emptyInput);

    expect(result.success).toBe(false);
  });
});

describe("Transfer Action", () => {
  const TRANSACTION_HASH = "0xghijkl987654321";
  const TRANSACTION_LINK = `https://etherscan.io/tx/${TRANSACTION_HASH}`;

  let mockTransfer: jest.Mocked<Transfer>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(async () => {
    mockTransfer = {
      wait: jest.fn().mockResolvedValue({
        getTransactionHash: jest.fn().mockReturnValue(TRANSACTION_HASH),
        getTransactionLink: jest.fn().mockReturnValue(TRANSACTION_LINK),
      }),
    } as unknown as jest.Mocked<Transfer>;

    mockWallet = {
      createTransfer: jest.fn(),
    } as unknown as jest.Mocked<Wallet>;

    mockWallet.createTransfer.mockResolvedValue(mockTransfer);
  });

  it("should successfully respond", async () => {
    const args = {
      amount: MOCK_AMOUNT,
      assetId: MOCK_ASSET_ID,
      destination: MOCK_DESTINATION,
      gasless: MOCK_GASLESS,
    };

    const response = await createTransfer(mockWallet, args);

    expect(mockWallet.createTransfer).toHaveBeenCalledWith(args);
    expect(mockTransfer.wait).toHaveBeenCalled();
    expect(response).toContain(
      `Transferred ${MOCK_AMOUNT} of ${MOCK_ASSET_ID} to ${MOCK_DESTINATION}`,
    );
    expect(response).toContain(`Transaction hash for the transfer: ${TRANSACTION_HASH}`);
    expect(response).toContain(`Transaction link for the transfer: ${TRANSACTION_LINK}`);
  });

  it("should fail with an error", async () => {
    const args = {
      amount: MOCK_AMOUNT,
      assetId: MOCK_ASSET_ID,
      destination: MOCK_DESTINATION,
      gasless: MOCK_GASLESS,
    };

    const error = new Error("Failed to execute transfer");
    mockWallet.createTransfer.mockRejectedValue(error);

    const response = await createTransfer(mockWallet, args);

    expect(mockWallet.createTransfer).toHaveBeenCalledWith(args);
    expect(response).toContain(`Error transferring the asset: ${error}`);
  });
});
