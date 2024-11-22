"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserOperation = sendUserOperation;
const parseAccount_js_1 = require("../../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../../errors/account.js");
const getAction_js_1 = require("../../../utils/getAction.js");
const getUserOperationError_js_1 = require("../../utils/errors/getUserOperationError.js");
const userOperationRequest_js_1 = require("../../utils/formatters/userOperationRequest.js");
const prepareUserOperation_js_1 = require("./prepareUserOperation.js");
async function sendUserOperation(client, parameters) {
    const { account: account_ = client.account, entryPointAddress } = parameters;
    if (!account_ && !parameters.sender)
        throw new account_js_1.AccountNotFoundError();
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
    const request = account
        ? await (0, getAction_js_1.getAction)(client, prepareUserOperation_js_1.prepareUserOperation, 'prepareUserOperation')(parameters)
        : parameters;
    const signature = (parameters.signature ||
        (await account?.signUserOperation(request)));
    const rpcParameters = (0, userOperationRequest_js_1.formatUserOperationRequest)({
        ...request,
        signature,
    });
    try {
        return await client.request({
            method: 'eth_sendUserOperation',
            params: [
                rpcParameters,
                (entryPointAddress ?? account?.entryPoint.address),
            ],
        }, { retryCount: 0 });
    }
    catch (error) {
        const calls = parameters.calls;
        throw (0, getUserOperationError_js_1.getUserOperationError)(error, {
            ...request,
            ...(calls ? { calls } : {}),
            signature,
        });
    }
}
//# sourceMappingURL=sendUserOperation.js.map