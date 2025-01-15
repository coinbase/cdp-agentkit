import { CdpToolkit } from "../toolkits/cdp_toolkit";
import { CdpTool } from "../tools/cdp_tool";
import { CdpAction, CdpActionSchemaAny, CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { z } from "zod";

describe("CdpToolkit", () => {
  let mockAgentkit: jest.Mocked<CdpAgentkit>;
  let mockActions: jest.Mocked<CdpAction<CdpActionSchemaAny>>[];
  let cdpToolkit: CdpToolkit;

  beforeEach(() => {
    mockAgentkit = {
      run: jest.fn((action, args) => action.func(args)),
      wallet: {
        getDefaultAddress: jest.fn().mockResolvedValue({ getId: () => "mock-address" }),
      },
    } as unknown as jest.Mocked<CdpAgentkit>;

    mockActions = [
      {
        name: "get_wallet_details",
        description: "Get wallet details",
        argsSchema: z.object({ param1: z.string() }),
        func: jest.fn().mockResolvedValue("success_1"),
      },
      {
        name: "get_balance",
        description: "Get wallet balance",
        argsSchema: z.object({ param2: z.string() }),
        func: jest.fn().mockResolvedValue("success_2"),
      },
    ];

    cdpToolkit = new CdpToolkit(mockAgentkit);
    cdpToolkit.tools = mockActions.map(action => new CdpTool(action, mockAgentkit));
  });

  it("should initialize with correct tools", () => {
    expect(cdpToolkit.tools).toHaveLength(mockActions.length);
    expect(cdpToolkit.tools[0].name).toBe("get_wallet_details");
    expect(cdpToolkit.tools[1].name).toBe("get_balance");
  });

  it("should execute action from toolkit", async () => {
    const tool = cdpToolkit.tools[0];
    const args = { param1: "test" };
    const response = await tool.call(args);

    expect(mockActions[0].func).toHaveBeenCalledWith(args);
    expect(response).toBe("success_1");
  });

  it("should handle action execution failure", async () => {
    const error = new Error("Execution failed");
    mockActions[0].func.mockRejectedValue(error);

    const tool = cdpToolkit.tools[0];
    const args = { param1: "test" };
    const response = await tool.call(args);

    expect(response).toContain(`Error executing get_wallet_details: ${error.message}`);
  });

  it("should return all available tools", () => {
    const tools = cdpToolkit.getTools();

    expect(tools).toHaveLength(mockActions.length);
    expect(tools[0].name).toBe("get_wallet_details");
    expect(tools[1].name).toBe("get_balance");
  });
});
