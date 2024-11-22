"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeErc6492Signature = serializeErc6492Signature;
const bytes_js_1 = require("../../constants/bytes.js");
const encodeAbiParameters_js_1 = require("../abi/encodeAbiParameters.js");
const concat_js_1 = require("../data/concat.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
function serializeErc6492Signature(parameters) {
    const { address, data, signature, to = 'hex' } = parameters;
    const signature_ = (0, concat_js_1.concatHex)([
        (0, encodeAbiParameters_js_1.encodeAbiParameters)([{ type: 'address' }, { type: 'bytes' }, { type: 'bytes' }], [address, data, signature]),
        bytes_js_1.erc6492MagicBytes,
    ]);
    if (to === 'hex')
        return signature_;
    return (0, toBytes_js_1.hexToBytes)(signature_);
}
//# sourceMappingURL=serializeErc6492Signature.js.map