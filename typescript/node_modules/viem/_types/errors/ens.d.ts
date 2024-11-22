import { BaseError } from './base.js';
export type EnsAvatarInvalidMetadataErrorType = EnsAvatarInvalidMetadataError & {
    name: 'EnsAvatarInvalidMetadataError';
};
export declare class EnsAvatarInvalidMetadataError extends BaseError {
    constructor({ data }: {
        data: any;
    });
}
export type EnsAvatarInvalidNftUriErrorType = EnsAvatarInvalidNftUriError & {
    name: 'EnsAvatarInvalidNftUriError';
};
export declare class EnsAvatarInvalidNftUriError extends BaseError {
    constructor({ reason }: {
        reason: string;
    });
}
export type EnsAvatarUriResolutionErrorType = EnsAvatarUriResolutionError & {
    name: 'EnsAvatarUriResolutionError';
};
export declare class EnsAvatarUriResolutionError extends BaseError {
    constructor({ uri }: {
        uri: string;
    });
}
export type EnsAvatarUnsupportedNamespaceErrorType = EnsAvatarUnsupportedNamespaceError & {
    name: 'EnsAvatarUnsupportedNamespaceError';
};
export declare class EnsAvatarUnsupportedNamespaceError extends BaseError {
    constructor({ namespace }: {
        namespace: string;
    });
}
//# sourceMappingURL=ens.d.ts.map