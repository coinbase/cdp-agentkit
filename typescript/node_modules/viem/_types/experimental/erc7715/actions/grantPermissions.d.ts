import type { Address } from 'abitype';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { Account } from '../../../types/account.js';
import type { Hex } from '../../../types/misc.js';
import type { OneOf } from '../../../types/utils.js';
import type { Permission } from '../types/permission.js';
import type { Signer } from '../types/signer.js';
export type GrantPermissionsParameters = {
    /** Timestamp (in seconds) that specifies the time by which this session MUST expire. */
    expiry: number;
    /** Set of permissions to grant to the user. */
    permissions: readonly Permission[];
} & OneOf<{
    /** Signer to assign the permissions to. */
    signer?: Signer | undefined;
} | {
    /** Account to assign the permissions to. */
    account?: Address | Account | undefined;
}>;
export type GrantPermissionsReturnType = {
    /** Timestamp (in seconds) that specifies the time by which this session MUST expire. */
    expiry: number;
    /** ERC-4337 Factory to deploy smart contract account. */
    factory?: Hex | undefined;
    /** Calldata to use when calling the ERC-4337 Factory. */
    factoryData?: string | undefined;
    /** Set of granted permissions. */
    grantedPermissions: readonly Permission[];
    /** Permissions identifier. */
    permissionsContext: string;
    /** Signer attached to the permissions. */
    signerData?: {
        userOpBuilder?: Hex | undefined;
        submitToAddress?: Hex | undefined;
    } | undefined;
};
/**
 * Request permissions from a wallet to perform actions on behalf of a user.
 *
 * - Docs: https://viem.sh/experimental/erc7715/grantPermissions
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { grantPermissions } from 'viem/experimental'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 *
 * const result = await grantPermissions(client, {
 *   expiry: 1716846083638,
 *   permissions: [
 *     {
 *       type: 'native-token-transfer',
 *       data: {
 *         ticker: 'ETH',
 *       },
 *       policies: [
 *         {
 *           type: 'token-allowance',
 *           data: {
 *             allowance: parseEther('1'),
 *           },
 *         }
 *       ],
 *       required: true,
 *     },
 *   ],
 * })
 */
export declare function grantPermissions(client: Client<Transport>, parameters: GrantPermissionsParameters): Promise<GrantPermissionsReturnType>;
//# sourceMappingURL=grantPermissions.d.ts.map