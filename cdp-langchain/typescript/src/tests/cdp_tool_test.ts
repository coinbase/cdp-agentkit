import { CdpAction, CdpActionSchemaAny, CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpTool } from "../tools/cdp_tool";
import { z } from "zod";

const MOCK_DESCRIPTION = "CDP Test Action";
const MOCK_NAME = "get_wallet_details";

describe("CdpTool", () => {
  let mockAgentkit: jest.Mocked<CdpAgentkit>;
  let mockAction: jest.Mocked<CdpAction<CdpActionSchemaAny>>;
  let cdpTool: CdpTool<CdpActionSchemaAny>;

  beforeEach(() => {
    mockAgentkit = {
      run: jest.fn((action, args) => action.func(args)),
      wallet: {
        getDefaultAddress: jest.fn().mockResolvedValue({ getId: () => "mock-address" }),
      },
    } as unknown as jest.Mocked<CdpAgentkit>;

    mockAction = {
      name: MOCK_NAME,
      description: MOCK_DESCRIPTION,
      argsSchema: z.object({ wallet_id: z.string() }),
      func: jest.fn().mockResolvedValue("Wallet details retrieved successfully"),
    } as unknown as jest.Mocked<CdpAction<CdpActionSchemaAny>>;

    cdpTool = new CdpTool(mockAction, mockAgentkit);
  });

  it("should initialize with correct properties", () => {
    expect(cdpTool.name).toBe(MOCK_NAME);
    expect(cdpTool.description).toBe(MOCK_DESCRIPTION);
    expect(cdpTool.schema).toEqual(mockAction.argsSchema);
  });

  it("should execute action with valid args", async () => {
    const args = { wallet_id: "0x123" };
    const response = await cdpTool.call(args);

    expect(mockAction.func).toHaveBeenCalledWith(args);
    expect(response).toBe("Wallet details retrieved successfully");
  });

  it("should handle schema validation errors", async () => {
    const invalidArgs = { invalid_param: "test" };
    await expect(cdpTool.call(invalidArgs)).rejects.toThrow();
    expect(mockAction.func).not.toHaveBeenCalled();
  });

  it("should return error message on action execution failure", async () => {
    mockAction.func.mockRejectedValue(new Error("Failed to retrieve wallet details"));
    const args = { wallet_id: "0x123" };
    const response = await cdpTool.call(args);
    expect(response).toContain(
      "Error executing get_wallet_details: Failed to retrieve wallet details",
    );
  });
});
