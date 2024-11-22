import { ethAddressInContracts, l2BaseTokenAddress, legacyEthAddress, } from '../constants/address.js';
export function isEth(token) {
    return (token.localeCompare(legacyEthAddress, undefined, {
        sensitivity: 'accent',
    }) === 0 ||
        token.localeCompare(l2BaseTokenAddress, undefined, {
            sensitivity: 'accent',
        }) === 0 ||
        token.localeCompare(ethAddressInContracts, undefined, {
            sensitivity: 'accent',
        }) === 0);
}
//# sourceMappingURL=isEth.js.map