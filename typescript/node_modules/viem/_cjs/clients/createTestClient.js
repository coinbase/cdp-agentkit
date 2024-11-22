"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestClient = createTestClient;
const createClient_js_1 = require("./createClient.js");
const test_js_1 = require("./decorators/test.js");
function createTestClient(parameters) {
    const { key = 'test', name = 'Test Client', mode } = parameters;
    const client = (0, createClient_js_1.createClient)({
        ...parameters,
        key,
        name,
        type: 'testClient',
    });
    return client.extend((config) => ({
        mode,
        ...(0, test_js_1.testActions)({ mode })(config),
    }));
}
//# sourceMappingURL=createTestClient.js.map