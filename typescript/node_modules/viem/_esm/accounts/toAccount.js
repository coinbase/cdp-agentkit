// TODO(v3): Rename to `toLocalAccount` + add `source` property to define source (privateKey, mnemonic, hdKey, etc).
import { InvalidAddressError, } from '../errors/address.js';
import { isAddress, } from '../utils/address/isAddress.js';
/**
 * @description Creates an Account from a custom signing implementation.
 *
 * @returns A Local Account.
 */
export function toAccount(source) {
    if (typeof source === 'string') {
        if (!isAddress(source, { strict: false }))
            throw new InvalidAddressError({ address: source });
        return {
            address: source,
            type: 'json-rpc',
        };
    }
    if (!isAddress(source.address, { strict: false }))
        throw new InvalidAddressError({ address: source.address });
    return {
        address: source.address,
        nonceManager: source.nonceManager,
        sign: source.sign,
        experimental_signAuthorization: source.experimental_signAuthorization,
        signMessage: source.signMessage,
        signTransaction: source.signTransaction,
        signTypedData: source.signTypedData,
        source: 'custom',
        type: 'local',
    };
}
//# sourceMappingURL=toAccount.js.map