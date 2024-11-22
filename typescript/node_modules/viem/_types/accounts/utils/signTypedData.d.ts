import type { TypedData } from 'abitype';
import type { Hex } from '../../types/misc.js';
import type { TypedDataDefinition } from '../../types/typedData.js';
import { type HashTypedDataErrorType } from '../../utils/signature/hashTypedData.js';
import type { ErrorType } from '../../errors/utils.js';
import { type SignErrorType } from './sign.js';
export type SignTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData> = TypedDataDefinition<typedData, primaryType> & {
    /** The private key to sign with. */
    privateKey: Hex;
};
export type SignTypedDataReturnType = Hex;
export type SignTypedDataErrorType = HashTypedDataErrorType | SignErrorType | ErrorType;
/**
 * @description Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191):
 * `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`.
 *
 * @returns The signature.
 */
export declare function signTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(parameters: SignTypedDataParameters<typedData, primaryType>): Promise<SignTypedDataReturnType>;
//# sourceMappingURL=signTypedData.d.ts.map