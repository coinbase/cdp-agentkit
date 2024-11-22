"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUri = isUri;
function isUri(value) {
    if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value))
        return false;
    if (/%[^0-9a-f]/i.test(value))
        return false;
    if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value))
        return false;
    const splitted = splitUri(value);
    const scheme = splitted[1];
    const authority = splitted[2];
    const path = splitted[3];
    const query = splitted[4];
    const fragment = splitted[5];
    if (!(scheme?.length && path.length >= 0))
        return false;
    if (authority?.length) {
        if (!(path.length === 0 || /^\//.test(path)))
            return false;
    }
    else {
        if (/^\/\//.test(path))
            return false;
    }
    if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase()))
        return false;
    let out = '';
    out += `${scheme}:`;
    if (authority?.length)
        out += `//${authority}`;
    out += path;
    if (query?.length)
        out += `?${query}`;
    if (fragment?.length)
        out += `#${fragment}`;
    return out;
}
function splitUri(value) {
    return value.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
}
//# sourceMappingURL=utils.js.map