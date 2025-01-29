import { z } from "zod";
import { WalletProvider } from "../wallet_providers/wallet_provider";

import "reflect-metadata";

/**
 * Parameters for the create action decorator
 */
export interface CreateActionDecoratorParams {
  /**
   * The name of the action
   */
  name: string;

  /**
   * The description of the action
   */
  description: string;

  /**
   * The schema of the action
   */
  schema: z.ZodSchema;
}

/**
 * Metadata key for the action decorator
 */
export const ACTION_DECORATOR_KEY = Symbol("agentkit:action");

/**
 * Metadata for AgentKit actions
 */
export interface ActionMetadata {
  /**
   * The name of the action
   */
  name: string;

  /**
   * The description of the action
   */
  description: string;

  /**
   * The schema of the action
   */
  schema: z.ZodSchema;

  /**
   * The function to invoke the action
   */
  invoke: Function;

  /**
   * The wallet provider to use for the action
   */
  walletProvider: boolean;
}

/**
 * A map of action names to their metadata
 */
export type StoredActionMetadata = Map<string, ActionMetadata>;

/**
 * Decorator to embed metadata on class methods to indicate they are actions accessible to the agent
 *
 * @param params - The parameters for the action decorator
 * @returns A decorator function
 *
 * @example
 * ```typescript
 * class MyActionProvider extends ActionProvider {
 *   @CreateAction({ name: "my_action", description: "My action", schema: myActionSchema })
 *   public myAction(args: z.infer<typeof myActionSchema>) {
 *     // ...
 *   }
 * }
 * ```
 */
export function CreateAction(params: CreateActionDecoratorParams) {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const existingMetadata: StoredActionMetadata =
      Reflect.getMetadata(ACTION_DECORATOR_KEY, target.constructor) || new Map();

    const { isWalletProvider } = validateActionMethodArguments(target, propertyKey);

    const metaData: ActionMetadata = {
      name: params.name,
      description: params.description,
      schema: params.schema,
      invoke: descriptor.value,
      walletProvider: isWalletProvider,
    };

    existingMetadata.set(propertyKey, metaData);

    Reflect.defineMetadata(ACTION_DECORATOR_KEY, existingMetadata, target.constructor);

    return target;
  };
}

function validateActionMethodArguments(
  target: Object,
  propertyKey: string,
): {
  isWalletProvider: boolean;
} {
  const className = target instanceof Object ? target.constructor.name : undefined;

  const params = Reflect.getMetadata("design:paramtypes", target, propertyKey);

  if (params == null) {
    throw new Error(
      `Failed to get parameters for action method ${propertyKey} on class ${className}`,
    );
  }

  if (params.length > 2) {
    throw new Error(
      `Action method ${propertyKey} on class ${className} has more than 2 parameters`,
    );
  }

  const walletProviderParam = params.find(param => {
    if (!param || !param.prototype) {
      return false;
    }

    if (param === WalletProvider) return true;
    return param.prototype instanceof WalletProvider;
  });

  return {
    isWalletProvider: !!walletProviderParam,
  };
}
