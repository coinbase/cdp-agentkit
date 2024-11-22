"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getL1TokenBalance = getL1TokenBalance;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const index_js_1 = require("../../actions/index.js");
const abis_js_1 = require("../../constants/abis.js");
const token_is_eth_js_1 = require("../errors/token-is-eth.js");
const isEth_js_1 = require("../utils/isEth.js");
async function getL1TokenBalance(client, parameters) {
    const { account: account_ = client.account, blockTag, blockNumber, token, } = parameters;
    if ((0, isEth_js_1.isEth)(token))
        throw new token_is_eth_js_1.TokenIsEthError();
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : client.account;
    return await (0, index_js_1.readContract)(client, {
        abi: abis_js_1.erc20Abi,
        address: token,
        functionName: 'balanceOf',
        args: [account.address],
        blockNumber: blockNumber,
        blockTag: blockTag,
    });
}
//# sourceMappingURL=getL1TokenBalance.js.map