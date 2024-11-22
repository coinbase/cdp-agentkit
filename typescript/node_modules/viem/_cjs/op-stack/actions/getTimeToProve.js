"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeToProve = getTimeToProve;
const getPortalVersion_js_1 = require("./getPortalVersion.js");
const getTimeToNextGame_js_1 = require("./getTimeToNextGame.js");
const getTimeToNextL2Output_js_1 = require("./getTimeToNextL2Output.js");
async function getTimeToProve(client, parameters) {
    const { receipt } = parameters;
    const portalVersion = await (0, getPortalVersion_js_1.getPortalVersion)(client, parameters);
    if (portalVersion.major < 3)
        return (0, getTimeToNextL2Output_js_1.getTimeToNextL2Output)(client, {
            ...parameters,
            l2BlockNumber: receipt.blockNumber,
        });
    return (0, getTimeToNextGame_js_1.getTimeToNextGame)(client, {
        ...parameters,
        l2BlockNumber: receipt.blockNumber,
    });
}
//# sourceMappingURL=getTimeToProve.js.map