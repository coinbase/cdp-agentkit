"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMinGasPrice = setMinGasPrice;
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function setMinGasPrice(client, { gasPrice }) {
    await client.request({
        method: `${client.mode}_setMinGasPrice`,
        params: [(0, toHex_js_1.numberToHex)(gasPrice)],
    });
}
//# sourceMappingURL=setMinGasPrice.js.map