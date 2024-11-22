import type { SendTransactionParameters } from '../../actions/wallet/sendTransaction.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { ChainEIP712 } from '../types/chain.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
import type { ZksyncFee } from '../types/fee.js';
export type EstimateFeeParameters<chain extends ChainEIP712 | undefined = ChainEIP712 | undefined, account extends Account | undefined = Account | undefined, chainOverride extends ChainEIP712 | undefined = ChainEIP712 | undefined> = SendTransactionParameters<chain, account, chainOverride>;
export type EstimateFeeReturnType = ZksyncFee;
export declare function estimateFee<chain extends ChainEIP712 | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>, parameters: EstimateFeeParameters<chain, account>): Promise<EstimateFeeReturnType>;
//# sourceMappingURL=estimateFee.d.ts.map