"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicActionsL1 = publicActionsL1;
const getL1Allowance_js_1 = require("../actions/getL1Allowance.js");
const getL1Balance_js_1 = require("../actions/getL1Balance.js");
const getL1TokenBalance_js_1 = require("../actions/getL1TokenBalance.js");
function publicActionsL1() {
    return (client) => ({
        getL1Allowance: (args) => (0, getL1Allowance_js_1.getL1Allowance)(client, args),
        getL1TokenBalance: (args) => (0, getL1TokenBalance_js_1.getL1TokenBalance)(client, args),
        getL1Balance: (args) => (0, getL1Balance_js_1.getL1Balance)(client, args),
    });
}
//# sourceMappingURL=publicL1.js.map