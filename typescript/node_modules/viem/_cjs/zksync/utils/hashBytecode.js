"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashBytecode = hashBytecode;
const pad_js_1 = require("../../utils/data/pad.js");
const toBytes_js_1 = require("../../utils/encoding/toBytes.js");
const sha256_js_1 = require("../../utils/hash/sha256.js");
const number_js_1 = require("../constants/number.js");
const bytecode_js_1 = require("../errors/bytecode.js");
function hashBytecode(bytecode) {
    const bytecodeBytes = (0, toBytes_js_1.toBytes)(bytecode);
    if (bytecodeBytes.length % 32 !== 0)
        throw new bytecode_js_1.BytecodeLengthMustBeDivisibleBy32Error({
            givenLength: bytecodeBytes.length,
        });
    if (bytecodeBytes.length > number_js_1.maxBytecodeSize)
        throw new bytecode_js_1.BytecodeLengthExceedsMaxSizeError({
            givenLength: bytecodeBytes.length,
            maxBytecodeSize: number_js_1.maxBytecodeSize,
        });
    const hashStr = (0, sha256_js_1.sha256)(bytecodeBytes);
    const hash = (0, toBytes_js_1.toBytes)(hashStr);
    const bytecodeLengthInWords = bytecodeBytes.length / 32;
    if (bytecodeLengthInWords % 2 === 0) {
        throw new bytecode_js_1.BytecodeLengthInWordsMustBeOddError({
            givenLengthInWords: bytecodeLengthInWords,
        });
    }
    const bytecodeLength = (0, toBytes_js_1.toBytes)(bytecodeLengthInWords);
    const bytecodeLengthPadded = (0, pad_js_1.pad)(bytecodeLength, { size: 2 });
    const codeHashVersion = new Uint8Array([1, 0]);
    hash.set(codeHashVersion, 0);
    hash.set(bytecodeLengthPadded, 2);
    return hash;
}
//# sourceMappingURL=hashBytecode.js.map