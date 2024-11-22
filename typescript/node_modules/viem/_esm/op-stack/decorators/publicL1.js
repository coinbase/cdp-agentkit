import { buildInitiateWithdrawal, } from '../actions/buildInitiateWithdrawal.js';
import { estimateDepositTransactionGas, } from '../actions/estimateDepositTransactionGas.js';
import { estimateFinalizeWithdrawalGas, } from '../actions/estimateFinalizeWithdrawalGas.js';
import { estimateProveWithdrawalGas, } from '../actions/estimateProveWithdrawalGas.js';
import { getGame, } from '../actions/getGame.js';
import { getGames, } from '../actions/getGames.js';
import { getL2Output, } from '../actions/getL2Output.js';
import { getPortalVersion, } from '../actions/getPortalVersion.js';
import { getTimeToFinalize, } from '../actions/getTimeToFinalize.js';
import { getTimeToNextGame, } from '../actions/getTimeToNextGame.js';
import { getTimeToNextL2Output, } from '../actions/getTimeToNextL2Output.js';
import { getTimeToProve, } from '../actions/getTimeToProve.js';
import { getWithdrawalStatus, } from '../actions/getWithdrawalStatus.js';
import { waitForNextGame, } from '../actions/waitForNextGame.js';
import { waitForNextL2Output, } from '../actions/waitForNextL2Output.js';
import { waitToFinalize, } from '../actions/waitToFinalize.js';
import { waitToProve, } from '../actions/waitToProve.js';
/**
 * A suite of Public Actions for suited for development with Layer 2 (OP Stack) chains.
 *
 * - Docs: https://viem.sh/op-stack/client
 *
 * @example
 * import { publicActionsL1 } from 'viem/op-stack'
 * import { mainnet } from 'viem/chains'
 * import { buildDepositTransaction } from 'viem/wallet'
 *
 * export const opStackPublicClientL1 = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * }).extend(publicActionsL1())
 */
export function publicActionsL1() {
    return (client) => {
        return {
            buildInitiateWithdrawal: (args) => buildInitiateWithdrawal(client, args),
            estimateDepositTransactionGas: (args) => estimateDepositTransactionGas(client, args),
            estimateFinalizeWithdrawalGas: (args) => estimateFinalizeWithdrawalGas(client, args),
            estimateProveWithdrawalGas: (args) => estimateProveWithdrawalGas(client, args),
            getGame: (args) => getGame(client, args),
            getGames: (args) => getGames(client, args),
            getL2Output: (args) => getL2Output(client, args),
            getPortalVersion: (args) => getPortalVersion(client, args),
            getTimeToFinalize: (args) => getTimeToFinalize(client, args),
            getTimeToNextGame: (args) => getTimeToNextGame(client, args),
            getTimeToNextL2Output: (args) => getTimeToNextL2Output(client, args),
            getTimeToProve: (args) => getTimeToProve(client, args),
            getWithdrawalStatus: (args) => getWithdrawalStatus(client, args),
            waitForNextGame: (args) => waitForNextGame(client, args),
            waitForNextL2Output: (args) => waitForNextL2Output(client, args),
            waitToFinalize: (args) => waitToFinalize(client, args),
            waitToProve: (args) => waitToProve(client, args),
        };
    };
}
//# sourceMappingURL=publicL1.js.map