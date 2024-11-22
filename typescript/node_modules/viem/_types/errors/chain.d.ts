import type { Chain } from '../types/chain.js';
import { BaseError } from './base.js';
export type ChainDoesNotSupportContractErrorType = ChainDoesNotSupportContract & {
    name: 'ChainDoesNotSupportContract';
};
export declare class ChainDoesNotSupportContract extends BaseError {
    constructor({ blockNumber, chain, contract, }: {
        blockNumber?: bigint | undefined;
        chain: Chain;
        contract: {
            name: string;
            blockCreated?: number | undefined;
        };
    });
}
export type ChainMismatchErrorType = ChainMismatchError & {
    name: 'ChainMismatchError';
};
export declare class ChainMismatchError extends BaseError {
    constructor({ chain, currentChainId, }: {
        chain: Chain;
        currentChainId: number;
    });
}
export type ChainNotFoundErrorType = ChainNotFoundError & {
    name: 'ChainNotFoundError';
};
export declare class ChainNotFoundError extends BaseError {
    constructor();
}
export type ClientChainNotConfiguredErrorType = ClientChainNotConfiguredError & {
    name: 'ClientChainNotConfiguredError';
};
export declare class ClientChainNotConfiguredError extends BaseError {
    constructor();
}
export type InvalidChainIdErrorType = InvalidChainIdError & {
    name: 'InvalidChainIdError';
};
export declare class InvalidChainIdError extends BaseError {
    constructor({ chainId }: {
        chainId?: number | undefined;
    });
}
//# sourceMappingURL=chain.d.ts.map