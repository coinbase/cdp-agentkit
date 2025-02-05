import { GraphQLClient, gql } from "graphql-request";
import { getAccountOutflowQuery } from "./queries";
import { BASE_GRAPH_ENDPOINT } from "./endpoints";
import { SuperfluidAccountResponse } from "./types";

const client = new GraphQLClient(BASE_GRAPH_ENDPOINT);

/**
 *
 * @param userId
 */
export async function getAccountOutflow(
  userId: string,
): Promise<SuperfluidAccountResponse | undefined> {
  try {
    const variables = { id: userId };
    const data = await client.request<SuperfluidAccountResponse>(getAccountOutflowQuery, variables);
    return data;
  } catch (error) {
    console.error("Error fetching account data:", error);
    return undefined;
  }
}
