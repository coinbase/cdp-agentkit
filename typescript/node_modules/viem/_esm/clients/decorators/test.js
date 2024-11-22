import { dropTransaction, } from '../../actions/test/dropTransaction.js';
import { dumpState, } from '../../actions/test/dumpState.js';
import { getAutomine, } from '../../actions/test/getAutomine.js';
import { getTxpoolContent, } from '../../actions/test/getTxpoolContent.js';
import { getTxpoolStatus, } from '../../actions/test/getTxpoolStatus.js';
import { impersonateAccount, } from '../../actions/test/impersonateAccount.js';
import { increaseTime, } from '../../actions/test/increaseTime.js';
import { inspectTxpool, } from '../../actions/test/inspectTxpool.js';
import { loadState, } from '../../actions/test/loadState.js';
import { mine } from '../../actions/test/mine.js';
import { removeBlockTimestampInterval } from '../../actions/test/removeBlockTimestampInterval.js';
import { reset } from '../../actions/test/reset.js';
import { revert } from '../../actions/test/revert.js';
import { sendUnsignedTransaction, } from '../../actions/test/sendUnsignedTransaction.js';
import { setAutomine } from '../../actions/test/setAutomine.js';
import { setBalance, } from '../../actions/test/setBalance.js';
import { setBlockGasLimit, } from '../../actions/test/setBlockGasLimit.js';
import { setBlockTimestampInterval, } from '../../actions/test/setBlockTimestampInterval.js';
import { setCode } from '../../actions/test/setCode.js';
import { setCoinbase, } from '../../actions/test/setCoinbase.js';
import { setIntervalMining, } from '../../actions/test/setIntervalMining.js';
import { setLoggingEnabled } from '../../actions/test/setLoggingEnabled.js';
import { setMinGasPrice, } from '../../actions/test/setMinGasPrice.js';
import { setNextBlockBaseFeePerGas, } from '../../actions/test/setNextBlockBaseFeePerGas.js';
import { setNextBlockTimestamp, } from '../../actions/test/setNextBlockTimestamp.js';
import { setNonce, } from '../../actions/test/setNonce.js';
import { setRpcUrl } from '../../actions/test/setRpcUrl.js';
import { setStorageAt, } from '../../actions/test/setStorageAt.js';
import { snapshot } from '../../actions/test/snapshot.js';
import { stopImpersonatingAccount, } from '../../actions/test/stopImpersonatingAccount.js';
export function testActions({ mode, }) {
    return (client_) => {
        const client = client_.extend(() => ({
            mode,
        }));
        return {
            dropTransaction: (args) => dropTransaction(client, args),
            dumpState: () => dumpState(client),
            getAutomine: () => getAutomine(client),
            getTxpoolContent: () => getTxpoolContent(client),
            getTxpoolStatus: () => getTxpoolStatus(client),
            impersonateAccount: (args) => impersonateAccount(client, args),
            increaseTime: (args) => increaseTime(client, args),
            inspectTxpool: () => inspectTxpool(client),
            loadState: (args) => loadState(client, args),
            mine: (args) => mine(client, args),
            removeBlockTimestampInterval: () => removeBlockTimestampInterval(client),
            reset: (args) => reset(client, args),
            revert: (args) => revert(client, args),
            sendUnsignedTransaction: (args) => sendUnsignedTransaction(client, args),
            setAutomine: (args) => setAutomine(client, args),
            setBalance: (args) => setBalance(client, args),
            setBlockGasLimit: (args) => setBlockGasLimit(client, args),
            setBlockTimestampInterval: (args) => setBlockTimestampInterval(client, args),
            setCode: (args) => setCode(client, args),
            setCoinbase: (args) => setCoinbase(client, args),
            setIntervalMining: (args) => setIntervalMining(client, args),
            setLoggingEnabled: (args) => setLoggingEnabled(client, args),
            setMinGasPrice: (args) => setMinGasPrice(client, args),
            setNextBlockBaseFeePerGas: (args) => setNextBlockBaseFeePerGas(client, args),
            setNextBlockTimestamp: (args) => setNextBlockTimestamp(client, args),
            setNonce: (args) => setNonce(client, args),
            setRpcUrl: (args) => setRpcUrl(client, args),
            setStorageAt: (args) => setStorageAt(client, args),
            snapshot: () => snapshot(client),
            stopImpersonatingAccount: (args) => stopImpersonatingAccount(client, args),
        };
    };
}
//# sourceMappingURL=test.js.map