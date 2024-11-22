"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSmartAccount = toSmartAccount;
const abitype_1 = require("abitype");
const getCode_js_1 = require("../../actions/public/getCode.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const getAction_js_1 = require("../../utils/getAction.js");
const nonceManager_js_1 = require("../../utils/nonceManager.js");
const serializeErc6492Signature_js_1 = require("../../utils/signature/serializeErc6492Signature.js");
async function toSmartAccount(implementation) {
    const { extend, nonceKeyManager = (0, nonceManager_js_1.createNonceManager)({
        source: {
            get() {
                return Date.now();
            },
            set() { },
        },
    }), ...rest } = implementation;
    let deployed = false;
    const address = await implementation.getAddress();
    return {
        ...extend,
        ...rest,
        address,
        async getFactoryArgs() {
            if ('isDeployed' in this && (await this.isDeployed()))
                return { factory: undefined, factoryData: undefined };
            return implementation.getFactoryArgs();
        },
        async getNonce(parameters) {
            const key = parameters?.key ??
                BigInt(await nonceKeyManager.consume({
                    address,
                    chainId: implementation.client.chain.id,
                    client: implementation.client,
                }));
            if (implementation.getNonce)
                return await implementation.getNonce({ ...parameters, key });
            const nonce = await (0, readContract_js_1.readContract)(implementation.client, {
                abi: (0, abitype_1.parseAbi)([
                    'function getNonce(address, uint192) pure returns (uint256)',
                ]),
                address: implementation.entryPoint.address,
                functionName: 'getNonce',
                args: [address, key],
            });
            return nonce;
        },
        async isDeployed() {
            if (deployed)
                return true;
            const code = await (0, getAction_js_1.getAction)(implementation.client, getCode_js_1.getCode, 'getCode')({
                address,
            });
            deployed = Boolean(code);
            return deployed;
        },
        ...(implementation.sign
            ? {
                async sign(parameters) {
                    const [{ factory, factoryData }, signature] = await Promise.all([
                        this.getFactoryArgs(),
                        implementation.sign(parameters),
                    ]);
                    if (factory && factoryData)
                        return (0, serializeErc6492Signature_js_1.serializeErc6492Signature)({
                            address: factory,
                            data: factoryData,
                            signature,
                        });
                    return signature;
                },
            }
            : {}),
        async signMessage(parameters) {
            const [{ factory, factoryData }, signature] = await Promise.all([
                this.getFactoryArgs(),
                implementation.signMessage(parameters),
            ]);
            if (factory && factoryData)
                return (0, serializeErc6492Signature_js_1.serializeErc6492Signature)({
                    address: factory,
                    data: factoryData,
                    signature,
                });
            return signature;
        },
        async signTypedData(parameters) {
            const [{ factory, factoryData }, signature] = await Promise.all([
                this.getFactoryArgs(),
                implementation.signTypedData(parameters),
            ]);
            if (factory && factoryData)
                return (0, serializeErc6492Signature_js_1.serializeErc6492Signature)({
                    address: factory,
                    data: factoryData,
                    signature,
                });
            return signature;
        },
        type: 'smart',
    };
}
//# sourceMappingURL=toSmartAccount.js.map