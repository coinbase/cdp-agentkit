import type { Abi } from 'abitype';
import { type AbiConstructorNotFoundErrorType, type AbiConstructorParamsNotFoundErrorType } from '../../errors/abi.js';
import type { ContractConstructorArgs } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { ErrorType } from '../../errors/utils.js';
import { type DecodeAbiParametersErrorType } from './decodeAbiParameters.js';
export type DecodeDeployDataParameters<abi extends Abi | readonly unknown[] = Abi> = {
    abi: abi;
    bytecode: Hex;
    data: Hex;
};
export type DecodeDeployDataReturnType<abi extends Abi | readonly unknown[] = Abi, allArgs = ContractConstructorArgs<abi>> = {
    bytecode: Hex;
    args: allArgs;
};
export type DecodeDeployDataErrorType = AbiConstructorNotFoundErrorType | AbiConstructorParamsNotFoundErrorType | DecodeAbiParametersErrorType | ErrorType;
export declare function decodeDeployData<const abi extends Abi | readonly unknown[]>(parameters: DecodeDeployDataParameters<abi>): DecodeDeployDataReturnType<abi>;
//# sourceMappingURL=decodeDeployData.d.ts.map