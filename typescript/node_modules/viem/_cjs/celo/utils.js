"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = isEmpty;
exports.isPresent = isPresent;
exports.isEIP1559 = isEIP1559;
exports.isCIP64 = isCIP64;
const trim_js_1 = require("../utils/data/trim.js");
function isEmpty(value) {
    return (value === 0 ||
        value === 0n ||
        value === undefined ||
        value === null ||
        value === '0' ||
        value === '' ||
        (typeof value === 'string' &&
            ((0, trim_js_1.trim)(value).toLowerCase() === '0x' ||
                (0, trim_js_1.trim)(value).toLowerCase() === '0x00')));
}
function isPresent(value) {
    return !isEmpty(value);
}
function isEIP1559(transaction) {
    return (typeof transaction.maxFeePerGas !== 'undefined' &&
        typeof transaction.maxPriorityFeePerGas !== 'undefined');
}
function isCIP64(transaction) {
    if (transaction.type === 'cip64') {
        return true;
    }
    return isEIP1559(transaction) && isPresent(transaction.feeCurrency);
}
//# sourceMappingURL=utils.js.map