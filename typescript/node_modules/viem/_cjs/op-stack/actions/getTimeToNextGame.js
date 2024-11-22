"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeToNextGame = getTimeToNextGame;
const getGames_js_1 = require("./getGames.js");
async function getTimeToNextGame(client, parameters) {
    const { intervalBuffer = 1.1, l2BlockNumber } = parameters;
    const games = await (0, getGames_js_1.getGames)(client, {
        ...parameters,
        l2BlockNumber: undefined,
        limit: 10,
    });
    const deltas = games
        .map(({ l2BlockNumber, timestamp }, index) => {
        return index === games.length - 1
            ? null
            : [
                games[index + 1].timestamp - timestamp,
                games[index + 1].l2BlockNumber - l2BlockNumber,
            ];
    })
        .filter(Boolean);
    const interval = Math.ceil(deltas.reduce((a, [b]) => Number(a) - Number(b), 0) / deltas.length);
    const blockInterval = Math.ceil(deltas.reduce((a, [_, b]) => Number(a) - Number(b), 0) / deltas.length);
    const latestGame = games[0];
    const latestGameTimestamp = Number(latestGame.timestamp) * 1000;
    const intervalWithBuffer = Math.ceil(interval * intervalBuffer);
    const now = Date.now();
    const seconds = (() => {
        if (now < latestGameTimestamp)
            return 0;
        if (latestGame.l2BlockNumber > l2BlockNumber)
            return 0;
        const elapsedBlocks = Number(l2BlockNumber - latestGame.l2BlockNumber);
        const elapsed = Math.ceil((now - latestGameTimestamp) / 1000);
        const secondsToNextOutput = intervalWithBuffer - (elapsed % intervalWithBuffer);
        return elapsedBlocks < blockInterval
            ? secondsToNextOutput
            : Math.floor(elapsedBlocks / Number(blockInterval)) * intervalWithBuffer +
                secondsToNextOutput;
    })();
    const timestamp = seconds > 0 ? now + seconds * 1000 : undefined;
    return { interval, seconds, timestamp };
}
//# sourceMappingURL=getTimeToNextGame.js.map