"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsAvatarUnsupportedNamespaceError = exports.EnsAvatarUriResolutionError = exports.EnsAvatarInvalidNftUriError = exports.EnsAvatarInvalidMetadataError = void 0;
const base_js_1 = require("./base.js");
class EnsAvatarInvalidMetadataError extends base_js_1.BaseError {
    constructor({ data }) {
        super('Unable to extract image from metadata. The metadata may be malformed or invalid.', {
            metaMessages: [
                '- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.',
                '',
                `Provided data: ${JSON.stringify(data)}`,
            ],
            name: 'EnsAvatarInvalidMetadataError',
        });
    }
}
exports.EnsAvatarInvalidMetadataError = EnsAvatarInvalidMetadataError;
class EnsAvatarInvalidNftUriError extends base_js_1.BaseError {
    constructor({ reason }) {
        super(`ENS NFT avatar URI is invalid. ${reason}`, {
            name: 'EnsAvatarInvalidNftUriError',
        });
    }
}
exports.EnsAvatarInvalidNftUriError = EnsAvatarInvalidNftUriError;
class EnsAvatarUriResolutionError extends base_js_1.BaseError {
    constructor({ uri }) {
        super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: 'EnsAvatarUriResolutionError' });
    }
}
exports.EnsAvatarUriResolutionError = EnsAvatarUriResolutionError;
class EnsAvatarUnsupportedNamespaceError extends base_js_1.BaseError {
    constructor({ namespace }) {
        super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: 'EnsAvatarUnsupportedNamespaceError' });
    }
}
exports.EnsAvatarUnsupportedNamespaceError = EnsAvatarUnsupportedNamespaceError;
//# sourceMappingURL=ens.js.map