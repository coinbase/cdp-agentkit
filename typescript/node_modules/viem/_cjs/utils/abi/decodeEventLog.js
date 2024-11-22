"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeEventLog = decodeEventLog;
const abi_js_1 = require("../../errors/abi.js");
const size_js_1 = require("../data/size.js");
const toEventSelector_js_1 = require("../hash/toEventSelector.js");
const cursor_js_1 = require("../../errors/cursor.js");
const decodeAbiParameters_js_1 = require("./decodeAbiParameters.js");
const formatAbiItem_js_1 = require("./formatAbiItem.js");
const docsPath = '/docs/contract/decodeEventLog';
function decodeEventLog(parameters) {
    const { abi, data, strict: strict_, topics, } = parameters;
    const strict = strict_ ?? true;
    const [signature, ...argTopics] = topics;
    if (!signature)
        throw new abi_js_1.AbiEventSignatureEmptyTopicsError({ docsPath });
    const abiItem = (() => {
        if (abi.length === 1)
            return abi[0];
        return abi.find((x) => x.type === 'event' &&
            signature === (0, toEventSelector_js_1.toEventSelector)((0, formatAbiItem_js_1.formatAbiItem)(x)));
    })();
    if (!(abiItem && 'name' in abiItem) || abiItem.type !== 'event')
        throw new abi_js_1.AbiEventSignatureNotFoundError(signature, { docsPath });
    const { name, inputs } = abiItem;
    const isUnnamed = inputs?.some((x) => !('name' in x && x.name));
    let args = isUnnamed ? [] : {};
    const indexedInputs = inputs.filter((x) => 'indexed' in x && x.indexed);
    for (let i = 0; i < indexedInputs.length; i++) {
        const param = indexedInputs[i];
        const topic = argTopics[i];
        if (!topic)
            throw new abi_js_1.DecodeLogTopicsMismatch({
                abiItem,
                param: param,
            });
        args[isUnnamed ? i : param.name || i] = decodeTopic({ param, value: topic });
    }
    const nonIndexedInputs = inputs.filter((x) => !('indexed' in x && x.indexed));
    if (nonIndexedInputs.length > 0) {
        if (data && data !== '0x') {
            try {
                const decodedData = (0, decodeAbiParameters_js_1.decodeAbiParameters)(nonIndexedInputs, data);
                if (decodedData) {
                    if (isUnnamed)
                        args = [...args, ...decodedData];
                    else {
                        for (let i = 0; i < nonIndexedInputs.length; i++) {
                            args[nonIndexedInputs[i].name] = decodedData[i];
                        }
                    }
                }
            }
            catch (err) {
                if (strict) {
                    if (err instanceof abi_js_1.AbiDecodingDataSizeTooSmallError ||
                        err instanceof cursor_js_1.PositionOutOfBoundsError)
                        throw new abi_js_1.DecodeLogDataMismatch({
                            abiItem,
                            data: data,
                            params: nonIndexedInputs,
                            size: (0, size_js_1.size)(data),
                        });
                    throw err;
                }
            }
        }
        else if (strict) {
            throw new abi_js_1.DecodeLogDataMismatch({
                abiItem,
                data: '0x',
                params: nonIndexedInputs,
                size: 0,
            });
        }
    }
    return {
        eventName: name,
        args: Object.values(args).length > 0 ? args : undefined,
    };
}
function decodeTopic({ param, value }) {
    if (param.type === 'string' ||
        param.type === 'bytes' ||
        param.type === 'tuple' ||
        param.type.match(/^(.*)\[(\d+)?\]$/))
        return value;
    const decodedArg = (0, decodeAbiParameters_js_1.decodeAbiParameters)([param], value) || [];
    return decodedArg[0];
}
//# sourceMappingURL=decodeEventLog.js.map