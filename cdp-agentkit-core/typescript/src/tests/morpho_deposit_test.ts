import { Coinbase, ContractInvocation, Wallet, Asset } from "@coinbase/coinbase-sdk";
import { MorphoDepositAction } from "../actions/morpho/deposit";
import { METAMORPHO_ABI } from "../actions/morpho/constants";
import { approve } from "../actions/morpho/utils";
import { Decimal } from "decimal.js";

const MOCK_VAULT_ADDRESS = "0x1234567890123456789012345678901234567890";
const MOCK_ASSETS = "1000000000000000000"; // 1 token in wei
const MOCK_RECEIVER_ID = "0x9876543210987654321098765432109876543210";
const MOCK_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000006";

jest.mock("../actions/morpho/utils");
const mockApprove = approve as jest.MockedFunction<typeof approve>;

describe("Morpho Deposit Input", () => {
  const action = new MorphoDepositAction();

  it("should successfully parse valid input", () => {
    const validInput = {
      vaultAddress: MOCK_VAULT_ADDRESS,
      assets: MOCK_ASSETS,
      receiver: MOCK_RECEIVER_ID,
      tokenAddress: MOCK_TOKEN_ADDRESS,
    };

    const result = action.argsSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail parsing empty input", () => {
    const emptyInput = {};
    const result = action.argsSchema.safeParse(emptyInput);

    expect(result.success).toBe(false);
  });

  it("should fail with invalid vault address", () => {
    const invalidInput = {
      vaultAddress: "not_an_address",
      assets: MOCK_ASSETS,
      receiver: MOCK_RECEIVER_ID,
      tokenAddress: MOCK_TOKEN_ADDRESS,
    };
    const result = action.argsSchema.safeParse(invalidInput);

    expect(result.success).toBe(false);
  });
});

describe("Morpho Deposit Action", () => {
  const NETWORK_ID = Coinbase.networks.BaseSepolia;
  const TRANSACTION_HASH = "0xabcdef1234567890";
  const TRANSACTION_LINK = `https://etherscan.io/tx/${TRANSACTION_HASH}`;

  const action = new MorphoDepositAction();

  let mockContractInvocation: jest.Mocked<ContractInvocation>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockContractInvocation = {
      wait: jest.fn().mockResolvedValue({
        getTransactionHash: jest.fn().mockReturnValue(TRANSACTION_HASH),
        getTransactionLink: jest.fn().mockReturnValue(TRANSACTION_LINK)
      }),
    } as unknown as jest.Mocked<ContractInvocation>;

    mockWallet = {
      invokeContract: jest.fn(),
      getDefaultAddress: jest.fn().mockResolvedValue({
        getId: jest.fn().mockReturnValue(MOCK_RECEIVER_ID),
      }),
      getNetworkId: jest.fn().mockReturnValue(NETWORK_ID),
    } as unknown as jest.Mocked<Wallet>;

    mockWallet.invokeContract.mockResolvedValue(mockContractInvocation);

    // Mock Asset.fetch
    jest.spyOn(Asset, 'fetch').mockResolvedValue({
      toAtomicAmount: jest.fn().mockImplementation((amount: Decimal) => amount.toString()),
    } as any);

    mockApprove.mockResolvedValue("Approval successful");
  });

  it("should successfully deposit to Morpho vault", async () => {
    const args = {
      vaultAddress: MOCK_VAULT_ADDRESS,
      assets: MOCK_ASSETS,
      receiver: MOCK_RECEIVER_ID,
      tokenAddress: MOCK_TOKEN_ADDRESS,
    };

    const response = await action.func(mockWallet, args);

    expect(mockApprove).toHaveBeenCalledWith(
      mockWallet,
      MOCK_TOKEN_ADDRESS,
      MOCK_VAULT_ADDRESS,
      MOCK_ASSETS
    );

    expect(mockWallet.invokeContract).toHaveBeenCalledWith({
      contractAddress: MOCK_VAULT_ADDRESS,
      method: "deposit",
      abi: METAMORPHO_ABI,
      args: {
        assets: MOCK_ASSETS,
        receiver: MOCK_RECEIVER_ID,
      },
    });

    expect(mockContractInvocation.wait).toHaveBeenCalled();
    expect(response).toContain(`Deposited ${MOCK_ASSETS}`);
    expect(response).toContain(`to Morpho Vault ${MOCK_VAULT_ADDRESS}`);
    expect(response).toContain(`with transaction hash: ${TRANSACTION_HASH}`);
    expect(response).toContain(`and transaction link: ${TRANSACTION_LINK}`);
  });

  it("should handle approval failure", async () => {
    const args = {
      vaultAddress: MOCK_VAULT_ADDRESS,
      assets: MOCK_ASSETS,
      receiver: MOCK_RECEIVER_ID,
      tokenAddress: MOCK_TOKEN_ADDRESS,
    };

    mockApprove.mockResolvedValue("Error: Approval failed");

    const response = await action.func(mockWallet, args);

    expect(mockApprove).toHaveBeenCalled();
    expect(response).toContain("Error approving Morpho Vault as spender: Error: Approval failed");
    expect(mockWallet.invokeContract).not.toHaveBeenCalled();
  });

  it("should handle deposit errors", async () => {
    const args = {
      vaultAddress: MOCK_VAULT_ADDRESS,
      assets: MOCK_ASSETS,
      receiver: MOCK_RECEIVER_ID,
      tokenAddress: MOCK_TOKEN_ADDRESS,
    };

    const error = new Error("Failed to deposit to Morpho vault");
    mockWallet.invokeContract.mockRejectedValue(error);

    const response = await action.func(mockWallet, args);

    expect(mockApprove).toHaveBeenCalled();
    expect(mockWallet.invokeContract).toHaveBeenCalled();
    expect(response).toContain(`Error depositing to Morpho Vault: ${error}`);
  });
});
