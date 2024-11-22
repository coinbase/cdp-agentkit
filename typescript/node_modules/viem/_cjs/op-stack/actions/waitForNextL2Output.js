"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForNextL2Output = waitForNextL2Output;
const contract_js_1 = require("../../errors/contract.js");
const poll_js_1 = require("../../utils/poll.js");
const getL2Output_js_1 = require("./getL2Output.js");
const getTimeToNextL2Output_js_1 = require("./getTimeToNextL2Output.js");
async function waitForNextL2Output(client, parameters) {
    const { pollingInterval = client.pollingInterval } = parameters;
    const { seconds } = await (0, getTimeToNextL2Output_js_1.getTimeToNextL2Output)(client, parameters);
    return new Promise((resolve, reject) => {
        (0, poll_js_1.poll)(async ({ unpoll }) => {
            try {
                const output = await (0, getL2Output_js_1.getL2Output)(client, parameters);
                unpoll();
                resolve(output);
            }
            catch (e) {
                const error = e;
                if (!(error.cause instanceof contract_js_1.ContractFunctionRevertedError)) {
                    unpoll();
                    reject(e);
                }
            }
        }, {
            interval: pollingInterval,
            initialWaitTime: async () => seconds * 1000,
        });
    });
}
//# sourceMappingURL=waitForNextL2Output.js.map