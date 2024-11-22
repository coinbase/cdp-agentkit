import type { Abi, AbiParameter } from 'abitype';
import { type AbiItemAmbiguityErrorType } from '../../errors/abi.js';
import type { ErrorType } from '../../errors/utils.js';
import type { AbiItem, AbiItemArgs, AbiItemName, ExtractAbiItemForArgs, Widen } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { UnionEvaluate } from '../../types/utils.js';
import { type IsHexErrorType } from '../../utils/data/isHex.js';
import { type IsAddressErrorType } from '../address/isAddress.js';
import { type ToFunctionSelectorErrorType } from '../hash/toFunctionSelector.js';
export type GetAbiItemParameters<abi extends Abi | readonly unknown[] = Abi, name extends AbiItemName<abi> = AbiItemName<abi>, args extends AbiItemArgs<abi, name> | undefined = AbiItemArgs<abi, name>, allArgs = AbiItemArgs<abi, name>, allNames = AbiItemName<abi>> = {
    abi: abi;
    name: allNames | (name extends allNames ? name : never) | Hex;
} & UnionEvaluate<readonly [] extends allArgs ? {
    args?: allArgs | (abi extends Abi ? args extends allArgs ? Widen<args> : never : never) | undefined;
} : {
    args?: allArgs | (Widen<args> & (args extends allArgs ? unknown : never)) | undefined;
}>;
export type GetAbiItemErrorType = IsArgOfTypeErrorType | IsHexErrorType | ToFunctionSelectorErrorType | AbiItemAmbiguityErrorType | ErrorType;
export type GetAbiItemReturnType<abi extends Abi | readonly unknown[] = Abi, name extends AbiItemName<abi> = AbiItemName<abi>, args extends AbiItemArgs<abi, name> | undefined = AbiItemArgs<abi, name>> = abi extends Abi ? Abi extends abi ? AbiItem | undefined : ExtractAbiItemForArgs<abi, name, args extends AbiItemArgs<abi, name> ? args : AbiItemArgs<abi, name>> : AbiItem | undefined;
export declare function getAbiItem<const abi extends Abi | readonly unknown[], name extends AbiItemName<abi>, const args extends AbiItemArgs<abi, name> | undefined = undefined>(parameters: GetAbiItemParameters<abi, name, args>): GetAbiItemReturnType<abi, name, args>;
type IsArgOfTypeErrorType = IsAddressErrorType | ErrorType;
/** @internal */
export declare function isArgOfType(arg: unknown, abiParameter: AbiParameter): boolean;
/** @internal */
export declare function getAmbiguousTypes(sourceParameters: readonly AbiParameter[], targetParameters: readonly AbiParameter[], args: AbiItemArgs): AbiParameter['type'][] | undefined;
export {};
//# sourceMappingURL=getAbiItem.d.ts.map