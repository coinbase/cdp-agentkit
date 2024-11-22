import type { SendTransactionParameters } from '../../actions/wallet/sendTransaction.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { ChainEIP712 } from '../types/chain.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
export type EstimateGasL1ToL2Parameters<chain extends ChainEIP712 | undefined = ChainEIP712 | undefined, account extends Account | undefined = Account | undefined> = SendTransactionParameters<chain, account>;
export type EstimateGasL1ToL2ReturnType = bigint;
export declare function estimateGasL1ToL2<chain extends ChainEIP712 | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>, parameters: EstimateGasL1ToL2Parameters<chain, account>): Promise<EstimateGasL1ToL2ReturnType>;
//# sourceMappingURL=estimateGasL1ToL2.d.ts.map