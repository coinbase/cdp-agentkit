import {
  RpcResponseAndContext,
  SignatureResult,
  SendTransactionError,
  Connection,
  PublicKey,
} from "@solana/web3.js";

import { SplActionProvider } from "./splActionProvider";
import { SvmWalletProvider } from "../../wallet-providers/svmWalletProvider";
import { Network } from "../../network";

type Mint = {
  decimals: number;
};

type Account = {
  amount: bigint;
  address: PublicKey;
  mint: PublicKey;
  owner: PublicKey;
  delegate: null;
  delegatedAmount: bigint;
  closeAuthority: null;
  isFrozen: boolean;
  isNative: boolean;
  rentExemptReserve: null;
  isInitialized: boolean;
  tlvData: Map<unknown, unknown>;
};

jest.mock("@solana/web3.js", () => ({
  ...jest.requireActual("@solana/web3.js"),
  Connection: jest.fn(),
  SendTransactionError: jest.fn().mockReturnValue({
    message: "Failed to send",
    toString: () => "Failed to send",
  }),
  VersionedTransaction: jest.fn().mockReturnValue({
    sign: jest.fn(),
  }),
  MessageV0: {
    compile: jest.fn().mockReturnValue({}),
  },
}));

jest.mock("@solana/spl-token", () => ({
  getAssociatedTokenAddress: jest.fn(),
  getMint: jest.fn(),
  getAccount: jest.fn(),
  createAssociatedTokenAccountInstruction: jest.fn(),
  createTransferCheckedInstruction: jest.fn(),
}));

jest.mock("../../wallet-providers/svmWalletProvider");

describe("SplActionProvider", () => {
  let actionProvider: SplActionProvider;
  let mockWallet: jest.Mocked<SvmWalletProvider>;
  let mockConnection: jest.Mocked<Connection>;
  let mockGetAssociatedTokenAddress: jest.Mock;
  let mockGetMint: jest.Mock;
  let mockGetAccount: jest.Mock;

  /**
   * Set up test environment before each test.
   * Initializes mocks and creates fresh instances of required objects.
   */
  beforeEach(() => {
    jest.clearAllMocks();

    const mocked = jest.requireMock("@solana/spl-token");
    mockGetAssociatedTokenAddress = mocked.getAssociatedTokenAddress;
    mockGetMint = mocked.getMint;
    mockGetAccount = mocked.getAccount;

    mockGetMint.mockResolvedValue({ decimals: 6 } as Mint);
    mockGetAccount.mockRejectedValue(new Error("getAccount mock not implemented for this test"));

    actionProvider = new SplActionProvider();
    mockConnection = {
      getLatestBlockhash: jest.fn().mockResolvedValue({ blockhash: "mockedBlockhash" }),
    } as unknown as jest.Mocked<Connection>;

    const MOCK_SIGNATURE = "mock-signature";
    const mockSignatureReceipt: RpcResponseAndContext<SignatureResult> = {
      context: { slot: 1234 },
      value: { err: null },
    };

    mockWallet = {
      getConnection: jest.fn().mockReturnValue(mockConnection),
      getPublicKey: jest.fn().mockReturnValue(new PublicKey("11111111111111111111111111111111")),
      signAndSendTransaction: jest.fn().mockResolvedValue(MOCK_SIGNATURE),
      waitForSignatureResult: jest.fn().mockResolvedValue(mockSignatureReceipt),
      getAddress: jest.fn().mockReturnValue("11111111111111111111111111111111"),
      getNetwork: jest.fn().mockReturnValue({ protocolFamily: "svm", networkId: "mainnet" }),
      getName: jest.fn().mockReturnValue("mock-wallet"),
      getBalance: jest.fn().mockResolvedValue(BigInt(1000000000)),
      nativeTransfer: jest.fn(),
    } as unknown as jest.Mocked<SvmWalletProvider>;
  });

  describe("constructor", () => {
    /**
     * Test that the SPL action provider is created with the correct name.
     */
    it("should create a provider with correct name", () => {
      expect(actionProvider["name"]).toBe("spl");
    });
  });

  describe("supportsNetwork", () => {
    /**
     * Test that the provider correctly identifies Solana networks as supported.
     */
    it("should return true for Solana networks", () => {
      const network: Network = {
        protocolFamily: "svm",
        networkId: "solana-mainnet",
      };
      expect(actionProvider.supportsNetwork(network)).toBe(true);
    });

    /**
     * Test that the provider correctly identifies non-Solana networks as unsupported.
     */
    it("should return false for non-Solana networks", () => {
      const network: Network = {
        protocolFamily: "evm",
        networkId: "ethereum-mainnet",
      };
      expect(actionProvider.supportsNetwork(network)).toBe(false);
    });
  });

  describe("transfer", () => {
    const MINT_ADDRESS = "So11111111111111111111111111111111111111112";
    const RECIPIENT_ADDRESS = "DjXsn34uz8yCBQ8bevLrEPYYC1RvhHvjzuVF8opNc4K2";
    const SENDER_ADDRESS = "11111111111111111111111111111111";
    const MOCK_SIGNATURE = "mock-signature";

    const transferArgs = {
      recipient: RECIPIENT_ADDRESS,
      mintAddress: MINT_ADDRESS,
      amount: 100,
      createAtaIfMissing: true,
    };

    const mockTokenAccount = {
      amount: BigInt(1000000000),
      address: new PublicKey(MINT_ADDRESS),
      mint: new PublicKey(MINT_ADDRESS),
      owner: new PublicKey(RECIPIENT_ADDRESS),
      delegate: null,
      delegatedAmount: BigInt(0),
      closeAuthority: null,
      isFrozen: false,
      isNative: false,
      rentExemptReserve: null,
      isInitialized: true,
      tlvData: new Map(),
    } as unknown as Account;

    const mockSignatureReceipt: RpcResponseAndContext<SignatureResult> = {
      context: { slot: 1234 },
      value: { err: null },
    };

    beforeEach(() => {
      mockWallet.getPublicKey.mockReturnValue(new PublicKey(SENDER_ADDRESS));
      mockWallet.getAddress.mockReturnValue(SENDER_ADDRESS);
      mockWallet.signAndSendTransaction.mockResolvedValue(MOCK_SIGNATURE);
      mockWallet.waitForSignatureResult.mockResolvedValue(mockSignatureReceipt);
    });

    /**
     * Test successful SPL token transfer with all required steps:
     * - Account validation
     * - Instruction creation
     * - Signing
     * - Sending
     * - Receipt confirmation
     */
    it("should successfully transfer SPL tokens", async () => {
      mockGetAccount.mockResolvedValue(mockTokenAccount);

      const result = await actionProvider.transfer(mockWallet, transferArgs);

      expect(mockGetAssociatedTokenAddress).toHaveBeenNthCalledWith(
        1,
        new PublicKey(transferArgs.mintAddress),
        new PublicKey(SENDER_ADDRESS),
      );

      expect(mockGetAssociatedTokenAddress).toHaveBeenNthCalledWith(
        2,
        new PublicKey(transferArgs.mintAddress),
        new PublicKey(transferArgs.recipient),
      );

      expect(mockGetMint).toHaveBeenCalledWith(
        mockConnection,
        new PublicKey(transferArgs.mintAddress),
      );
      expect(mockGetAccount).toHaveBeenCalled();
      expect(mockWallet.signAndSendTransaction).toHaveBeenCalled();
      expect(mockWallet.waitForSignatureResult).toHaveBeenCalledWith(MOCK_SIGNATURE);

      expect(result).toContain(`Successfully transferred ${transferArgs.amount} tokens`);
      expect(result).toContain(`to ${transferArgs.recipient}`);
      expect(result).toContain(`Token mint: ${transferArgs.mintAddress}`);
      expect(result).toContain(`Signature: ${MOCK_SIGNATURE}`);
    });

    /**
     * Test handling of insufficient balance.
     * Verifies that the provider properly checks token balances and prevents transfers when funds are insufficient.
     */
    it("should handle insufficient balance", async () => {
      mockGetAccount.mockResolvedValue({
        ...mockTokenAccount,
        amount: BigInt(10000000),
      });

      const result = await actionProvider.transfer(mockWallet, transferArgs);
      expect(result).toBe(
        "Error transferring SPL tokens: Error: Insufficient token balance. Have 10000000, need 100000000",
      );
    });

    /**
     * Test handling of Solana-specific send errors.
     * Verifies that the provider properly handles and reports SendTransactionError instances.
     */
    it("should handle SendTransactionError", async () => {
      mockGetAccount.mockResolvedValue(mockTokenAccount);
      const error = new SendTransactionError({
        logs: [],
        action: "send",
        signature: "mock-signature",
        transactionMessage: "Failed to send",
      });
      mockWallet.signAndSendTransaction.mockRejectedValue(error);

      const result = await actionProvider.transfer(mockWallet, transferArgs);
      expect(result).toBe("Error transferring SPL tokens: Failed to send");
    });

    /**
     * Test handling of general errors during transfer.
     * Verifies that the provider properly handles and reports unexpected errors.
     */
    it("should handle regular errors", async () => {
      mockGetAccount.mockResolvedValue(mockTokenAccount);
      const error = new Error("Regular error message");
      mockWallet.signAndSendTransaction.mockRejectedValue(error);

      const result = await actionProvider.transfer(mockWallet, transferArgs);
      expect(result).toBe("Error transferring SPL tokens: Error: Regular error message");
    });

    /**
     * Test that ATA is created by default when missing
     */
    it("should create ATA by default when missing", async () => {
      mockGetAccount
        .mockResolvedValueOnce(mockTokenAccount)
        .mockRejectedValueOnce(new Error("Account does not exist"))
        .mockResolvedValue(mockTokenAccount);

      const result = await actionProvider.transfer(mockWallet, transferArgs);

      const { createAssociatedTokenAccountInstruction } = jest.requireMock("@solana/spl-token");
      expect(createAssociatedTokenAccountInstruction).toHaveBeenCalled();
      expect(result).toContain(`Successfully transferred ${transferArgs.amount} tokens`);
    });

    /**
     * Test that error is thrown when ATA is missing and createAtaIfMissing is false
     */
    it("should throw error when ATA missing and createAtaIfMissing is false", async () => {
      mockGetAccount
        .mockResolvedValueOnce(mockTokenAccount)
        .mockRejectedValueOnce(new Error("Account does not exist"));

      const result = await actionProvider.transfer(mockWallet, {
        ...transferArgs,
        createAtaIfMissing: false,
      });

      expect(result).toBe(
        `Error transferring SPL tokens: Error: Associated Token Account does not exist for recipient ${RECIPIENT_ADDRESS} and creation was not requested`,
      );

      const { createAssociatedTokenAccountInstruction } = jest.requireMock("@solana/spl-token");
      expect(createAssociatedTokenAccountInstruction).not.toHaveBeenCalled();
    });
  });
});
