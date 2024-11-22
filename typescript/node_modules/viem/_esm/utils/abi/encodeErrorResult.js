import { AbiErrorInputsNotFoundError, AbiErrorNotFoundError, } from '../../errors/abi.js';
import { concatHex } from '../data/concat.js';
import { toFunctionSelector, } from '../hash/toFunctionSelector.js';
import { encodeAbiParameters, } from './encodeAbiParameters.js';
import { formatAbiItem } from './formatAbiItem.js';
import { getAbiItem } from './getAbiItem.js';
const docsPath = '/docs/contract/encodeErrorResult';
export function encodeErrorResult(parameters) {
    const { abi, errorName, args } = parameters;
    let abiItem = abi[0];
    if (errorName) {
        const item = getAbiItem({ abi, args, name: errorName });
        if (!item)
            throw new AbiErrorNotFoundError(errorName, { docsPath });
        abiItem = item;
    }
    if (abiItem.type !== 'error')
        throw new AbiErrorNotFoundError(undefined, { docsPath });
    const definition = formatAbiItem(abiItem);
    const signature = toFunctionSelector(definition);
    let data = '0x';
    if (args && args.length > 0) {
        if (!abiItem.inputs)
            throw new AbiErrorInputsNotFoundError(abiItem.name, { docsPath });
        data = encodeAbiParameters(abiItem.inputs, args);
    }
    return concatHex([signature, data]);
}
//# sourceMappingURL=encodeErrorResult.js.map