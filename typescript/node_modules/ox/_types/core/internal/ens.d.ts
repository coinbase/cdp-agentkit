import { Bytes } from '../../index.js';
import * as Ens from '../Ens.js';
import type * as Errors from '../Errors.js';
import * as Hex from '../Hex.js';
/**
 * @internal
 * Encodes a [DNS packet](https://docs.ens.domains/resolution/names#dns) into a ByteArray containing a UDP payload.
 */
export declare function packetToBytes(packet: string): Bytes.Bytes;
export declare namespace packetToBytes {
    type ErrorType = wrapLabelhash.ErrorType | Ens.labelhash.ErrorType | Bytes.fromString.ErrorType | Errors.GlobalErrorType;
}
/** @internal */
export declare function wrapLabelhash(hash: Hex.Hex): `[${string}]`;
export declare namespace wrapLabelhash {
    type ErrorType = Errors.GlobalErrorType;
}
/** @internal */
export declare function unwrapLabelhash(label: string): Hex.Hex | null;
export declare namespace unwrapLabelhash {
    type ErrorType = Hex.validate.ErrorType | Errors.GlobalErrorType;
}
//# sourceMappingURL=ens.d.ts.map