import { CurveFn } from './abstract/bls.js';
/**
 * bn254 (a.k.a. alt_bn128) pairing-friendly curve.
 * Contains G1 / G2 operations and pairings.
 */
export declare const bn254: CurveFn;
/**
 * bn254 weierstrass curve with ECDSA.
 * This is very rare and probably not used anywhere.
 * Instead, you should use G1 / G2, defined above.
 */
export declare const bn254_weierstrass: import("./abstract/weierstrass.js").CurveFn;
//# sourceMappingURL=bn254.d.ts.map