// Adapted from https://github.com/ethereum-optimism/optimism/blob/develop/packages/core-utils/src/optimism/deposit-transaction.ts#L117
import { keccak256 } from '../../utils/hash/keccak256.js';
import { serializeTransaction } from '../serializers.js';
import { getSourceHash } from './getSourceHash.js';
import { opaqueDataToDepositData } from './opaqueDataToDepositData.js';
export function getL2TransactionHash({ log }) {
    const sourceHash = getSourceHash({
        domain: 'userDeposit',
        l1BlockHash: log.blockHash,
        l1LogIndex: log.logIndex,
    });
    const { data, gas, isCreation, mint, value } = opaqueDataToDepositData(log.args.opaqueData);
    return keccak256(serializeTransaction({
        from: log.args.from,
        to: isCreation ? undefined : log.args.to,
        sourceHash,
        data,
        gas,
        isSystemTx: false,
        mint,
        type: 'deposit',
        value,
    }));
}
//# sourceMappingURL=getL2TransactionHash.js.map