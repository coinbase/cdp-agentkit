"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateL1Gas = estimateL1Gas;
const readContract_js_1 = require("../../actions/public/readContract.js");
const prepareTransactionRequest_js_1 = require("../../actions/wallet/prepareTransactionRequest.js");
const getChainContractAddress_js_1 = require("../../utils/chain/getChainContractAddress.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
const serializeTransaction_js_1 = require("../../utils/transaction/serializeTransaction.js");
const abis_js_1 = require("../abis.js");
const contracts_js_1 = require("../contracts.js");
async function estimateL1Gas(client, args) {
    const { chain = client.chain, gasPriceOracleAddress: gasPriceOracleAddress_, } = args;
    const gasPriceOracleAddress = (() => {
        if (gasPriceOracleAddress_)
            return gasPriceOracleAddress_;
        if (chain)
            return (0, getChainContractAddress_js_1.getChainContractAddress)({
                chain,
                contract: 'gasPriceOracle',
            });
        return contracts_js_1.contracts.gasPriceOracle.address;
    })();
    const request = await (0, prepareTransactionRequest_js_1.prepareTransactionRequest)(client, args);
    (0, assertRequest_js_1.assertRequest)(request);
    const transaction = (0, serializeTransaction_js_1.serializeTransaction)({
        ...request,
        type: 'eip1559',
    });
    return (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.gasPriceOracleAbi,
        address: gasPriceOracleAddress,
        functionName: 'getL1GasUsed',
        args: [transaction],
    });
}
//# sourceMappingURL=estimateL1Gas.js.map