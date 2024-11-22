import { AbiConstructorNotFoundError, AbiConstructorParamsNotFoundError, } from '../../errors/abi.js';
import { concatHex } from '../data/concat.js';
import { encodeAbiParameters, } from './encodeAbiParameters.js';
const docsPath = '/docs/contract/encodeDeployData';
export function encodeDeployData(parameters) {
    const { abi, args, bytecode } = parameters;
    if (!args || args.length === 0)
        return bytecode;
    const description = abi.find((x) => 'type' in x && x.type === 'constructor');
    if (!description)
        throw new AbiConstructorNotFoundError({ docsPath });
    if (!('inputs' in description))
        throw new AbiConstructorParamsNotFoundError({ docsPath });
    if (!description.inputs || description.inputs.length === 0)
        throw new AbiConstructorParamsNotFoundError({ docsPath });
    const data = encodeAbiParameters(description.inputs, args);
    return concatHex([bytecode, data]);
}
//# sourceMappingURL=encodeDeployData.js.map