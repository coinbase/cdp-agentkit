"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainConfig = void 0;
const contracts_js_1 = require("../op-stack/contracts.js");
const fees_js_1 = require("./fees.js");
const formatters_js_1 = require("./formatters.js");
const serializers_js_1 = require("./serializers.js");
exports.chainConfig = {
    contracts: contracts_js_1.contracts,
    formatters: formatters_js_1.formatters,
    serializers: serializers_js_1.serializers,
    fees: fees_js_1.fees,
};
//# sourceMappingURL=chainConfig.js.map