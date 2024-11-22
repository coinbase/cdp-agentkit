import { hexToBigInt } from '../../../utils/encoding/fromHex.js';
import { numberToHex } from '../../../utils/encoding/toHex.js';
import { formatUserOperationRequest, } from '../../utils/formatters/userOperationRequest.js';
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
export async function getPaymasterStubData(client, parameters) {
    const { chainId, entryPointAddress, context, ...userOperation } = parameters;
    const request = formatUserOperationRequest(userOperation);
    const { paymasterPostOpGasLimit, paymasterVerificationGasLimit, ...rest } = await client.request({
        method: 'pm_getPaymasterStubData',
        params: [
            {
                ...request,
                callGasLimit: request.callGasLimit ?? '0x0',
                verificationGasLimit: request.verificationGasLimit ?? '0x0',
                preVerificationGas: request.preVerificationGas ?? '0x0',
            },
            entryPointAddress,
            numberToHex(chainId),
            context,
        ],
    });
    return {
        ...rest,
        ...(paymasterPostOpGasLimit && {
            paymasterPostOpGasLimit: hexToBigInt(paymasterPostOpGasLimit),
        }),
        ...(paymasterVerificationGasLimit && {
            paymasterVerificationGasLimit: hexToBigInt(paymasterVerificationGasLimit),
        }),
    };
}
//# sourceMappingURL=getPaymasterStubData.js.map