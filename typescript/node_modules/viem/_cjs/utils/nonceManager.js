"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonceManager = void 0;
exports.createNonceManager = createNonceManager;
exports.jsonRpc = jsonRpc;
const getTransactionCount_js_1 = require("../actions/public/getTransactionCount.js");
const lru_js_1 = require("./lru.js");
function createNonceManager(parameters) {
    const { source } = parameters;
    const deltaMap = new Map();
    const nonceMap = new lru_js_1.LruMap(8192);
    const promiseMap = new Map();
    const getKey = ({ address, chainId }) => `${address}.${chainId}`;
    return {
        async consume({ address, chainId, client }) {
            const key = getKey({ address, chainId });
            const promise = this.get({ address, chainId, client });
            this.increment({ address, chainId });
            const nonce = await promise;
            await source.set({ address, chainId }, nonce);
            nonceMap.set(key, nonce);
            return nonce;
        },
        async increment({ address, chainId }) {
            const key = getKey({ address, chainId });
            const delta = deltaMap.get(key) ?? 0;
            deltaMap.set(key, delta + 1);
        },
        async get({ address, chainId, client }) {
            const key = getKey({ address, chainId });
            let promise = promiseMap.get(key);
            if (!promise) {
                promise = (async () => {
                    try {
                        const nonce = await source.get({ address, chainId, client });
                        const previousNonce = nonceMap.get(key) ?? 0;
                        if (previousNonce > 0 && nonce <= previousNonce)
                            return previousNonce + 1;
                        nonceMap.delete(key);
                        return nonce;
                    }
                    finally {
                        this.reset({ address, chainId });
                    }
                })();
                promiseMap.set(key, promise);
            }
            const delta = deltaMap.get(key) ?? 0;
            return delta + (await promise);
        },
        reset({ address, chainId }) {
            const key = getKey({ address, chainId });
            deltaMap.delete(key);
            promiseMap.delete(key);
        },
    };
}
function jsonRpc() {
    return {
        async get(parameters) {
            const { address, client } = parameters;
            return (0, getTransactionCount_js_1.getTransactionCount)(client, {
                address,
                blockTag: 'pending',
            });
        },
        set() { },
    };
}
exports.nonceManager = createNonceManager({
    source: jsonRpc(),
});
//# sourceMappingURL=nonceManager.js.map