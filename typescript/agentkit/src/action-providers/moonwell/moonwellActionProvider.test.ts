import { encodeFunctionData, parseEther } from "viem";
import { EvmWalletProvider } from "../../wallet-providers";
import { approve } from "../../utils";
import { MoonwellActionProvider } from "./moonwellActionProvider";
import { MTOKEN_ABI, ETH_ROUTER_ABI, WETH_ROUTER_ADDRESS, MOONWELL_BASE_ADDRESSES } from "./constants";
import { DepositSchema, WithdrawSchema } from "./schemas";
import { Network } from "../../network";

const MOCK_MTOKEN_ADDRESS = "0x73902f619CEB9B31FD8EFecf435CbDf89E369Ba6";
const MOCK_ATOMIC_ASSETS = "1000000000000000000";
const MOCK_WHOLE_ASSETS = "1.0";
const MOCK_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000006";
const MOCK_TX_HASH = "0xabcdef1234567890";
const MOCK_RECEIPT = { status: 1, blockNumber: 1234567 };
const WETH_MTOKEN = "0x628ff693426583D9a7FB391E54366292F509D457";

jest.mock("../../utils");
const mockApprove = approve as jest.MockedFunction<typeof approve>;

describe("Moonwell Action Provider", () => {
    const actionProvider = new MoonwellActionProvider();
    let mockWallet: jest.Mocked<EvmWalletProvider>;

    beforeEach(() => {
        mockWallet = {
            getAddress: jest.fn().mockReturnValue(MOCK_TOKEN_ADDRESS),
            getNetwork: jest.fn().mockReturnValue({ protocolFamily: "evm", networkId: "base-mainnet" } as Network),
            sendTransaction: jest.fn().mockResolvedValue(MOCK_TX_HASH as `0x${string}`),
            waitForTransactionReceipt: jest.fn().mockResolvedValue(MOCK_RECEIPT),
        } as unknown as jest.Mocked<EvmWalletProvider>;

        mockApprove.mockResolvedValue("Approval successful");
    });

    describe("Deposit Schema", () => {
        it("should successfully parse valid input", () => {
            const validInput = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            const result = DepositSchema.safeParse(validInput);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual(validInput);
            }
        });

        it("should fail parsing empty input", () => {
            const emptyInput = {};
            const result = DepositSchema.safeParse(emptyInput);

            expect(result.success).toBe(false);
        });

        it("should fail with invalid mToken address", () => {
            const invalidInput = {
                mTokenAddress: "not_an_address",
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };
            const result = DepositSchema.safeParse(invalidInput);

            expect(result.success).toBe(false);
        });

        it("should handle valid asset string formats", () => {
            const validInput = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            const validInputs = [
                { ...validInput, assets: "1.5" },
                { ...validInput, assets: "0.00001" },
                { ...validInput, assets: "1000" },
            ];

            validInputs.forEach(input => {
                const result = DepositSchema.safeParse(input);
                expect(result.success).toBe(true);
            });
        });

        it("should reject invalid asset strings", () => {
            const validInput = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            const invalidInputs = [
                { ...validInput, assets: "" },
                { ...validInput, assets: "1,000" },
                { ...validInput, assets: "1.2.3" },
                { ...validInput, assets: "abc" },
            ];

            invalidInputs.forEach(input => {
                const result = DepositSchema.safeParse(input);
                expect(result.success).toBe(false);
            });
        });
    });

    describe("Withdraw Schema", () => {
        it("should successfully parse valid input", () => {
            const validInput = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_ATOMIC_ASSETS,
            };

            const result = WithdrawSchema.safeParse(validInput);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual(validInput);
            }
        });

        it("should fail parsing empty input", () => {
            const emptyInput = {};
            const result = WithdrawSchema.safeParse(emptyInput);

            expect(result.success).toBe(false);
        });

        it("should fail with invalid mToken address", () => {
            const invalidInput = {
                mTokenAddress: "not_an_address",
                assets: MOCK_ATOMIC_ASSETS,
            };
            const result = WithdrawSchema.safeParse(invalidInput);

            expect(result.success).toBe(false);
        });

        it("should handle valid asset string formats", () => {
            const validInput = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_ATOMIC_ASSETS,
            };

            const validInputs = [
                { ...validInput, assets: "1000000000000000000" },
                { ...validInput, assets: "1" },
                { ...validInput, assets: "999999999999999999999" },
            ];

            validInputs.forEach(input => {
                const result = WithdrawSchema.safeParse(input);
                expect(result.success).toBe(true);
            });
        });

        it("should reject invalid asset strings", () => {
            const validInput = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_ATOMIC_ASSETS,
            };

            const invalidInputs = [
                { ...validInput, assets: "" },
                { ...validInput, assets: "1.5" },
                { ...validInput, assets: "1,000" },
                { ...validInput, assets: "abc" },
            ];

            invalidInputs.forEach(input => {
                const result = WithdrawSchema.safeParse(input);
                expect(result.success).toBe(false);
            });
        });
    });

    describe("deposit", () => {
        it("should successfully deposit to Moonwell MToken", async () => {
            const args = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            mockWallet.getNetwork.mockReturnValue({
                protocolFamily: "evm",
                networkId: "base-mainnet",
            } as Network);

            const atomicAssets = parseEther(MOCK_WHOLE_ASSETS);

            const response = await actionProvider.deposit(mockWallet, args);

            expect(mockApprove).toHaveBeenCalledWith(
                mockWallet,
                MOCK_TOKEN_ADDRESS,
                MOCK_MTOKEN_ADDRESS,
                atomicAssets,
            );

            expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
                to: MOCK_MTOKEN_ADDRESS as `0x${string}`,
                data: encodeFunctionData({
                    abi: MTOKEN_ABI,
                    functionName: "mint",
                    args: [atomicAssets],
                }),
            });

            expect(mockWallet.waitForTransactionReceipt).toHaveBeenCalledWith(MOCK_TX_HASH);
            expect(response).toContain(`Deposited ${MOCK_WHOLE_ASSETS}`);
            expect(response).toContain(MOCK_TX_HASH);
            expect(response).toContain(JSON.stringify(MOCK_RECEIPT));
        });

        it("should successfully deposit to Moonwell MToken on sepolia", async () => {
            const args = {
                mTokenAddress: "0x2F39a349A79492a70E152760ce7123A1933eCf28", // Sepolia WETH mToken
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            mockWallet.getNetwork.mockReturnValue({
                protocolFamily: "evm",
                networkId: "base-sepolia",
            } as Network);

            const atomicAssets = parseEther(MOCK_WHOLE_ASSETS);

            const response = await actionProvider.deposit(mockWallet, args);

            expect(mockApprove).toHaveBeenCalledWith(
                mockWallet,
                MOCK_TOKEN_ADDRESS,
                args.mTokenAddress,
                atomicAssets,
            );

            expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
                to: args.mTokenAddress as `0x${string}`,
                data: encodeFunctionData({
                    abi: MTOKEN_ABI,
                    functionName: "mint",
                    args: [atomicAssets],
                }),
            });

            expect(mockWallet.waitForTransactionReceipt).toHaveBeenCalledWith(MOCK_TX_HASH);
            expect(response).toContain(`Deposited ${MOCK_WHOLE_ASSETS}`);
            expect(response).toContain(MOCK_TX_HASH);
            expect(response).toContain(JSON.stringify(MOCK_RECEIPT));
        });

        it("should reject deposit with zero assets amount", async () => {
            const args = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: "0.0",
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            const response = await actionProvider.deposit(mockWallet, args);

            expect(response).toBe("Error: Assets amount must be greater than 0");
            expect(mockWallet.sendTransaction).not.toHaveBeenCalled();
        });

        it("should reject deposit with invalid MToken address not in MOONWELL_BASE_ADDRESSES", async () => {
            const invalidMTokenAddress = "0x1234567890123456789012345678901234567890"; // Valid address format but not in MOONWELL_BASE_ADDRESSES
            const args = {
                mTokenAddress: invalidMTokenAddress,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            mockWallet.getNetwork.mockReturnValue({
                protocolFamily: "evm",
                networkId: "base-mainnet",
            } as Network);

            const response = await actionProvider.deposit(mockWallet, args);

            expect(response).toBe("Error: Invalid MToken address");
            expect(mockWallet.sendTransaction).not.toHaveBeenCalled();
        });

        it("should reject deposit with invalid MToken address not in MOONWELL_BASE_SEPOLIA_ADDRESSES", async () => {
            const invalidMTokenAddress = "0x1234567890123456789012345678901234567890"; // Valid address format but not in MOONWELL_BASE_SEPOLIA_ADDRESSES
            const args = {
                mTokenAddress: invalidMTokenAddress,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            mockWallet.getNetwork.mockReturnValue({
                protocolFamily: "evm",
                networkId: "base-sepolia",
            } as Network);

            const response = await actionProvider.deposit(mockWallet, args);

            expect(response).toBe("Error: Invalid MToken address");
            expect(mockWallet.sendTransaction).not.toHaveBeenCalled();
        });

        it("should handle approval failure", async () => {
            const args = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            mockApprove.mockResolvedValue("Error: Approval failed");

            const response = await actionProvider.deposit(mockWallet, args);

            expect(mockApprove).toHaveBeenCalled();
            expect(response).toContain("Error approving Moonwell MToken as spender: Error: Approval failed");
            expect(mockWallet.sendTransaction).not.toHaveBeenCalled();
        });

        it("should handle deposit errors", async () => {
            const args = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_WHOLE_ASSETS,
                tokenAddress: MOCK_TOKEN_ADDRESS,
            };

            mockWallet.sendTransaction.mockRejectedValue(new Error("Failed to deposit"));

            const response = await actionProvider.deposit(mockWallet, args);

            expect(mockApprove).toHaveBeenCalled();
            expect(mockWallet.sendTransaction).toHaveBeenCalled();
            expect(response).toContain("Error depositing to Moonwell MToken: Error: Failed to deposit");
        });

        describe("ETH deposits via router", () => {
            beforeEach(() => {
                // Clear all mocks before each test
                jest.clearAllMocks();
                mockWallet = {
                    getAddress: jest.fn().mockReturnValue(MOCK_TOKEN_ADDRESS),
                    getNetwork: jest.fn().mockReturnValue({ protocolFamily: "evm", networkId: "base-mainnet" } as Network),
                    sendTransaction: jest.fn().mockResolvedValue(MOCK_TX_HASH as `0x${string}`),
                    waitForTransactionReceipt: jest.fn().mockResolvedValue(MOCK_RECEIPT),
                } as unknown as jest.Mocked<EvmWalletProvider>;
            });

            it("should use router for ETH deposits on mainnet", async () => {
                const args = {
                    mTokenAddress: WETH_MTOKEN,
                    assets: MOCK_WHOLE_ASSETS,
                    tokenAddress: MOCK_TOKEN_ADDRESS,
                };

                mockWallet.getNetwork.mockReturnValue({
                    protocolFamily: "evm",
                    networkId: "base-mainnet",
                } as Network);

                const atomicAssets = parseEther(MOCK_WHOLE_ASSETS);

                const response = await actionProvider.deposit(mockWallet, args);

                // Should not call approve for ETH deposits
                expect(mockApprove).not.toHaveBeenCalled();

                expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
                    to: WETH_ROUTER_ADDRESS as `0x${string}`,
                    data: encodeFunctionData({
                        abi: ETH_ROUTER_ABI,
                        functionName: "mint",
                        args: [MOCK_TOKEN_ADDRESS],
                    }),
                    value: atomicAssets,
                });

                expect(mockWallet.waitForTransactionReceipt).toHaveBeenCalledWith(MOCK_TX_HASH);
                expect(response).toContain(`Deposited ${MOCK_WHOLE_ASSETS} ETH to Moonwell WETH via router`);
                expect(response).toContain(MOCK_TX_HASH);
                expect(response).toContain(JSON.stringify(MOCK_RECEIPT));
            });

            it("should not use router for ETH deposits on sepolia", async () => {
                // Clear mocks before test
                jest.clearAllMocks();
                mockApprove.mockResolvedValue("Approval successful");

                const args = {
                    mTokenAddress: "0x2F39a349A79492a70E152760ce7123A1933eCf28", // Sepolia WETH mToken
                    assets: MOCK_WHOLE_ASSETS,
                    tokenAddress: MOCK_TOKEN_ADDRESS,
                };

                mockWallet.getNetwork.mockReturnValue({
                    protocolFamily: "evm",
                    networkId: "base-sepolia",
                } as Network);

                const atomicAssets = parseEther(MOCK_WHOLE_ASSETS);

                const response = await actionProvider.deposit(mockWallet, args);

                // Should call approve for token deposits on non-mainnet
                expect(mockApprove).toHaveBeenCalledWith(
                    mockWallet,
                    MOCK_TOKEN_ADDRESS,
                    args.mTokenAddress,
                    atomicAssets,
                );

                expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
                    to: args.mTokenAddress as `0x${string}`,
                    data: encodeFunctionData({
                        abi: MTOKEN_ABI,
                        functionName: "mint",
                        args: [atomicAssets],
                    }),
                });

                expect(mockWallet.waitForTransactionReceipt).toHaveBeenCalledWith(MOCK_TX_HASH);
                expect(response).toContain(`Deposited ${MOCK_WHOLE_ASSETS}`);
                expect(response).toContain(MOCK_TX_HASH);
                expect(response).toContain(JSON.stringify(MOCK_RECEIPT));
            });

            it("should handle errors in ETH deposit via router", async () => {
                const args = {
                    mTokenAddress: WETH_MTOKEN,
                    assets: MOCK_WHOLE_ASSETS,
                    tokenAddress: MOCK_TOKEN_ADDRESS,
                };

                mockWallet.getNetwork.mockReturnValue({
                    protocolFamily: "evm",
                    networkId: "base-mainnet",
                } as Network);

                mockWallet.sendTransaction.mockImplementation(() => {
                    throw new Error("Failed to deposit ETH");
                });

                const response = await actionProvider.deposit(mockWallet, args);

                // Should not call approve for ETH deposits on mainnet
                expect(mockApprove).not.toHaveBeenCalled();
                expect(response).toContain("Error depositing to Moonwell MToken: Error: Failed to deposit ETH");
            });
        });
    });

    describe("withdraw", () => {
        it("should successfully withdraw from Moonwell MToken", async () => {
            const args = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_ATOMIC_ASSETS,
            };

            const response = await actionProvider.withdraw(mockWallet, args);

            expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
                to: MOCK_MTOKEN_ADDRESS as `0x${string}`,
                data: encodeFunctionData({
                    abi: MTOKEN_ABI,
                    functionName: "redeemUnderlying",
                    args: [BigInt(MOCK_ATOMIC_ASSETS)],
                }),
            });

            expect(mockWallet.waitForTransactionReceipt).toHaveBeenCalledWith(MOCK_TX_HASH);
            expect(response).toContain(`Withdrawn ${MOCK_ATOMIC_ASSETS}`);
            expect(response).toContain(MOCK_TX_HASH);
            expect(response).toContain(JSON.stringify(MOCK_RECEIPT));
        });

        it("should reject withdrawal with zero assets amount", async () => {
            const args = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: "0",
            };

            const response = await actionProvider.withdraw(mockWallet, args);

            expect(response).toBe("Error: Assets amount must be greater than 0");
            expect(mockWallet.sendTransaction).not.toHaveBeenCalled();
        });

        it("should reject withdrawal with invalid MToken address not in MOONWELL_BASE_ADDRESSES", async () => {
            const invalidMTokenAddress = "0x1234567890123456789012345678901234567890"; // Valid address format but not in MOONWELL_BASE_ADDRESSES
            const args = {
                mTokenAddress: invalidMTokenAddress,
                assets: MOCK_ATOMIC_ASSETS,
            };

            const response = await actionProvider.withdraw(mockWallet, args);

            expect(response).toBe("Error: Invalid MToken address");
            expect(mockWallet.sendTransaction).not.toHaveBeenCalled();
        });

        it("should handle errors when withdrawing", async () => {
            const args = {
                mTokenAddress: MOCK_MTOKEN_ADDRESS,
                assets: MOCK_ATOMIC_ASSETS,
            };

            mockWallet.sendTransaction.mockRejectedValue(new Error("Failed to withdraw"));

            const response = await actionProvider.withdraw(mockWallet, args);

            expect(mockWallet.sendTransaction).toHaveBeenCalled();
            expect(response).toContain("Error withdrawing from Moonwell MToken: Error: Failed to withdraw");
        });
    });

    describe("supportsNetwork", () => {
        it("should return true for Base Mainnet", () => {
            const result = actionProvider.supportsNetwork({
                protocolFamily: "evm",
                networkId: "base-mainnet",
            });
            expect(result).toBe(true);
        });

        it("should return true for Base Sepolia", () => {
            const result = actionProvider.supportsNetwork({
                protocolFamily: "evm",
                networkId: "base-sepolia",
            });
            expect(result).toBe(true);
        });

        it("should return false for other EVM networks", () => {
            const result = actionProvider.supportsNetwork({
                protocolFamily: "evm",
                networkId: "ethereum",
            });
            expect(result).toBe(false);
        });

        it("should return false for non-EVM networks", () => {
            const result = actionProvider.supportsNetwork({
                protocolFamily: "bitcoin",
                networkId: "base-mainnet",
            });
            expect(result).toBe(false);
        });
    });
});