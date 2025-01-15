import { TwitterToolkit } from "../twitter_toolkit";
import { TwitterTool } from "../twitter_tool";
import {
  TwitterAction,
  TwitterActionSchemaAny,
  TwitterAgentkit,
} from "@coinbase/cdp-agentkit-core";
import { z } from "zod";

describe("TwitterToolkit", () => {
  let mockAgentkit: jest.Mocked<TwitterAgentkit>;
  let mockActions: jest.Mocked<TwitterAction<TwitterActionSchemaAny>>[];
  let twitterToolkit: TwitterToolkit;

  beforeEach(() => {
    mockAgentkit = {
      run: jest.fn((action, args) => action.func(mockAgentkit, args)),
    } as unknown as jest.Mocked<TwitterAgentkit>;

    mockActions = [
      {
        name: "account_details",
        description: "Get Twitter account details",
        argsSchema: z.object({ userId: z.string() }),
        func: jest.fn().mockResolvedValue("@user123 - Joined 2023"),
      },
      {
        name: "post_tweet",
        description: "Post a new tweet",
        argsSchema: z.object({ content: z.string() }),
        func: jest.fn().mockResolvedValue("Tweet posted successfully"),
      },
    ];

    twitterToolkit = new TwitterToolkit(mockAgentkit);
    twitterToolkit.tools = mockActions.map(action => new TwitterTool(action, mockAgentkit));
  });

  it("should initialize with correct tools", () => {
    expect(twitterToolkit.tools).toHaveLength(mockActions.length);
    expect(twitterToolkit.tools[0].name).toBe("account_details");
    expect(twitterToolkit.tools[1].name).toBe("post_tweet");
  });

  it("should execute action from toolkit", async () => {
    const tool = twitterToolkit.tools[0];
    const args = { userId: "user123" };
    const response = await tool.call(args);

    expect(mockActions[0].func).toHaveBeenCalledWith(mockAgentkit, args);
    expect(response).toBe("@user123 - Joined 2023");
  });

  it("should handle action execution failure", async () => {
    const error = new Error("Failed to fetch account details");
    mockActions[0].func.mockRejectedValue(error);

    const tool = twitterToolkit.tools[0];
    const args = { userId: "user123" };
    const response = await tool.call(args);

    expect(response).toContain(`Error executing account_details: ${error.message}`);
  });

  it("should return all available tools", () => {
    const tools = twitterToolkit.getTools();

    expect(tools).toHaveLength(mockActions.length);
    expect(tools[0].name).toBe("account_details");
    expect(tools[1].name).toBe("post_tweet");
  });
});
