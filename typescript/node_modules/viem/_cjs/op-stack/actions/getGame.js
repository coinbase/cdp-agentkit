"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGame = getGame;
const withdrawal_js_1 = require("../errors/withdrawal.js");
const getGames_js_1 = require("./getGames.js");
async function getGame(client, parameters) {
    const { l2BlockNumber, strategy = 'latest' } = parameters;
    const latestGames = await (0, getGames_js_1.getGames)(client, parameters);
    const games = latestGames.filter((game) => game.l2BlockNumber > l2BlockNumber);
    const game = (() => {
        if (strategy === 'random')
            return games[Math.floor(Math.random() * games.length)];
        return games[0];
    })();
    if (!game)
        throw new withdrawal_js_1.GameNotFoundError();
    return game;
}
//# sourceMappingURL=getGame.js.map