"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainConfig = void 0;
const formatters_js_1 = require("./formatters.js");
const serializers_js_1 = require("./serializers.js");
const getEip712Domain_js_1 = require("./utils/getEip712Domain.js");
exports.chainConfig = {
    formatters: formatters_js_1.formatters,
    serializers: serializers_js_1.serializers,
    custom: {
        getEip712Domain: getEip712Domain_js_1.getEip712Domain,
    },
};
//# sourceMappingURL=chainConfig.js.map