"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = sendTransaction;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../errors/account.js");
const base_js_1 = require("../../errors/base.js");
const recoverAuthorizationAddress_js_1 = require("../../experimental/eip7702/utils/recoverAuthorizationAddress.js");
const assertCurrentChain_js_1 = require("../../utils/chain/assertCurrentChain.js");
const getTransactionError_js_1 = require("../../utils/errors/getTransactionError.js");
const extract_js_1 = require("../../utils/formatters/extract.js");
const transactionRequest_js_1 = require("../../utils/formatters/transactionRequest.js");
const getAction_js_1 = require("../../utils/getAction.js");
const lru_js_1 = require("../../utils/lru.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
const getChainId_js_1 = require("../public/getChainId.js");
const prepareTransactionRequest_js_1 = require("./prepareTransactionRequest.js");
const sendRawTransaction_js_1 = require("./sendRawTransaction.js");
const supportsWalletNamespace = new lru_js_1.LruMap(128);
async function sendTransaction(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, accessList, authorizationList, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, ...rest } = parameters;
    if (typeof account_ === 'undefined')
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/actions/wallet/sendTransaction',
        });
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : null;
    try {
        (0, assertRequest_js_1.assertRequest)(parameters);
        const to = await (async () => {
            if (parameters.to)
                return parameters.to;
            if (authorizationList && authorizationList.length > 0)
                return await (0, recoverAuthorizationAddress_js_1.recoverAuthorizationAddress)({
                    authorization: authorizationList[0],
                }).catch(() => {
                    throw new base_js_1.BaseError('`to` is required. Could not infer from `authorizationList`.');
                });
            return undefined;
        })();
        if (account?.type === 'json-rpc' || account === null) {
            let chainId;
            if (chain !== null) {
                chainId = await (0, getAction_js_1.getAction)(client, getChainId_js_1.getChainId, 'getChainId')({});
                (0, assertCurrentChain_js_1.assertCurrentChain)({
                    currentChainId: chainId,
                    chain,
                });
            }
            const chainFormat = client.chain?.formatters?.transactionRequest?.format;
            const format = chainFormat || transactionRequest_js_1.formatTransactionRequest;
            const request = format({
                ...(0, extract_js_1.extract)(rest, { format: chainFormat }),
                accessList,
                authorizationList,
                blobs,
                chainId,
                data,
                from: account?.address,
                gas,
                gasPrice,
                maxFeePerBlobGas,
                maxFeePerGas,
                maxPriorityFeePerGas,
                nonce,
                to,
                value,
            });
            const isWalletNamespaceSupported = supportsWalletNamespace.get(client.uid);
            const method = isWalletNamespaceSupported
                ? 'wallet_sendTransaction'
                : 'eth_sendTransaction';
            try {
                return await client.request({
                    method,
                    params: [request],
                }, { retryCount: 0 });
            }
            catch (e) {
                if (isWalletNamespaceSupported === false)
                    throw e;
                const error = e;
                if (error.name === 'InvalidInputRpcError' ||
                    error.name === 'InvalidParamsRpcError' ||
                    error.name === 'MethodNotFoundRpcError' ||
                    error.name === 'MethodNotSupportedRpcError') {
                    return await client
                        .request({
                        method: 'wallet_sendTransaction',
                        params: [request],
                    }, { retryCount: 0 })
                        .then((hash) => {
                        supportsWalletNamespace.set(client.uid, true);
                        return hash;
                    })
                        .catch((e) => {
                        const walletNamespaceError = e;
                        if (walletNamespaceError.name === 'MethodNotFoundRpcError' ||
                            walletNamespaceError.name === 'MethodNotSupportedRpcError') {
                            supportsWalletNamespace.set(client.uid, false);
                            throw error;
                        }
                        throw walletNamespaceError;
                    });
                }
                throw error;
            }
        }
        if (account?.type === 'local') {
            const request = await (0, getAction_js_1.getAction)(client, prepareTransactionRequest_js_1.prepareTransactionRequest, 'prepareTransactionRequest')({
                account,
                accessList,
                authorizationList,
                blobs,
                chain,
                data,
                gas,
                gasPrice,
                maxFeePerBlobGas,
                maxFeePerGas,
                maxPriorityFeePerGas,
                nonce,
                nonceManager: account.nonceManager,
                parameters: [...prepareTransactionRequest_js_1.defaultParameters, 'sidecars'],
                value,
                ...rest,
                to,
            });
            const serializer = chain?.serializers?.transaction;
            const serializedTransaction = (await account.signTransaction(request, {
                serializer,
            }));
            return await (0, getAction_js_1.getAction)(client, sendRawTransaction_js_1.sendRawTransaction, 'sendRawTransaction')({
                serializedTransaction,
            });
        }
        if (account?.type === 'smart')
            throw new account_js_1.AccountTypeNotSupportedError({
                metaMessages: [
                    'Consider using the `sendUserOperation` Action instead.',
                ],
                docsPath: '/docs/actions/bundler/sendUserOperation',
                type: 'smart',
            });
        throw new account_js_1.AccountTypeNotSupportedError({
            docsPath: '/docs/actions/wallet/sendTransaction',
            type: account?.type,
        });
    }
    catch (err) {
        if (err instanceof account_js_1.AccountTypeNotSupportedError)
            throw err;
        throw (0, getTransactionError_js_1.getTransactionError)(err, {
            ...parameters,
            account,
            chain: parameters.chain || undefined,
        });
    }
}
//# sourceMappingURL=sendTransaction.js.map