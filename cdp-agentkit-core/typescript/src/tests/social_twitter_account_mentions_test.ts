import {
  accountMentions,
  AccountMentionsInput,
} from "../actions/cdp/social/twitter/account_mentions";
import { TwitterApi, TwitterApiv2 } from "twitter-api-v2";

const MOCK_ACCOUNT_ID = "1857479287504584856";

describe("Account Mentions Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = { userId: MOCK_ACCOUNT_ID };
    const result = AccountMentionsInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail to parse empty input", () => {
    const emptyInput = {};
    const result = AccountMentionsInput.safeParse(emptyInput);

    expect(result.success).toBe(false);
    expect(result.error!.issues[0].message).toBe("Required");
  });

  it("should fail to parse invalid input", () => {
    const invalidInput = { userId: "" };
    const result = AccountMentionsInput.safeParse(invalidInput);

    expect(result.success).toBe(false);
    expect(result.error!.issues[0].message).toBe("Account ID is required.");
  });
});

describe("Account Mentions Action", () => {
  const mockApiResponse = {
    data: [
      {
        id: "0123456789012345678",
        text: "@CDPAgentkit please reply!",
      },
    ],
  };

  let mockApi: jest.Mocked<TwitterApi>;
  let mockClient: jest.Mocked<TwitterApiv2>;

  beforeEach(() => {
    mockClient = {
      userMentionTimeline: jest.fn().mockResolvedValue(mockApiResponse),
    } as unknown as jest.Mocked<TwitterApiv2>;

    mockApi = {
      get v2() {
        return mockClient;
      },
    } as unknown as jest.Mocked<TwitterApi>;
  });

  it("should successfully retrieve account mentions", async () => {
    const args = { userId: MOCK_ACCOUNT_ID };
    const response = await accountMentions(mockApi, args);

    expect(mockApi.v2.userMentionTimeline).toHaveBeenCalledWith(MOCK_ACCOUNT_ID);
    expect(response).toContain("Successfully retrieved account mentions:");
    expect(response).toContain(JSON.stringify(mockApiResponse));
  });

  it("should handle errors when retrieving account mentions", async () => {
    const args = {
      userId: MOCK_ACCOUNT_ID,
    };

    const error = new Error("Twitter API error");
    mockClient.userMentionTimeline.mockRejectedValue(error);

    const response = await accountMentions(mockApi, args);

    expect(mockApi.v2.userMentionTimeline).toHaveBeenCalledWith(MOCK_ACCOUNT_ID);
    expect(response).toContain("Error retrieving authenticated account mentions:");
    expect(response).toContain(error.message);
  });
});
