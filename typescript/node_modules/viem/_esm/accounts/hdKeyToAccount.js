import { toHex } from '../utils/encoding/toHex.js';
import { privateKeyToAccount, } from './privateKeyToAccount.js';
/**
 * @description Creates an Account from a HD Key.
 *
 * @returns A HD Account.
 */
export function hdKeyToAccount(hdKey_, { accountIndex = 0, addressIndex = 0, changeIndex = 0, path, ...options } = {}) {
    const hdKey = hdKey_.derive(path || `m/44'/60'/${accountIndex}'/${changeIndex}/${addressIndex}`);
    const account = privateKeyToAccount(toHex(hdKey.privateKey), options);
    return {
        ...account,
        getHdKey: () => hdKey,
        source: 'hd',
    };
}
//# sourceMappingURL=hdKeyToAccount.js.map