import type { ErrorType } from '../../errors/utils.js';
import type { Hex, SignableMessage } from '../../types/misc.js';
import { type ConcatErrorType } from '../data/concat.js';
import { type BytesToHexErrorType, type StringToHexErrorType } from '../encoding/toHex.js';
export type ToPrefixedMessageErrorType = ConcatErrorType | StringToHexErrorType | BytesToHexErrorType | ErrorType;
export declare function toPrefixedMessage(message_: SignableMessage): Hex;
//# sourceMappingURL=toPrefixedMessage.d.ts.map