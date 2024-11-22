import { AbiFunctionNotFoundError, AbiFunctionOutputsNotFoundError, } from '../../errors/abi.js';
import { encodeAbiParameters, } from './encodeAbiParameters.js';
import { getAbiItem } from './getAbiItem.js';
const docsPath = '/docs/contract/encodeFunctionResult';
export function encodeFunctionResult(parameters) {
    const { abi, functionName, result } = parameters;
    let abiItem = abi[0];
    if (functionName) {
        const item = getAbiItem({ abi, name: functionName });
        if (!item)
            throw new AbiFunctionNotFoundError(functionName, { docsPath });
        abiItem = item;
    }
    if (abiItem.type !== 'function')
        throw new AbiFunctionNotFoundError(undefined, { docsPath });
    if (!abiItem.outputs)
        throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath });
    let values = Array.isArray(result) ? result : [result];
    if (abiItem.outputs.length === 0 && !values[0])
        values = [];
    return encodeAbiParameters(abiItem.outputs, values);
}
//# sourceMappingURL=encodeFunctionResult.js.map