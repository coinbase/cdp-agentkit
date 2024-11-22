"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNonce = setNonce;
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function setNonce(client, { address, nonce }) {
    await client.request({
        method: `${client.mode}_setNonce`,
        params: [address, (0, toHex_js_1.numberToHex)(nonce)],
    });
}
//# sourceMappingURL=setNonce.js.map