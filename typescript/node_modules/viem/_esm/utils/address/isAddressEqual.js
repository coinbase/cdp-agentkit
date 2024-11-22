import { InvalidAddressError, } from '../../errors/address.js';
import { isAddress } from './isAddress.js';
export function isAddressEqual(a, b) {
    if (!isAddress(a, { strict: false }))
        throw new InvalidAddressError({ address: a });
    if (!isAddress(b, { strict: false }))
        throw new InvalidAddressError({ address: b });
    return a.toLowerCase() === b.toLowerCase();
}
//# sourceMappingURL=isAddressEqual.js.map