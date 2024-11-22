import type { Address } from 'abitype';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Hex } from '../../../types/misc.js';
import type { OneOf, PartialBy, Prettify } from '../../../types/utils.js';
import type { UserOperation } from '../../types/userOperation.js';
import { type FormatUserOperationRequestErrorType } from '../../utils/formatters/userOperationRequest.js';
export type GetPaymasterDataParameters = OneOf<PartialBy<Pick<UserOperation<'0.6'>, 'callData' | 'callGasLimit' | 'initCode' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'nonce' | 'sender' | 'preVerificationGas' | 'verificationGasLimit'>, 'callGasLimit' | 'initCode' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'preVerificationGas' | 'verificationGasLimit'> | PartialBy<Pick<UserOperation<'0.7'>, 'callData' | 'callGasLimit' | 'factory' | 'factoryData' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'nonce' | 'sender' | 'preVerificationGas' | 'verificationGasLimit' | 'paymasterPostOpGasLimit' | 'paymasterVerificationGasLimit'>, 'callGasLimit' | 'factory' | 'factoryData' | 'maxFeePerGas' | 'maxPriorityFeePerGas' | 'preVerificationGas' | 'verificationGasLimit'>> & {
    context?: unknown | undefined;
    chainId: number;
    entryPointAddress: Address;
};
export type GetPaymasterDataReturnType = Prettify<OneOf<{
    paymasterAndData: Hex;
} | {
    paymaster: Address;
    paymasterData: Hex;
    paymasterPostOpGasLimit?: bigint | undefined;
    paymasterVerificationGasLimit?: bigint | undefined;
}>>;
export type GetPaymasterDataErrorType = FormatUserOperationRequestErrorType | ErrorType;
/**
 * Retrieves paymaster-related User Operation properties to be used for sending the User Operation.
 *
 * - Docs: https://viem.sh/account-abstraction/actions/paymaster/getPaymasterData
 *
 * @param client - Client to use
 * @param parameters - {@link GetPaymasterDataParameters}
 * @returns Paymaster-related User Operation properties. {@link GetPaymasterDataReturnType}
 *
 * @example
 * import { http } from 'viem'
 * import { createPaymasterClient, getPaymasterData } from 'viem/account-abstraction'
 *
 * const paymasterClient = createPaymasterClient({
 *   transport: http('https://...'),
 * })
 *
 * const userOperation = { ... }
 *
 * const values = await getPaymasterData(paymasterClient, {
 *   chainId: 1,
 *   entryPointAddress: '0x...',
 *   ...userOperation,
 * })
 */
export declare function getPaymasterData(client: Client<Transport>, parameters: GetPaymasterDataParameters): Promise<GetPaymasterDataReturnType>;
//# sourceMappingURL=getPaymasterData.d.ts.map