import { Coinbase, ContractInvocation, Wallet } from "@coinbase/coinbase-sdk";

import { Decimal } from "decimal.js";
import { encodeFunctionData, namehash } from "viem";

import {
  registerBasename,
  RegisterBasenameInput,
  BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_MAINNET,
  BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_TESTNET,
  L2_RESOLVER_ABI,
  L2_RESOLVER_ADDRESS_MAINNET,
  L2_RESOLVER_ADDRESS_TESTNET,
  REGISTRATION_DURATION,
  REGISTRAR_ABI,
} from "../actions/cdp/register_basename";

const MOCK_AMOUNT = "0.123";
const MOCK_BASENAME = "test-basename";

describe("Register Basename Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      amount: MOCK_AMOUNT,
      basename: MOCK_BASENAME,
    };

    const result = RegisterBasenameInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail parsing empty input", () => {
    const emptyInput = {};
    const result = RegisterBasenameInput.safeParse(emptyInput);

    expect(result.success).toBe(false);
  });
});

describe("Register Basename Action", () => {
  /**
   * This is the default network.
   */
  const NETWORK_ID = Coinbase.networks.BaseMainnet;

  /**
   * This is a 40 character hexadecimal string that requires lowercase alpha characters.
   */
  const ADDRESS_ID = "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83";

  let mockContractInvocation: jest.Mocked<ContractInvocation>;
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockContractInvocation = {
      wait: jest.fn().mockResolvedValue({}),
    } as unknown as jest.Mocked<ContractInvocation>;

    mockWallet = {
      getDefaultAddress: jest.fn().mockResolvedValue({
        getId: jest.fn().mockReturnValue(ADDRESS_ID),
      }),
      getNetworkId: jest.fn().mockReturnValue(NETWORK_ID),
      invokeContract: jest.fn(),
    } as unknown as jest.Mocked<Wallet>;

    mockWallet.invokeContract.mockResolvedValue(mockContractInvocation);
  });

  it(`should Successfully respond with ${MOCK_BASENAME}.base.eth for network: ${Coinbase.networks.BaseMainnet}`, async () => {
    const args = {
      amount: MOCK_AMOUNT,
      basename: MOCK_BASENAME,
    };

    const name = `${MOCK_BASENAME}.base.eth`;

    mockWallet.getNetworkId.mockReturnValue(Coinbase.networks.BaseMainnet);

    const response = await registerBasename(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalledWith({
      contractAddress: BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_MAINNET,
      method: "register",
      args: {
        request: [
          MOCK_BASENAME,
          ADDRESS_ID,
          REGISTRATION_DURATION,
          L2_RESOLVER_ADDRESS_MAINNET,
          [
            encodeFunctionData({
              abi: L2_RESOLVER_ABI,
              functionName: "setAddr",
              args: [namehash(name), ADDRESS_ID],
            }),
            encodeFunctionData({
              abi: L2_RESOLVER_ABI,
              functionName: "setName",
              args: [namehash(name), name],
            }),
          ],
          true,
        ],
      },
      abi: REGISTRAR_ABI,
      amount: new Decimal(MOCK_AMOUNT),
      assetId: "eth",
    });
    expect(mockContractInvocation.wait).toHaveBeenCalled();
    expect(response).toContain(`Successfully registered basename ${MOCK_BASENAME}.base.eth`);
    expect(response).toContain(`for address ${ADDRESS_ID}`);
  });

  it(`should Successfully respond with ${MOCK_BASENAME}.basetest.eth for any other network`, async () => {
    const args = {
      amount: MOCK_AMOUNT,
      basename: MOCK_BASENAME,
    };

    const name = `${MOCK_BASENAME}.basetest.eth`;

    mockWallet.getNetworkId.mockReturnValue("anything-else");

    const response = await registerBasename(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalledWith({
      contractAddress: BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_TESTNET,
      method: "register",
      args: {
        request: [
          MOCK_BASENAME,
          ADDRESS_ID,
          REGISTRATION_DURATION,
          L2_RESOLVER_ADDRESS_TESTNET,
          [
            encodeFunctionData({
              abi: L2_RESOLVER_ABI,
              functionName: "setAddr",
              args: [namehash(name), ADDRESS_ID],
            }),
            encodeFunctionData({
              abi: L2_RESOLVER_ABI,
              functionName: "setName",
              args: [namehash(name), name],
            }),
          ],
          true,
        ],
      },
      abi: REGISTRAR_ABI,
      amount: new Decimal(MOCK_AMOUNT),
      assetId: "eth",
    });
    expect(mockContractInvocation.wait).toHaveBeenCalled();
    expect(response).toContain(`Successfully registered basename ${MOCK_BASENAME}.basetest.eth`);
    expect(response).toContain(`for address ${ADDRESS_ID}`);
  });

  it("should fail with an error", async () => {
    const args = {
      amount: MOCK_AMOUNT,
      basename: MOCK_BASENAME,
    };

    const error = new Error("Failed to register basename");
    mockWallet.invokeContract.mockRejectedValue(error);

    await registerBasename(mockWallet, args);

    expect(mockWallet.invokeContract).toHaveBeenCalled();
    expect(`Error registering basename: ${error}`);
  });
});
