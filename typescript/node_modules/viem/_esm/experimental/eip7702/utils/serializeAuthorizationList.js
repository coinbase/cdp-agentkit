import { toHex } from '../../../utils/encoding/toHex.js';
import { toYParitySignatureArray } from '../../../utils/transaction/serializeTransaction.js';
/*
 * Serializes an EIP-7702 authorization list.
 */
export function serializeAuthorizationList(authorizationList) {
    if (!authorizationList || authorizationList.length === 0)
        return [];
    const serializedAuthorizationList = [];
    for (const authorization of authorizationList) {
        const { contractAddress, chainId, nonce, ...signature } = authorization;
        serializedAuthorizationList.push([
            chainId ? toHex(chainId) : '0x',
            contractAddress,
            nonce ? toHex(nonce) : '0x',
            ...toYParitySignatureArray({}, signature),
        ]);
    }
    return serializedAuthorizationList;
}
//# sourceMappingURL=serializeAuthorizationList.js.map