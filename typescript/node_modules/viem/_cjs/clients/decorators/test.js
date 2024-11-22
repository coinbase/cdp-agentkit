"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testActions = testActions;
const dropTransaction_js_1 = require("../../actions/test/dropTransaction.js");
const dumpState_js_1 = require("../../actions/test/dumpState.js");
const getAutomine_js_1 = require("../../actions/test/getAutomine.js");
const getTxpoolContent_js_1 = require("../../actions/test/getTxpoolContent.js");
const getTxpoolStatus_js_1 = require("../../actions/test/getTxpoolStatus.js");
const impersonateAccount_js_1 = require("../../actions/test/impersonateAccount.js");
const increaseTime_js_1 = require("../../actions/test/increaseTime.js");
const inspectTxpool_js_1 = require("../../actions/test/inspectTxpool.js");
const loadState_js_1 = require("../../actions/test/loadState.js");
const mine_js_1 = require("../../actions/test/mine.js");
const removeBlockTimestampInterval_js_1 = require("../../actions/test/removeBlockTimestampInterval.js");
const reset_js_1 = require("../../actions/test/reset.js");
const revert_js_1 = require("../../actions/test/revert.js");
const sendUnsignedTransaction_js_1 = require("../../actions/test/sendUnsignedTransaction.js");
const setAutomine_js_1 = require("../../actions/test/setAutomine.js");
const setBalance_js_1 = require("../../actions/test/setBalance.js");
const setBlockGasLimit_js_1 = require("../../actions/test/setBlockGasLimit.js");
const setBlockTimestampInterval_js_1 = require("../../actions/test/setBlockTimestampInterval.js");
const setCode_js_1 = require("../../actions/test/setCode.js");
const setCoinbase_js_1 = require("../../actions/test/setCoinbase.js");
const setIntervalMining_js_1 = require("../../actions/test/setIntervalMining.js");
const setLoggingEnabled_js_1 = require("../../actions/test/setLoggingEnabled.js");
const setMinGasPrice_js_1 = require("../../actions/test/setMinGasPrice.js");
const setNextBlockBaseFeePerGas_js_1 = require("../../actions/test/setNextBlockBaseFeePerGas.js");
const setNextBlockTimestamp_js_1 = require("../../actions/test/setNextBlockTimestamp.js");
const setNonce_js_1 = require("../../actions/test/setNonce.js");
const setRpcUrl_js_1 = require("../../actions/test/setRpcUrl.js");
const setStorageAt_js_1 = require("../../actions/test/setStorageAt.js");
const snapshot_js_1 = require("../../actions/test/snapshot.js");
const stopImpersonatingAccount_js_1 = require("../../actions/test/stopImpersonatingAccount.js");
function testActions({ mode, }) {
    return (client_) => {
        const client = client_.extend(() => ({
            mode,
        }));
        return {
            dropTransaction: (args) => (0, dropTransaction_js_1.dropTransaction)(client, args),
            dumpState: () => (0, dumpState_js_1.dumpState)(client),
            getAutomine: () => (0, getAutomine_js_1.getAutomine)(client),
            getTxpoolContent: () => (0, getTxpoolContent_js_1.getTxpoolContent)(client),
            getTxpoolStatus: () => (0, getTxpoolStatus_js_1.getTxpoolStatus)(client),
            impersonateAccount: (args) => (0, impersonateAccount_js_1.impersonateAccount)(client, args),
            increaseTime: (args) => (0, increaseTime_js_1.increaseTime)(client, args),
            inspectTxpool: () => (0, inspectTxpool_js_1.inspectTxpool)(client),
            loadState: (args) => (0, loadState_js_1.loadState)(client, args),
            mine: (args) => (0, mine_js_1.mine)(client, args),
            removeBlockTimestampInterval: () => (0, removeBlockTimestampInterval_js_1.removeBlockTimestampInterval)(client),
            reset: (args) => (0, reset_js_1.reset)(client, args),
            revert: (args) => (0, revert_js_1.revert)(client, args),
            sendUnsignedTransaction: (args) => (0, sendUnsignedTransaction_js_1.sendUnsignedTransaction)(client, args),
            setAutomine: (args) => (0, setAutomine_js_1.setAutomine)(client, args),
            setBalance: (args) => (0, setBalance_js_1.setBalance)(client, args),
            setBlockGasLimit: (args) => (0, setBlockGasLimit_js_1.setBlockGasLimit)(client, args),
            setBlockTimestampInterval: (args) => (0, setBlockTimestampInterval_js_1.setBlockTimestampInterval)(client, args),
            setCode: (args) => (0, setCode_js_1.setCode)(client, args),
            setCoinbase: (args) => (0, setCoinbase_js_1.setCoinbase)(client, args),
            setIntervalMining: (args) => (0, setIntervalMining_js_1.setIntervalMining)(client, args),
            setLoggingEnabled: (args) => (0, setLoggingEnabled_js_1.setLoggingEnabled)(client, args),
            setMinGasPrice: (args) => (0, setMinGasPrice_js_1.setMinGasPrice)(client, args),
            setNextBlockBaseFeePerGas: (args) => (0, setNextBlockBaseFeePerGas_js_1.setNextBlockBaseFeePerGas)(client, args),
            setNextBlockTimestamp: (args) => (0, setNextBlockTimestamp_js_1.setNextBlockTimestamp)(client, args),
            setNonce: (args) => (0, setNonce_js_1.setNonce)(client, args),
            setRpcUrl: (args) => (0, setRpcUrl_js_1.setRpcUrl)(client, args),
            setStorageAt: (args) => (0, setStorageAt_js_1.setStorageAt)(client, args),
            snapshot: () => (0, snapshot_js_1.snapshot)(client),
            stopImpersonatingAccount: (args) => (0, stopImpersonatingAccount_js_1.stopImpersonatingAccount)(client, args),
        };
    };
}
//# sourceMappingURL=test.js.map