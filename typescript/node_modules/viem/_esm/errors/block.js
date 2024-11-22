import { BaseError } from './base.js';
export class BlockNotFoundError extends BaseError {
    constructor({ blockHash, blockNumber, }) {
        let identifier = 'Block';
        if (blockHash)
            identifier = `Block at hash "${blockHash}"`;
        if (blockNumber)
            identifier = `Block at number "${blockNumber}"`;
        super(`${identifier} could not be found.`, { name: 'BlockNotFoundError' });
    }
}
//# sourceMappingURL=block.js.map