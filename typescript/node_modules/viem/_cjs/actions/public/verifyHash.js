"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = verifyHash;
const abis_js_1 = require("../../constants/abis.js");
const contracts_js_1 = require("../../constants/contracts.js");
const contract_js_1 = require("../../errors/contract.js");
const encodeDeployData_js_1 = require("../../utils/abi/encodeDeployData.js");
const getAddress_js_1 = require("../../utils/address/getAddress.js");
const isAddressEqual_js_1 = require("../../utils/address/isAddressEqual.js");
const isHex_js_1 = require("../../utils/data/isHex.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const getAction_js_1 = require("../../utils/getAction.js");
const index_js_1 = require("../../utils/index.js");
const isErc6492Signature_js_1 = require("../../utils/signature/isErc6492Signature.js");
const recoverAddress_js_1 = require("../../utils/signature/recoverAddress.js");
const serializeErc6492Signature_js_1 = require("../../utils/signature/serializeErc6492Signature.js");
const serializeSignature_js_1 = require("../../utils/signature/serializeSignature.js");
const call_js_1 = require("./call.js");
async function verifyHash(client, parameters) {
    const { address, factory, factoryData, hash, signature, universalSignatureVerifierAddress = client.chain?.contracts
        ?.universalSignatureVerifier?.address, ...rest } = parameters;
    const signatureHex = (() => {
        if ((0, isHex_js_1.isHex)(signature))
            return signature;
        if (typeof signature === 'object' && 'r' in signature && 's' in signature)
            return (0, serializeSignature_js_1.serializeSignature)(signature);
        return (0, toHex_js_1.bytesToHex)(signature);
    })();
    const wrappedSignature = await (async () => {
        if (!factory && !factoryData)
            return signatureHex;
        if ((0, isErc6492Signature_js_1.isErc6492Signature)(signatureHex))
            return signatureHex;
        return (0, serializeErc6492Signature_js_1.serializeErc6492Signature)({
            address: factory,
            data: factoryData,
            signature: signatureHex,
        });
    })();
    try {
        const args = universalSignatureVerifierAddress
            ? {
                to: universalSignatureVerifierAddress,
                data: (0, index_js_1.encodeFunctionData)({
                    abi: abis_js_1.universalSignatureValidatorAbi,
                    functionName: 'isValidSig',
                    args: [address, hash, wrappedSignature],
                }),
                ...rest,
            }
            : {
                data: (0, encodeDeployData_js_1.encodeDeployData)({
                    abi: abis_js_1.universalSignatureValidatorAbi,
                    args: [address, hash, wrappedSignature],
                    bytecode: contracts_js_1.universalSignatureValidatorByteCode,
                }),
                ...rest,
            };
        const { data } = await (0, getAction_js_1.getAction)(client, call_js_1.call, 'call')(args);
        return (0, index_js_1.hexToBool)(data ?? '0x0');
    }
    catch (error) {
        try {
            const verified = (0, isAddressEqual_js_1.isAddressEqual)((0, getAddress_js_1.getAddress)(address), await (0, recoverAddress_js_1.recoverAddress)({ hash, signature }));
            if (verified)
                return true;
        }
        catch { }
        if (error instanceof contract_js_1.CallExecutionError) {
            return false;
        }
        throw error;
    }
}
//# sourceMappingURL=verifyHash.js.map