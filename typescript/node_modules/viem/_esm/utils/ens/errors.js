import { panicReasons } from '../../constants/solidity.js';
import { BaseError } from '../../errors/base.js';
import { ContractFunctionRevertedError } from '../../errors/contract.js';
/*
 * @description Checks if error is a valid null result UniversalResolver error
 */
export function isNullUniversalResolverError(err, callType) {
    if (!(err instanceof BaseError))
        return false;
    const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
    if (!(cause instanceof ContractFunctionRevertedError))
        return false;
    if (cause.data?.errorName === 'ResolverNotFound')
        return true;
    if (cause.data?.errorName === 'ResolverWildcardNotSupported')
        return true;
    if (cause.data?.errorName === 'ResolverNotContract')
        return true;
    if (cause.data?.errorName === 'ResolverError')
        return true;
    if (cause.data?.errorName === 'HttpError')
        return true;
    // Backwards compatibility for older UniversalResolver contracts
    if (cause.reason?.includes('Wildcard on non-extended resolvers is not supported'))
        return true;
    // No primary name set for address.
    if (callType === 'reverse' && cause.reason === panicReasons[50])
        return true;
    return false;
}
//# sourceMappingURL=errors.js.map