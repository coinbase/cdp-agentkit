"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialCreationOptions = exports.createCredential = exports.createChallenge = void 0;
const sha3_1 = require("@noble/hashes/sha3");
const utils_1 = require("@noble/hashes/utils");
const publicKey_js_1 = require("./publicKey.js");
const utils_js_1 = require("./utils.js");
exports.createChallenge = Uint8Array.from([
    105, 171, 180, 181, 160, 222, 75, 198, 42, 42, 32, 31, 141, 37, 186, 233,
]);
async function createCredential(parameters) {
    const { createFn = window.navigator.credentials.create.bind(window.navigator.credentials), ...rest } = parameters;
    const options = getCredentialCreationOptions(rest);
    try {
        const credential = (await createFn(options));
        if (!credential)
            throw new Error('credential creation failed.');
        const publicKey = await (0, publicKey_js_1.parseCredentialPublicKey)(new Uint8Array(credential.response.getPublicKey()));
        return {
            id: credential.id,
            publicKey: (0, publicKey_js_1.serializePublicKey)(publicKey, { compressed: true }),
            raw: credential,
        };
    }
    catch (error) {
        throw new Error('credential creation failed.', { cause: error });
    }
}
exports.createCredential = createCredential;
function getCredentialCreationOptions(parameters) {
    const { attestation = 'none', authenticatorSelection = {
        authenticatorAttachment: 'platform',
        residentKey: 'preferred',
        requireResidentKey: false,
        userVerification: 'required',
    }, challenge = exports.createChallenge, excludeCredentialIds, name: name_, rp = {
        id: window.location.hostname,
        name: window.document.title,
    }, user, extensions, } = parameters;
    const name = (user?.name ?? name_);
    return {
        publicKey: {
            attestation,
            authenticatorSelection,
            challenge,
            ...(excludeCredentialIds
                ? {
                    excludeCredentials: excludeCredentialIds?.map((id) => ({
                        id: (0, utils_js_1.base64UrlToBytes)(id),
                        type: 'public-key',
                    })),
                }
                : {}),
            pubKeyCredParams: [
                {
                    type: 'public-key',
                    alg: -7,
                },
            ],
            rp,
            user: {
                id: user?.id ?? (0, sha3_1.keccak_256)((0, utils_1.toBytes)(name)),
                name,
                displayName: user?.displayName ?? name,
            },
            extensions,
        },
    };
}
exports.getCredentialCreationOptions = getCredentialCreationOptions;
//# sourceMappingURL=credential.js.map