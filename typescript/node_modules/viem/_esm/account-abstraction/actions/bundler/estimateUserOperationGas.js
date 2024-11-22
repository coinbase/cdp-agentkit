import { parseAccount, } from '../../../accounts/utils/parseAccount.js';
import { AccountNotFoundError } from '../../../errors/account.js';
import { getAction } from '../../../utils/getAction.js';
import { serializeStateOverride } from '../../../utils/stateOverride.js';
import { getUserOperationError } from '../../utils/errors/getUserOperationError.js';
import { formatUserOperationGas, } from '../../utils/formatters/userOperationGas.js';
import { formatUserOperationRequest, } from '../../utils/formatters/userOperationRequest.js';
import { prepareUserOperation, } from './prepareUserOperation.js';
/**
 * Returns an estimate of gas values necessary to execute the User Operation.
 *
 * - Docs: https://viem.sh/actions/bundler/estimateUserOperationGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateUserOperationGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateUserOperationGasReturnType}
 *
 * @example
 * import { createBundlerClient, http, parseEther } from 'viem'
 * import { toSmartAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { estimateUserOperationGas } from 'viem/actions'
 *
 * const account = await toSmartAccount({ ... })
 *
 * const bundlerClient = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const values = await estimateUserOperationGas(bundlerClient, {
 *   account,
 *   calls: [{ to: '0x...', value: parseEther('1') }],
 * })
 */
export async function estimateUserOperationGas(client, parameters) {
    const { account: account_ = client.account, entryPointAddress, stateOverride, } = parameters;
    if (!account_ && !parameters.sender)
        throw new AccountNotFoundError();
    const account = account_ ? parseAccount(account_) : undefined;
    const rpcStateOverride = serializeStateOverride(stateOverride);
    const request = account
        ? await getAction(client, prepareUserOperation, 'prepareUserOperation')({
            ...parameters,
            parameters: ['factory', 'nonce', 'paymaster', 'signature'],
        })
        : parameters;
    try {
        const params = [
            formatUserOperationRequest(request),
            (entryPointAddress ?? account?.entryPoint?.address),
        ];
        const result = await client.request({
            method: 'eth_estimateUserOperationGas',
            params: rpcStateOverride ? [...params, rpcStateOverride] : [...params],
        });
        return formatUserOperationGas(result);
    }
    catch (error) {
        const calls = parameters.calls;
        throw getUserOperationError(error, {
            ...request,
            ...(calls ? { calls } : {}),
        });
    }
}
//# sourceMappingURL=estimateUserOperationGas.js.map