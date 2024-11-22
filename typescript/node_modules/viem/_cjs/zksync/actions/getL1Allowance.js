"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getL1Allowance = getL1Allowance;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const abis_js_1 = require("../../constants/abis.js");
async function getL1Allowance(client, parameters) {
    const { token, bridgeAddress, blockTag, account: account_ } = parameters;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : client.account;
    return await (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.erc20Abi,
        address: token,
        functionName: 'allowance',
        args: [account.address, bridgeAddress],
        blockTag: blockTag,
    });
}
//# sourceMappingURL=getL1Allowance.js.map