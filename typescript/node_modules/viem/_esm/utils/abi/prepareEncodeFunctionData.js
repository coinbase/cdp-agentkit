import { AbiFunctionNotFoundError, } from '../../errors/abi.js';
import { toFunctionSelector, } from '../hash/toFunctionSelector.js';
import { formatAbiItem } from './formatAbiItem.js';
import { getAbiItem } from './getAbiItem.js';
const docsPath = '/docs/contract/encodeFunctionData';
export function prepareEncodeFunctionData(parameters) {
    const { abi, args, functionName } = parameters;
    let abiItem = abi[0];
    if (functionName) {
        const item = getAbiItem({
            abi,
            args,
            name: functionName,
        });
        if (!item)
            throw new AbiFunctionNotFoundError(functionName, { docsPath });
        abiItem = item;
    }
    if (abiItem.type !== 'function')
        throw new AbiFunctionNotFoundError(undefined, { docsPath });
    return {
        abi: [abiItem],
        functionName: toFunctionSelector(formatAbiItem(abiItem)),
    };
}
//# sourceMappingURL=prepareEncodeFunctionData.js.map