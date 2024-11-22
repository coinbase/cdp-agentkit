"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = path;
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
function path(name) {
    const __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
    const __dirname = (0, node_path_1.dirname)(__filename);
    return (0, node_path_1.resolve)(__dirname, `./setups/${name}.json`);
}
//# sourceMappingURL=paths.js.map