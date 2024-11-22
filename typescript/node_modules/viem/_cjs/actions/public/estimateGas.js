"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGas = estimateGas;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const base_js_1 = require("../../errors/base.js");
const recoverAuthorizationAddress_js_1 = require("../../experimental/eip7702/utils/recoverAuthorizationAddress.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const getEstimateGasError_js_1 = require("../../utils/errors/getEstimateGasError.js");
const extract_js_1 = require("../../utils/formatters/extract.js");
const transactionRequest_js_1 = require("../../utils/formatters/transactionRequest.js");
const stateOverride_js_1 = require("../../utils/stateOverride.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
const prepareTransactionRequest_js_1 = require("../wallet/prepareTransactionRequest.js");
const getBalance_js_1 = require("./getBalance.js");
async function estimateGas(client, args) {
    const { account: account_ = client.account } = args;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
    try {
        const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = (await (0, prepareTransactionRequest_js_1.prepareTransactionRequest)(client, {
            ...args,
            parameters: account?.type === 'local' ? undefined : ['blobVersionedHashes'],
        }));
        const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
        const block = blockNumberHex || blockTag;
        const rpcStateOverride = (0, stateOverride_js_1.serializeStateOverride)(stateOverride);
        const to = await (async () => {
            if (rest.to)
                return rest.to;
            if (authorizationList && authorizationList.length > 0)
                return await (0, recoverAuthorizationAddress_js_1.recoverAuthorizationAddress)({
                    authorization: authorizationList[0],
                }).catch(() => {
                    throw new base_js_1.BaseError('`to` is required. Could not infer from `authorizationList`');
                });
            return undefined;
        })();
        (0, assertRequest_js_1.assertRequest)(args);
        const chainFormat = client.chain?.formatters?.transactionRequest?.format;
        const format = chainFormat || transactionRequest_js_1.formatTransactionRequest;
        const request = format({
            ...(0, extract_js_1.extract)(rest, { format: chainFormat }),
            from: account?.address,
            accessList,
            authorizationList,
            blobs,
            blobVersionedHashes,
            data,
            gas,
            gasPrice,
            maxFeePerBlobGas,
            maxFeePerGas,
            maxPriorityFeePerGas,
            nonce,
            to,
            value,
        });
        function estimateGas_rpc(parameters) {
            const { block, request, rpcStateOverride } = parameters;
            return client.request({
                method: 'eth_estimateGas',
                params: rpcStateOverride
                    ? [request, block ?? 'latest', rpcStateOverride]
                    : block
                        ? [request, block]
                        : [request],
            });
        }
        let estimate = BigInt(await estimateGas_rpc({ block, request, rpcStateOverride }));
        if (authorizationList) {
            const value = await (0, getBalance_js_1.getBalance)(client, { address: request.from });
            const estimates = await Promise.all(authorizationList.map(async (authorization) => {
                const { contractAddress } = authorization;
                const estimate = await estimateGas_rpc({
                    block,
                    request: {
                        authorizationList: undefined,
                        data,
                        from: account?.address,
                        to: contractAddress,
                        value: (0, toHex_js_1.numberToHex)(value),
                    },
                    rpcStateOverride,
                }).catch(() => 100000n);
                return 2n * BigInt(estimate);
            }));
            estimate += estimates.reduce((acc, curr) => acc + curr, 0n);
        }
        return estimate;
    }
    catch (err) {
        throw (0, getEstimateGasError_js_1.getEstimateGasError)(err, {
            ...args,
            account,
            chain: client.chain,
        });
    }
}
//# sourceMappingURL=estimateGas.js.map