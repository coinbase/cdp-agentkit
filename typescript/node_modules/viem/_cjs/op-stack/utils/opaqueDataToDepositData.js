"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opaqueDataToDepositData = opaqueDataToDepositData;
const size_js_1 = require("../../utils/data/size.js");
const slice_js_1 = require("../../utils/data/slice.js");
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
function opaqueDataToDepositData(opaqueData) {
    let offset = 0;
    const mint = (0, slice_js_1.slice)(opaqueData, offset, offset + 32);
    offset += 32;
    const value = (0, slice_js_1.slice)(opaqueData, offset, offset + 32);
    offset += 32;
    const gas = (0, slice_js_1.slice)(opaqueData, offset, offset + 8);
    offset += 8;
    const isCreation = BigInt((0, slice_js_1.slice)(opaqueData, offset, offset + 1)) === 1n;
    offset += 1;
    const data = offset > (0, size_js_1.size)(opaqueData) - 1
        ? '0x'
        : (0, slice_js_1.slice)(opaqueData, offset, opaqueData.length);
    return {
        mint: (0, fromHex_js_1.hexToBigInt)(mint),
        value: (0, fromHex_js_1.hexToBigInt)(value),
        gas: (0, fromHex_js_1.hexToBigInt)(gas),
        isCreation,
        data,
    };
}
//# sourceMappingURL=opaqueDataToDepositData.js.map