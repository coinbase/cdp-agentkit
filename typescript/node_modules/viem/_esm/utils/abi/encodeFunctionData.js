import { concatHex } from '../data/concat.js';
import { encodeAbiParameters, } from './encodeAbiParameters.js';
import { prepareEncodeFunctionData } from './prepareEncodeFunctionData.js';
export function encodeFunctionData(parameters) {
    const { args } = parameters;
    const { abi, functionName } = (() => {
        if (parameters.abi.length === 1 &&
            parameters.functionName?.startsWith('0x'))
            return parameters;
        return prepareEncodeFunctionData(parameters);
    })();
    const abiItem = abi[0];
    const signature = functionName;
    const data = 'inputs' in abiItem && abiItem.inputs
        ? encodeAbiParameters(abiItem.inputs, args ?? [])
        : undefined;
    return concatHex([signature, data ?? '0x']);
}
//# sourceMappingURL=encodeFunctionData.js.map