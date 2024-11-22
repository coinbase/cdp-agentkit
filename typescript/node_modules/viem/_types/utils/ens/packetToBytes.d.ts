import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray } from '../../types/misc.js';
import { type StringToBytesErrorType } from '../encoding/toBytes.js';
import { type EncodeLabelhashErrorType } from './encodeLabelhash.js';
import { type LabelhashErrorType } from './labelhash.js';
export type PacketToBytesErrorType = EncodeLabelhashErrorType | LabelhashErrorType | StringToBytesErrorType | ErrorType;
export declare function packetToBytes(packet: string): ByteArray;
//# sourceMappingURL=packetToBytes.d.ts.map