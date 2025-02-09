import { defillamaActionProvider } from "./defillamaActionProvider";

describe("DefiLlamaActionProvider", () => {
  const fetchMock = jest.fn();
  global.fetch = fetchMock;

  const provider = defillamaActionProvider();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getTokenPrices", () => {
    it("should return token prices when API call is successful", async () => {
      const mockResponse = {
        "ethereum:0x1234": { price: 1800 },
      };
      fetchMock.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockResponse) });

      const result = await provider.getTokenPrices({
        tokens: ["ethereum:0x1234"],
      });
      expect(JSON.parse(result)).toEqual(mockResponse);
    });

    it("should handle API errors gracefully", async () => {
      fetchMock.mockResolvedValue({ ok: false, status: 404 });
      const result = await provider.getTokenPrices({
        tokens: ["ethereum:0x1234"],
      });
      expect(result).toContain("Error fetching token prices");
    });
  });

  describe("getProtocol", () => {
    it("should return protocol information when API call is successful", async () => {
      const mockResponse = { name: "Uniswap", tvl: 1000000 };
      fetchMock.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockResponse) });

      const result = await provider.getProtocol({ protocolId: "uniswap" });
      expect(JSON.parse(result)).toEqual(mockResponse);
    });
  });

  describe("searchProtocols", () => {
    it("should return matching protocols", async () => {
      const mockResponse = [
        { name: "Uniswap", id: "uniswap" },
        { name: "UniswapV3", id: "uniswap-v3" },
      ];
      fetchMock.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(mockResponse) });

      const result = await provider.searchProtocols({ query: "uniswap" });
      expect(JSON.parse(result)).toEqual(mockResponse);
    });
  });
});
