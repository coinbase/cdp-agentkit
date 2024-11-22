import { HashMD } from './_md.js';
export declare class SHA256 extends HashMD<SHA256> {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    G: number;
    H: number;
    constructor();
    protected get(): [number, number, number, number, number, number, number, number];
    protected set(A: number, B: number, C: number, D: number, E: number, F: number, G: number, H: number): void;
    protected process(view: DataView, offset: number): void;
    protected roundClean(): void;
    destroy(): void;
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */
export declare const sha256: {
    (msg: import("./utils.js").Input): Uint8Array;
    outputLen: number;
    blockLen: number;
    create(): import("./utils.js").Hash<SHA256>;
};
/**
 * SHA2-224 hash function
 */
export declare const sha224: {
    (msg: import("./utils.js").Input): Uint8Array;
    outputLen: number;
    blockLen: number;
    create(): import("./utils.js").Hash<SHA256>;
};
//# sourceMappingURL=sha256.d.ts.map