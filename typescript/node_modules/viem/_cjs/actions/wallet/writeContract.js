"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeContract = writeContract;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../errors/account.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const getAction_js_1 = require("../../utils/getAction.js");
const sendTransaction_js_1 = require("./sendTransaction.js");
async function writeContract(client, parameters) {
    const { abi, account: account_ = client.account, address, args, dataSuffix, functionName, ...request } = parameters;
    if (typeof account_ === 'undefined')
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/contract/writeContract',
        });
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : null;
    const data = (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi,
        args,
        functionName,
    });
    try {
        return await (0, getAction_js_1.getAction)(client, sendTransaction_js_1.sendTransaction, 'sendTransaction')({
            data: `${data}${dataSuffix ? dataSuffix.replace('0x', '') : ''}`,
            to: address,
            account,
            ...request,
        });
    }
    catch (error) {
        throw (0, getContractError_js_1.getContractError)(error, {
            abi,
            address,
            args,
            docsPath: '/docs/contract/writeContract',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=writeContract.js.map