"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grantPermissions = grantPermissions;
const index_js_1 = require("../../../utils/index.js");
async function grantPermissions(client, parameters) {
    const { account, expiry, permissions, signer } = parameters;
    const result = await client.request({
        method: 'wallet_grantPermissions',
        params: [
            formatParameters({ account, expiry, permissions, signer }),
        ],
    }, { retryCount: 0 });
    return formatRequest(result);
}
function formatParameters(parameters) {
    const { expiry, permissions, signer: signer_ } = parameters;
    const account = parameters.account
        ? (0, index_js_1.parseAccount)(parameters.account)
        : undefined;
    const signer = (() => {
        if (!account && !signer_)
            return undefined;
        if (account?.type === 'json-rpc')
            return {
                type: 'wallet',
            };
        if (account?.type === 'local')
            return {
                type: 'account',
                data: {
                    id: account.address,
                },
            };
        return signer_;
    })();
    return {
        expiry,
        permissions: permissions.map((permission) => ({
            ...permission,
            policies: permission.policies.map((policy) => {
                const data = (() => {
                    if (policy.type === 'token-allowance')
                        return {
                            allowance: (0, index_js_1.numberToHex)(policy.data.allowance),
                        };
                    if (policy.type === 'gas-limit')
                        return {
                            limit: (0, index_js_1.numberToHex)(policy.data.limit),
                        };
                    return policy.data;
                })();
                return {
                    data,
                    type: typeof policy.type === 'string' ? policy.type : policy.type.custom,
                };
            }),
            required: permission.required ?? false,
            type: typeof permission.type === 'string'
                ? permission.type
                : permission.type.custom,
        })),
        ...(signer ? { signer } : {}),
    };
}
function formatRequest(result) {
    return {
        expiry: result.expiry,
        ...(result.factory ? { factory: result.factory } : {}),
        ...(result.factoryData ? { factoryData: result.factoryData } : {}),
        grantedPermissions: result.grantedPermissions.map((permission) => ({
            ...permission,
            policies: permission.policies.map((policy) => {
                const data = (() => {
                    if (policy.type === 'token-allowance')
                        return {
                            allowance: BigInt(policy.data.allowance),
                        };
                    if (policy.type === 'gas-limit')
                        return {
                            limit: BigInt(policy.data.limit),
                        };
                    return policy.data;
                })();
                return {
                    data,
                    type: policy.type,
                };
            }),
        })),
        permissionsContext: result.permissionsContext,
        ...(result.signerData ? { signerData: result.signerData } : {}),
    };
}
//# sourceMappingURL=grantPermissions.js.map