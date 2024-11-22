import { keccak_256 } from '@noble/hashes/sha3';
import { toBytes } from '@noble/hashes/utils';
import { parseCredentialPublicKey, serializePublicKey } from './publicKey.js';
import { base64UrlToBytes } from './utils.js';
// Challenge for credential creation – random 16 bytes.
export const createChallenge = Uint8Array.from([
    105, 171, 180, 181, 160, 222, 75, 198, 42, 42, 32, 31, 141, 37, 186, 233,
]);
/**
 * Creates a new credential, which can be stored and later used for signing.
 *
 * @example
 * ```ts
 * const credential = await createCredential({ name: 'Example' })
 * ```
 */
export async function createCredential(parameters) {
    const { createFn = window.navigator.credentials.create.bind(window.navigator.credentials), ...rest } = parameters;
    const options = getCredentialCreationOptions(rest);
    try {
        const credential = (await createFn(options));
        if (!credential)
            throw new Error('credential creation failed.');
        const publicKey = await parseCredentialPublicKey(new Uint8Array(credential.response.getPublicKey()));
        return {
            id: credential.id,
            publicKey: serializePublicKey(publicKey, { compressed: true }),
            raw: credential,
        };
    }
    catch (error) {
        throw new Error('credential creation failed.', { cause: error });
    }
}
/**
 * Returns the creation options for a P256 WebAuthn Credential with a Passkey authenticator.
 *
 * @example
 * ```ts
 * const options = getCredentialCreationOptions({ name: 'Example' })
 * const credentials = window.navigator.credentials.create(options)
 * ```
 */
export function getCredentialCreationOptions(parameters) {
    const { attestation = 'none', authenticatorSelection = {
        authenticatorAttachment: 'platform',
        residentKey: 'preferred',
        requireResidentKey: false,
        userVerification: 'required',
    }, challenge = createChallenge, excludeCredentialIds, name: name_, rp = {
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
                        id: base64UrlToBytes(id),
                        type: 'public-key',
                    })),
                }
                : {}),
            pubKeyCredParams: [
                {
                    type: 'public-key',
                    alg: -7, // p256
                },
            ],
            rp,
            user: {
                id: user?.id ?? keccak_256(toBytes(name)),
                name,
                displayName: user?.displayName ?? name,
            },
            extensions,
        },
    };
}
//# sourceMappingURL=credential.js.map