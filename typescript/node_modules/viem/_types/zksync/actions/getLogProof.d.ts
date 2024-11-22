import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { Hash } from '../../types/misc.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
import type { MessageProof } from '../types/proof.js';
export type GetLogProofParameters = {
    txHash: Hash;
    index?: number | undefined;
};
export type GetLogProofReturnType = MessageProof | null;
export declare function getLogProof<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>, parameters: GetLogProofParameters): Promise<MessageProof | null>;
//# sourceMappingURL=getLogProof.d.ts.map