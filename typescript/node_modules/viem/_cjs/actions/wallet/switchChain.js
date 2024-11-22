"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchChain = switchChain;
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function switchChain(client, { id }) {
    await client.request({
        method: 'wallet_switchEthereumChain',
        params: [
            {
                chainId: (0, toHex_js_1.numberToHex)(id),
            },
        ],
    }, { retryCount: 0 });
}
//# sourceMappingURL=switchChain.js.map