// Offchain verification mimics https://github.com/daimo-eth/p256-verifier/blob/607d3ec8377a3f59d65eca60d87dee8485d2ebcc/src/WebAuthn.sol#L136-L168
import { secp256r1 } from '@noble/curves/p256';
import { concatBytes, utf8ToBytes } from '@noble/hashes/utils';
import { parsePublicKey } from './publicKey.js';
import { parseSignature } from './sign.js';
import { base64UrlToBytes, bytesToHex, hexToBytes } from './utils.js';
/**
 * Verifies a signature using the credential public key and the hash which was signed.
 *
 * @example
 * ```ts
 * import { sign, verify } from 'webauthn-p256'
 * import { credential } from './credential'
 *
 * const hash = '0x...'
 * const signature = await sign({ hash, credentialId: credential.id })
 * const valid = await verify({ hash, publicKey, signature })
 * ```
 */
export async function verify(parameters) {
    const { hash, webauthn } = parameters;
    const { authenticatorData, challengeIndex, clientDataJSON, typeIndex, userVerificationRequired, } = webauthn;
    const authenticatorDataBytes = hexToBytes(authenticatorData);
    // Check length of `authenticatorData`.
    if (authenticatorDataBytes.length < 37)
        return false;
    const flag = authenticatorDataBytes[32];
    // Verify that the UP bit of the flags in authData is set.
    if ((flag & 0x01) !== 0x01)
        return false;
    // If user verification was determined to be required, verify that
    // the UV bit of the flags in authData is set. Otherwise, ignore the
    // value of the UV flag.
    if (userVerificationRequired && (flag & 0x04) !== 0x04)
        return false;
    // If the BE bit of the flags in authData is not set, verify that
    // the BS bit is not set.
    if ((flag & 0x08) !== 0x08 && (flag & 0x10) === 0x10)
        return false;
    // Check that response is for an authentication assertion
    const type = '"type":"webauthn.get"';
    if (type !== clientDataJSON.slice(Number(typeIndex), type.length + 1))
        return false;
    // Check that hash is in the clientDataJSON.
    const match = clientDataJSON
        .slice(Number(challengeIndex))
        .match(/^"challenge":"(.*?)"/);
    if (!match)
        return false;
    // Validate the challenge in the clientDataJSON.
    const [_, challenge] = match;
    if (bytesToHex(base64UrlToBytes(challenge)) !== hash)
        return false;
    const clientDataJSONHash = new Uint8Array(await crypto.subtle.digest('SHA-256', utf8ToBytes(clientDataJSON)));
    const messageHash = new Uint8Array(await crypto.subtle.digest('SHA-256', concatBytes(hexToBytes(authenticatorData), clientDataJSONHash)));
    const publicKey = parsePublicKey(parameters.publicKey);
    const signature = parseSignature(parameters.signature);
    const recovered_0 = new secp256r1.Signature(signature.r, signature.s)
        .addRecoveryBit(0)
        .recoverPublicKey(messageHash);
    const recovered_1 = new secp256r1.Signature(signature.r, signature.s)
        .addRecoveryBit(1)
        .recoverPublicKey(messageHash);
    return ((recovered_0.x === publicKey.x && recovered_0.y === publicKey.y) ||
        (recovered_1.x === publicKey.x && recovered_1.y === publicKey.y));
}
//# sourceMappingURL=verify.js.map