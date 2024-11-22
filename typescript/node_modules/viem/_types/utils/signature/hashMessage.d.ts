import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex, SignableMessage } from '../../types/misc.js';
import { type Keccak256ErrorType } from '../hash/keccak256.js';
type To = 'hex' | 'bytes';
export type HashMessageReturnType<to extends To> = (to extends 'bytes' ? ByteArray : never) | (to extends 'hex' ? Hex : never);
export type HashMessageErrorType = Keccak256ErrorType | ErrorType;
export declare function hashMessage<to extends To = 'hex'>(message: SignableMessage, to_?: to | undefined): HashMessageReturnType<to>;
export {};
//# sourceMappingURL=hashMessage.d.ts.map