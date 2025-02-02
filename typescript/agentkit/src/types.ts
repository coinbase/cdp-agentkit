import { z } from "zod";

/**
 * Represents an action that can be performed by the agent
 */
export interface Action {
  name: string;
  description: string;
  schema: z.ZodSchema;
  invoke: (args: any) => Promise<any>;
}