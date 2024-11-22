import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex, Signature } from '../../types/misc.js';
import { type IsHexErrorType } from '../data/isHex.js';
import { type HexToNumberErrorType } from '../encoding/fromHex.js';
export type RecoverPublicKeyParameters = {
    hash: Hex | ByteArray;
    signature: Hex | ByteArray | Signature;
};
export type RecoverPublicKeyReturnType = Hex;
export type RecoverPublicKeyErrorType = HexToNumberErrorType | IsHexErrorType | ErrorType;
export declare function recoverPublicKey({ hash, signature, }: RecoverPublicKeyParameters): Promise<RecoverPublicKeyReturnType>;
//# sourceMappingURL=recoverPublicKey.d.ts.map