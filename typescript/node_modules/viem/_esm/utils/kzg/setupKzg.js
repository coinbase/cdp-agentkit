import { defineKzg, } from './defineKzg.js';
/**
 * Sets up and returns a KZG interface.
 *
 * @example
 * ```ts
 * import * as cKzg from 'c-kzg'
 * import { setupKzg } from 'viem'
 * import { mainnetTrustedSetupPath } from 'viem/node'
 *
 * const kzg = setupKzg(cKzg, mainnetTrustedSetupPath)
 * ```
 */
export function setupKzg(parameters, path) {
    try {
        parameters.loadTrustedSetup(path);
    }
    catch (e) {
        const error = e;
        if (!error.message.includes('trusted setup is already loaded'))
            throw error;
    }
    return defineKzg(parameters);
}
//# sourceMappingURL=setupKzg.js.map