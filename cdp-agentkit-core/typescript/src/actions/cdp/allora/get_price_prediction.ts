import { AlloraAction } from "./allora_action";
import {
  AlloraAPIClient,
  PricePredictionTimeframe,
  PricePredictionToken,
} from "@alloralabs/allora-sdk";
import { z } from "zod";

const GET_PRICE_PREDICTION_PROMPT = `
This tool will get the future price prediction for a given crypto asset from Allora Network.
It takes the crypto asset and timeframe as inputs.
`;

/**
 * Input schema for get price prediction action.
 */
export const GetPricePredictionInput = z
  .object({
    asset: z.string().describe("The crypto asset to get the price prediction for, e.g. 'BTC'"),
    timeframe: z
      .string()
      .describe("The timeframe to get the price prediction for, e.g. '5m' or '8h'"),
  })
  .strip()
  .describe("Instructions for getting the price prediction");

/**
 * Gets the future price prediction for a given crypto asset from Allora Network.
 *
 * @param client - The Allora API client.
 * @param args - The input arguments for the action.
 * @returns A message containing the price prediction.
 */
export async function getPricePrediction(
  client: AlloraAPIClient,
  args: z.infer<typeof GetPricePredictionInput>,
): Promise<string> {
  const getPricePredictionArgs = {
    asset: args.asset,
    timeframe: args.timeframe,
  };

  try {
    const asset = getPricePredictionArgs.asset as PricePredictionToken;
    const timeframe = getPricePredictionArgs.timeframe as PricePredictionTimeframe;

    const pricePrediction = await client.getPricePrediction(asset, timeframe);

    return `The future price prediction for ${asset} in ${timeframe} is ${pricePrediction.inference_data.network_inference_normalized}`;
  } catch (error) {
    return `Error getting price prediction: ${error}`;
  }
}

/**
 * Get price prediction action.
 */
export class GetPricePredictionAction implements AlloraAction<typeof GetPricePredictionInput> {
  public name = "get_price_prediction";
  public description = GET_PRICE_PREDICTION_PROMPT;
  public argsSchema = GetPricePredictionInput;
  public func = getPricePrediction;
}
