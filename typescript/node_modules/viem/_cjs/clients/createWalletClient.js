"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletClient = createWalletClient;
const createClient_js_1 = require("./createClient.js");
const wallet_js_1 = require("./decorators/wallet.js");
function createWalletClient(parameters) {
    const { key = 'wallet', name = 'Wallet Client', transport } = parameters;
    const client = (0, createClient_js_1.createClient)({
        ...parameters,
        key,
        name,
        transport,
        type: 'walletClient',
    });
    return client.extend(wallet_js_1.walletActions);
}
//# sourceMappingURL=createWalletClient.js.map