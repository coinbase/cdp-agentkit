"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAction = getAction;
function getAction(client, actionFn, name) {
    const action_implicit = client[actionFn.name];
    if (typeof action_implicit === 'function')
        return action_implicit;
    const action_explicit = client[name];
    if (typeof action_explicit === 'function')
        return action_explicit;
    return (params) => actionFn(client, params);
}
//# sourceMappingURL=getAction.js.map