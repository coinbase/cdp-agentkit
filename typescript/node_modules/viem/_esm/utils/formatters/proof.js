import { hexToNumber } from '../index.js';
function formatStorageProof(storageProof) {
    return storageProof.map((proof) => ({
        ...proof,
        value: BigInt(proof.value),
    }));
}
export function formatProof(proof) {
    return {
        ...proof,
        balance: proof.balance ? BigInt(proof.balance) : undefined,
        nonce: proof.nonce ? hexToNumber(proof.nonce) : undefined,
        storageProof: proof.storageProof
            ? formatStorageProof(proof.storageProof)
            : undefined,
    };
}
//# sourceMappingURL=proof.js.map