"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForNextGame = waitForNextGame;
const poll_js_1 = require("../../utils/poll.js");
const withdrawal_js_1 = require("../errors/withdrawal.js");
const getGame_js_1 = require("./getGame.js");
const getTimeToNextGame_js_1 = require("./getTimeToNextGame.js");
async function waitForNextGame(client, parameters) {
    const { pollingInterval = client.pollingInterval } = parameters;
    const { seconds } = await (0, getTimeToNextGame_js_1.getTimeToNextGame)(client, parameters);
    return new Promise((resolve, reject) => {
        (0, poll_js_1.poll)(async ({ unpoll }) => {
            try {
                const game = await (0, getGame_js_1.getGame)(client, {
                    ...parameters,
                    strategy: 'random',
                });
                unpoll();
                resolve(game);
            }
            catch (e) {
                const error = e;
                if (!(error instanceof withdrawal_js_1.GameNotFoundError)) {
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
//# sourceMappingURL=waitForNextGame.js.map