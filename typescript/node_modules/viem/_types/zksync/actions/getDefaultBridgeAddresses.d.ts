import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { BridgeContractAddresses } from '../types/contract.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
export type GetDefaultBridgeAddressesReturnType = BridgeContractAddresses;
export declare function getDefaultBridgeAddresses<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>): Promise<GetDefaultBridgeAddressesReturnType>;
//# sourceMappingURL=getDefaultBridgeAddresses.d.ts.map