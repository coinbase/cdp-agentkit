"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErc6492Signature = parseErc6492Signature;
const decodeAbiParameters_js_1 = require("../abi/decodeAbiParameters.js");
const isErc6492Signature_js_1 = require("./isErc6492Signature.js");
function parseErc6492Signature(signature) {
    if (!(0, isErc6492Signature_js_1.isErc6492Signature)(signature))
        return { signature };
    const [address, data, signature_] = (0, decodeAbiParameters_js_1.decodeAbiParameters)([{ type: 'address' }, { type: 'bytes' }, { type: 'bytes' }], signature);
    return { address, data, signature: signature_ };
}
//# sourceMappingURL=parseErc6492Signature.js.map