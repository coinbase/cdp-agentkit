import type { Abi } from 'abitype';
import { type AbiConstructorNotFoundErrorType } from '../../errors/abi.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ContractConstructorArgs } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { UnionEvaluate } from '../../types/utils.js';
import { type ConcatHexErrorType } from '../data/concat.js';
import { type EncodeAbiParametersErrorType } from './encodeAbiParameters.js';
export type EncodeDeployDataParameters<abi extends Abi | readonly unknown[] = Abi, hasConstructor = abi extends Abi ? Abi extends abi ? true : [Extract<abi[number], {
    type: 'constructor';
}>] extends [never] ? false : true : true, allArgs = ContractConstructorArgs<abi>> = {
    abi: abi;
    bytecode: Hex;
} & UnionEvaluate<hasConstructor extends false ? {
    args?: undefined;
} : readonly [] extends allArgs ? {
    args?: allArgs | undefined;
} : {
    args: allArgs;
}>;
export type EncodeDeployDataReturnType = Hex;
export type EncodeDeployDataErrorType = AbiConstructorNotFoundErrorType | ConcatHexErrorType | EncodeAbiParametersErrorType | ErrorType;
export declare function encodeDeployData<const abi extends Abi | readonly unknown[]>(parameters: EncodeDeployDataParameters<abi>): EncodeDeployDataReturnType;
//# sourceMappingURL=encodeDeployData.d.ts.map