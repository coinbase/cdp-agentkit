import { recoverAddress, } from '../../../utils/signature/recoverAddress.js';
import { hashAuthorization, } from './hashAuthorization.js';
export async function recoverAuthorizationAddress(parameters) {
    const { authorization, signature } = parameters;
    return recoverAddress({
        hash: hashAuthorization(authorization),
        signature: (signature ?? authorization),
    });
}
//# sourceMappingURL=recoverAuthorizationAddress.js.map