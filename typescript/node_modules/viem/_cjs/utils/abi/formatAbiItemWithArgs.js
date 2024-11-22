"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAbiItemWithArgs = formatAbiItemWithArgs;
const stringify_js_1 = require("../stringify.js");
function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false, }) {
    if (!('name' in abiItem))
        return;
    if (!('inputs' in abiItem))
        return;
    if (!abiItem.inputs)
        return;
    return `${includeFunctionName ? abiItem.name : ''}(${abiItem.inputs
        .map((input, i) => `${includeName && input.name ? `${input.name}: ` : ''}${typeof args[i] === 'object' ? (0, stringify_js_1.stringify)(args[i]) : args[i]}`)
        .join(', ')})`;
}
//# sourceMappingURL=formatAbiItemWithArgs.js.map