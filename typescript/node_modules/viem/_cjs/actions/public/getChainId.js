"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainId = getChainId;
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
async function getChainId(client) {
    const chainIdHex = await client.request({
        method: 'eth_chainId',
    }, { dedupe: true });
    return (0, fromHex_js_1.hexToNumber)(chainIdHex);
}
//# sourceMappingURL=getChainId.js.map