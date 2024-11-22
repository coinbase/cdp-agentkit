import { buildDepositTransaction, } from '../actions/buildDepositTransaction.js';
import { buildProveWithdrawal, } from '../actions/buildProveWithdrawal.js';
import { estimateContractL1Fee, } from '../actions/estimateContractL1Fee.js';
import { estimateContractL1Gas, } from '../actions/estimateContractL1Gas.js';
import { estimateContractTotalFee, } from '../actions/estimateContractTotalFee.js';
import { estimateContractTotalGas, } from '../actions/estimateContractTotalGas.js';
import { estimateInitiateWithdrawalGas, } from '../actions/estimateInitiateWithdrawalGas.js';
import { estimateL1Fee, } from '../actions/estimateL1Fee.js';
import { estimateL1Gas, } from '../actions/estimateL1Gas.js';
import { estimateTotalFee, } from '../actions/estimateTotalFee.js';
import { estimateTotalGas, } from '../actions/estimateTotalGas.js';
import { getL1BaseFee, } from '../actions/getL1BaseFee.js';
/**
 * A suite of Public Actions for suited for development with Layer 2 (OP Stack) chains.
 *
 * - Docs: https://viem.sh/op-stack/client
 *
 * @example
 * import { publicActionsL2 } from 'viem/op-stack'
 * import { optimism } from 'viem/chains'
 * import { buildDepositTransaction } from 'viem/wallet'
 *
 * export const opStackPublicClientL2 = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * }).extend(publicActionsL2())
 */
export function publicActionsL2() {
    return (client) => {
        return {
            buildDepositTransaction: (args) => buildDepositTransaction(client, args),
            buildProveWithdrawal: (args) => buildProveWithdrawal(client, args),
            estimateContractL1Fee: (args) => estimateContractL1Fee(client, args),
            estimateContractL1Gas: (args) => estimateContractL1Gas(client, args),
            estimateContractTotalFee: (args) => estimateContractTotalFee(client, args),
            estimateContractTotalGas: (args) => estimateContractTotalGas(client, args),
            estimateInitiateWithdrawalGas: (args) => estimateInitiateWithdrawalGas(client, args),
            estimateL1Fee: (args) => estimateL1Fee(client, args),
            getL1BaseFee: (args) => getL1BaseFee(client, args),
            estimateL1Gas: (args) => estimateL1Gas(client, args),
            estimateTotalFee: (args) => estimateTotalFee(client, args),
            estimateTotalGas: (args) => estimateTotalGas(client, args),
        };
    };
}
//# sourceMappingURL=publicL2.js.map