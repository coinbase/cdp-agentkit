import type { Hash } from '../types/misc.js';
import { BaseError } from './base.js';
export type BlockNotFoundErrorType = BlockNotFoundError & {
    name: 'BlockNotFoundError';
};
export declare class BlockNotFoundError extends BaseError {
    constructor({ blockHash, blockNumber, }: {
        blockHash?: Hash | undefined;
        blockNumber?: bigint | undefined;
    });
}
//# sourceMappingURL=block.d.ts.map