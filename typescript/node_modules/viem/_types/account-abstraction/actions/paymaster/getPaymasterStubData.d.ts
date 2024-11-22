import type { Address } from 'abitype';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Hex } from '../../../types/misc.js';
import type { OneOf, PartialBy, Prettify } from '../../../types/utils.js';
import type { UserOperation } from '../../types/userOperation.js';
import { type FormatUserOperationRequestErrorType } from '../../utils/formatters/userOperationRequest.js';
export type GetPaymasterStubDataParameters = OneOf<PartialBy<Pick<UserOperation<'0.6'>, 'callData' | 'callGasLimit' | 'initCode' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'nonce' | 'sender' | 'preVerificationGas' | 'verificationGasLimit'>, 'callGasLimit' | 'initCode' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'preVerificationGas' | 'verificationGasLimit'> | PartialBy<Pick<UserOperation<'0.7'>, 'callData' | 'callGasLimit' | 'factory' | 'factoryData' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'nonce' | 'sender' | 'preVerificationGas' | 'verificationGasLimit'>, 'callGasLimit' | 'factory' | 'factoryData' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'preVerificationGas' | 'verificationGasLimit'>> & {
    context?: unknown | undefined;
    chainId: number;
    entryPointAddress: Address;
};
export type GetPaymasterStubDataReturnType = Prettify<OneOf<{
    paymasterAndData: Hex;
} | {
    paymaster: Address;
    paymasterData: Hex;
    paymasterVerificationGasLimit?: bigint | undefined;
    paymasterPostOpGasLimit: bigint;
}> & {
    sponsor?: {
        name: string;
        icon?: string | undefined;
    } | undefined;
    isFinal?: boolean | undefined;
}>;
export type GetPaymasterStubDataErrorType = FormatUserOperationRequestErrorType | ErrorType;
/**
 * Retrieves paymaster-related User Operation properties to be used for gas estimation.
 *
 * - Docs: https://viem.sh/account-abstraction/actions/paymaster/getPaymasterStubData
 *
 * @param client - Client to use
 * @param parameters - {@link GetPaymasterStubDataParameters}
 * @returns Paymaster-related User Operation properties. {@link GetPaymasterStubDataReturnType}
 *
 * @example
 * import { http } from 'viem'
 * import { createPaymasterClient, getPaymasterStubData } from 'viem/account-abstraction'
 *
 * const paymasterClient = createPaymasterClient({
 *   transport: http('https://...'),
 * })
 *
 * const userOperation = { ... }
 *
 * const values = await getPaymasterStubData(paymasterClient, {
 *   chainId: 1,
 *   entryPointAddress: '0x...',
 *   ...userOperation,
 * })
 */
export declare function getPaymasterStubData(client: Client<Transport>, parameters: GetPaymasterStubDataParameters): Promise<GetPaymasterStubDataReturnType>;
//# sourceMappingURL=getPaymasterStubData.d.ts.map