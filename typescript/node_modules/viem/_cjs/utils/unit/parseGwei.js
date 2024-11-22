"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGwei = parseGwei;
const unit_js_1 = require("../../constants/unit.js");
const parseUnits_js_1 = require("./parseUnits.js");
function parseGwei(ether, unit = 'wei') {
    return (0, parseUnits_js_1.parseUnits)(ether, unit_js_1.gweiUnits[unit]);
}
//# sourceMappingURL=parseGwei.js.map