import type { TypedData } from 'abitype';
import type { ByteArray, Hex, Signature } from '../../../types/misc.js';
import type { TypedDataDefinition } from '../../../types/typedData.js';
import { type IsHexErrorType } from '../../../utils/data/isHex.js';
export type WrapTypedDataSignatureParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData, primaryTypes = typedData extends TypedData ? keyof typedData : string> = TypedDataDefinition<typedData, primaryType, primaryTypes> & {
    signature: Hex | ByteArray | Signature;
};
export type WrapTypedDataSignatureReturnType = Hex;
export type WrapTypedDataSignatureErrorType = IsHexErrorType;
/**
 * Wraps a typed data signature for ERC-7739.
 *
 * @example
 * ```ts
 * const signature = wrapTypedDataSignature({
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   types: {
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' },
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 *   signature: '0x...',
 * })
 * ```
 */
export declare function wrapTypedDataSignature(parameters: WrapTypedDataSignatureParameters): WrapTypedDataSignatureReturnType;
//# sourceMappingURL=wrapTypedDataSignature.d.ts.map