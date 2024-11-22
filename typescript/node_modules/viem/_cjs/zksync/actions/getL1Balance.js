"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getL1Balance = getL1Balance;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const getBalance_js_1 = require("../../actions/public/getBalance.js");
const address_js_1 = require("../constants/address.js");
const isEth_js_1 = require("../utils/isEth.js");
const getL1TokenBalance_js_1 = require("./getL1TokenBalance.js");
async function getL1Balance(client, ...[parameters = {}]) {
    const { account: account_ = client.account, blockNumber, blockTag, token = address_js_1.legacyEthAddress, } = parameters;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
    if ((0, isEth_js_1.isEth)(token))
        return await (0, getBalance_js_1.getBalance)(client, {
            address: account.address,
            blockNumber,
            blockTag,
        });
    return await (0, getL1TokenBalance_js_1.getL1TokenBalance)(client, {
        ...parameters,
    });
}
//# sourceMappingURL=getL1Balance.js.map