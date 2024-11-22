"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractAddress = getContractAddress;
exports.getCreateAddress = getCreateAddress;
exports.getCreate2Address = getCreate2Address;
const concat_js_1 = require("../data/concat.js");
const isBytes_js_1 = require("../data/isBytes.js");
const pad_js_1 = require("../data/pad.js");
const slice_js_1 = require("../data/slice.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toRlp_js_1 = require("../encoding/toRlp.js");
const keccak256_js_1 = require("../hash/keccak256.js");
const getAddress_js_1 = require("./getAddress.js");
function getContractAddress(opts) {
    if (opts.opcode === 'CREATE2')
        return getCreate2Address(opts);
    return getCreateAddress(opts);
}
function getCreateAddress(opts) {
    const from = (0, toBytes_js_1.toBytes)((0, getAddress_js_1.getAddress)(opts.from));
    let nonce = (0, toBytes_js_1.toBytes)(opts.nonce);
    if (nonce[0] === 0)
        nonce = new Uint8Array([]);
    return (0, getAddress_js_1.getAddress)(`0x${(0, keccak256_js_1.keccak256)((0, toRlp_js_1.toRlp)([from, nonce], 'bytes')).slice(26)}`);
}
function getCreate2Address(opts) {
    const from = (0, toBytes_js_1.toBytes)((0, getAddress_js_1.getAddress)(opts.from));
    const salt = (0, pad_js_1.pad)((0, isBytes_js_1.isBytes)(opts.salt) ? opts.salt : (0, toBytes_js_1.toBytes)(opts.salt), {
        size: 32,
    });
    const bytecodeHash = (() => {
        if ('bytecodeHash' in opts) {
            if ((0, isBytes_js_1.isBytes)(opts.bytecodeHash))
                return opts.bytecodeHash;
            return (0, toBytes_js_1.toBytes)(opts.bytecodeHash);
        }
        return (0, keccak256_js_1.keccak256)(opts.bytecode, 'bytes');
    })();
    return (0, getAddress_js_1.getAddress)((0, slice_js_1.slice)((0, keccak256_js_1.keccak256)((0, concat_js_1.concat)([(0, toBytes_js_1.toBytes)('0xff'), from, salt, bytecodeHash])), 12));
}
//# sourceMappingURL=getContractAddress.js.map