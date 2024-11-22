import { type Abi } from 'abitype';
import type { Prettify } from '../../types/utils.js';
import type { EntryPointVersion } from '../types/entryPointVersion.js';
import type { SmartAccount, SmartAccountImplementation } from './types.js';
export type ToSmartAccountParameters<entryPointAbi extends Abi | readonly unknown[] = Abi, entryPointVersion extends EntryPointVersion = EntryPointVersion, extend extends object = object> = SmartAccountImplementation<entryPointAbi, entryPointVersion, extend>;
export type ToSmartAccountReturnType<implementation extends SmartAccountImplementation = SmartAccountImplementation> = Prettify<SmartAccount<implementation>>;
/**
 * @description Creates a Smart Account with a provided account implementation.
 *
 * @param parameters - {@link ToSmartAccountParameters}
 * @returns A Smart Account. {@link ToSmartAccountReturnType}
 */
export declare function toSmartAccount<implementation extends SmartAccountImplementation>(implementation: implementation): Promise<ToSmartAccountReturnType<implementation>>;
//# sourceMappingURL=toSmartAccount.d.ts.map