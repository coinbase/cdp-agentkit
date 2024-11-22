/// <reference types="node" />
interface Network {
    wif: number;
    bip32: {
        public: number;
        private: number;
    };
    messagePrefix?: string;
    bech32?: string;
    pubKeyHash?: number;
    scriptHash?: number;
}
export interface Signer {
    publicKey: Buffer;
    lowR: boolean;
    sign(hash: Buffer, lowR?: boolean): Buffer;
    verify(hash: Buffer, signature: Buffer): boolean;
    signSchnorr(hash: Buffer): Buffer;
    verifySchnorr(hash: Buffer, signature: Buffer): boolean;
}
export interface BIP32Interface extends Signer {
    chainCode: Buffer;
    network: Network;
    depth: number;
    index: number;
    parentFingerprint: number;
    privateKey?: Buffer;
    identifier: Buffer;
    fingerprint: Buffer;
    isNeutered(): boolean;
    neutered(): BIP32Interface;
    toBase58(): string;
    toWIF(): string;
    derive(index: number): BIP32Interface;
    deriveHardened(index: number): BIP32Interface;
    derivePath(path: string): BIP32Interface;
    tweak(t: Buffer): Signer;
}
export interface BIP32API {
    fromSeed(seed: Buffer, network?: Network): BIP32Interface;
    fromBase58(inString: string, network?: Network): BIP32Interface;
    fromPublicKey(publicKey: Buffer, chainCode: Buffer, network?: Network): BIP32Interface;
    fromPrivateKey(privateKey: Buffer, chainCode: Buffer, network?: Network): BIP32Interface;
}
interface XOnlyPointAddTweakResult {
    parity: 1 | 0;
    xOnlyPubkey: Uint8Array;
}
export interface TinySecp256k1Interface {
    isPoint(p: Uint8Array): boolean;
    isPrivate(d: Uint8Array): boolean;
    pointFromScalar(d: Uint8Array, compressed?: boolean): Uint8Array | null;
    pointAddScalar(p: Uint8Array, tweak: Uint8Array, compressed?: boolean): Uint8Array | null;
    privateAdd(d: Uint8Array, tweak: Uint8Array): Uint8Array | null;
    sign(h: Uint8Array, d: Uint8Array, e?: Uint8Array): Uint8Array;
    signSchnorr?(h: Uint8Array, d: Uint8Array, e?: Uint8Array): Uint8Array;
    verify(h: Uint8Array, Q: Uint8Array, signature: Uint8Array, strict?: boolean): boolean;
    verifySchnorr?(h: Uint8Array, Q: Uint8Array, signature: Uint8Array): boolean;
    xOnlyPointAddTweak?(p: Uint8Array, tweak: Uint8Array): XOnlyPointAddTweakResult | null;
    privateNegate?(d: Uint8Array): Uint8Array;
}
export declare function BIP32Factory(ecc: TinySecp256k1Interface): BIP32API;
export {};
