import {
  AlloraAPIClient,
  PricePredictionTimeframe,
  PricePredictionToken,
  AlloraInference,
} from "@alloralabs/allora-sdk";
import {
  getPricePrediction,
  GetPricePredictionInput,
} from "../actions/cdp/allora/get_price_prediction";

describe("Get Price Prediction Input", () => {
  it("should successfully parse valid input", () => {
    const validInput = {
      asset: "BTC",
      timeframe: "5m",
    };

    const result = GetPricePredictionInput.safeParse(validInput);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validInput);
  });

  it("should fail parsing empty input", () => {
    const emptyInput = {};
    const result = GetPricePredictionInput.safeParse(emptyInput);

    expect(result.success).toBe(false);
  });
});

describe("Get Price Prediction Action", () => {
  let mockAlloraClient: jest.Mocked<AlloraAPIClient>;

  beforeEach(() => {
    mockAlloraClient = {
      getPricePrediction: jest.fn(),
    } as unknown as jest.Mocked<AlloraAPIClient>;
  });

  it("should successfully get price prediction", async () => {
    const args = {
      asset: "BTC",
      timeframe: "5m",
    };
    const mockPrediction = {
      signature: "mockSignature",
      inference_data: { network_inference_normalized: "45000.00" },
    };

    mockAlloraClient.getPricePrediction.mockResolvedValue(mockPrediction as AlloraInference);

    const response = await getPricePrediction(mockAlloraClient, args);

    expect(mockAlloraClient.getPricePrediction).toHaveBeenCalledWith(
      args.asset as PricePredictionToken,
      args.timeframe as PricePredictionTimeframe,
    );
    expect(response).toBe(
      `The future price prediction for BTC in 5m is ${mockPrediction.inference_data.network_inference_normalized}`,
    );
  });

  it("should handle errors gracefully", async () => {
    const args = {
      asset: "BTC",
      timeframe: "5m",
    };

    const error = new Error("Failed to fetch price prediction");
    mockAlloraClient.getPricePrediction.mockRejectedValue(error);

    const response = await getPricePrediction(mockAlloraClient, args);

    expect(mockAlloraClient.getPricePrediction).toHaveBeenCalled();
    expect(response).toBe(`Error getting price prediction: ${error}`);
  });
});
