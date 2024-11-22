import { hashTypedData } from './hashTypedData.js';
import { recoverAddress, } from './recoverAddress.js';
export async function recoverTypedDataAddress(parameters) {
    const { domain, message, primaryType, signature, types } = parameters;
    return recoverAddress({
        hash: hashTypedData({
            domain,
            message,
            primaryType,
            types,
        }),
        signature,
    });
}
//# sourceMappingURL=recoverTypedDataAddress.js.map