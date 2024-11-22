"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitToFinalize = waitToFinalize;
const wait_js_1 = require("../../utils/wait.js");
const getTimeToFinalize_js_1 = require("./getTimeToFinalize.js");
async function waitToFinalize(client, parameters) {
    const { seconds } = await (0, getTimeToFinalize_js_1.getTimeToFinalize)(client, parameters);
    await (0, wait_js_1.wait)(seconds * 1000);
}
//# sourceMappingURL=waitToFinalize.js.map