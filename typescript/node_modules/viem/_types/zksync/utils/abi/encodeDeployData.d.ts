import type { Abi } from 'abitype';
import type { ErrorType } from '../../../errors/utils.js';
import type { ContractConstructorArgs } from '../../../types/contract.js';
import type { Hash } from '../../../types/misc.js';
import type { EncodeDeployDataParameters as EncodeDeployDataParameters_, EncodeDeployDataReturnType } from '../../../utils/abi/encodeDeployData.js';
import { type EncodeFunctionDataErrorType } from '../../../utils/abi/encodeFunctionData.js';
import type { ContractDeploymentType } from '../../types/contract.js';
import { type HashBytecodeErrorType } from '../hashBytecode.js';
/** @internal */
export type EncodeDeployDataParameters<abi extends Abi | readonly unknown[] = Abi, hasConstructor = abi extends Abi ? Abi extends abi ? true : [Extract<abi[number], {
    type: 'constructor';
}>] extends [never] ? false : true : true, allArgs = ContractConstructorArgs<abi>> = EncodeDeployDataParameters_<abi, hasConstructor, allArgs> & {
    deploymentType?: ContractDeploymentType | undefined;
    salt?: Hash | undefined;
};
export type EncodeDeployDataErrorType = EncodeFunctionDataErrorType | HashBytecodeErrorType | ErrorType;
export declare function encodeDeployData<const abi extends Abi | readonly unknown[]>(parameters: EncodeDeployDataParameters<abi>): EncodeDeployDataReturnType;
//# sourceMappingURL=encodeDeployData.d.ts.map