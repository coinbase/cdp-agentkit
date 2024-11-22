"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForUserOperationReceipt = waitForUserOperationReceipt;
const getAction_js_1 = require("../../../utils/getAction.js");
const observe_js_1 = require("../../../utils/observe.js");
const poll_js_1 = require("../../../utils/poll.js");
const stringify_js_1 = require("../../../utils/stringify.js");
const userOperation_js_1 = require("../../errors/userOperation.js");
const getUserOperationReceipt_js_1 = require("./getUserOperationReceipt.js");
function waitForUserOperationReceipt(client, parameters) {
    const { hash, pollingInterval = client.pollingInterval, retryCount, timeout = 120_000, } = parameters;
    let count = 0;
    const observerId = (0, stringify_js_1.stringify)([
        'waitForUserOperationReceipt',
        client.uid,
        hash,
    ]);
    return new Promise((resolve, reject) => {
        const unobserve = (0, observe_js_1.observe)(observerId, { resolve, reject }, (emit) => {
            const done = (fn) => {
                unpoll();
                fn();
                unobserve();
            };
            const unpoll = (0, poll_js_1.poll)(async () => {
                if (retryCount && count >= retryCount)
                    done(() => emit.reject(new userOperation_js_1.WaitForUserOperationReceiptTimeoutError({ hash })));
                try {
                    const receipt = await (0, getAction_js_1.getAction)(client, getUserOperationReceipt_js_1.getUserOperationReceipt, 'getUserOperationReceipt')({ hash });
                    done(() => emit.resolve(receipt));
                }
                catch (err) {
                    const error = err;
                    if (error.name !== 'UserOperationReceiptNotFoundError')
                        done(() => emit.reject(error));
                }
                count++;
            }, {
                emitOnBegin: true,
                interval: pollingInterval,
            });
            if (timeout)
                setTimeout(() => done(() => emit.reject(new userOperation_js_1.WaitForUserOperationReceiptTimeoutError({ hash }))), timeout);
            return unpoll;
        });
    });
}
//# sourceMappingURL=waitForUserOperationReceipt.js.map