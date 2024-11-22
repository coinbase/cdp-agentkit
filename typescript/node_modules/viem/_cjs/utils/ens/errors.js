"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullUniversalResolverError = isNullUniversalResolverError;
const solidity_js_1 = require("../../constants/solidity.js");
const base_js_1 = require("../../errors/base.js");
const contract_js_1 = require("../../errors/contract.js");
function isNullUniversalResolverError(err, callType) {
    if (!(err instanceof base_js_1.BaseError))
        return false;
    const cause = err.walk((e) => e instanceof contract_js_1.ContractFunctionRevertedError);
    if (!(cause instanceof contract_js_1.ContractFunctionRevertedError))
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
    if (cause.reason?.includes('Wildcard on non-extended resolvers is not supported'))
        return true;
    if (callType === 'reverse' && cause.reason === solidity_js_1.panicReasons[50])
        return true;
    return false;
}
//# sourceMappingURL=errors.js.map