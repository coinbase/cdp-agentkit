import type { Client } from '../clients/createClient.js';
import type { PublicActions } from '../clients/decorators/public.js';
import type { WalletActions } from '../clients/decorators/wallet.js';
import type { Transport } from '../clients/transports/createTransport.js';
import type { Account } from '../types/account.js';
import type { Chain } from '../types/chain.js';
import type { RpcSchema } from '../types/eip1193.js';
/**
 * Retrieves and returns an action from the client (if exists), and falls
 * back to the tree-shakable action.
 *
 * Useful for extracting overridden actions from a client (ie. if a consumer
 * wants to override the `sendTransaction` implementation).
 */
export declare function getAction<transport extends Transport, chain extends Chain | undefined, account extends Account | undefined, rpcSchema extends RpcSchema | undefined, extended extends {
    [key: string]: unknown;
}, client extends Client<transport, chain, account, rpcSchema, extended>, parameters, returnType>(client: client, actionFn: (_: any, parameters: parameters) => returnType, name: keyof PublicActions | keyof WalletActions | (string & {})): (parameters: parameters) => returnType;
//# sourceMappingURL=getAction.d.ts.map