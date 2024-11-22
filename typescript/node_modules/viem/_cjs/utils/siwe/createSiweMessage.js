"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSiweMessage = createSiweMessage;
const siwe_js_1 = require("../../errors/siwe.js");
const getAddress_js_1 = require("../address/getAddress.js");
const utils_js_1 = require("./utils.js");
function createSiweMessage(parameters) {
    const { chainId, domain, expirationTime, issuedAt = new Date(), nonce, notBefore, requestId, resources, scheme, uri, version, } = parameters;
    {
        if (chainId !== Math.floor(chainId))
            throw new siwe_js_1.SiweInvalidMessageFieldError({
                field: 'chainId',
                metaMessages: [
                    '- Chain ID must be a EIP-155 chain ID.',
                    '- See https://eips.ethereum.org/EIPS/eip-155',
                    '',
                    `Provided value: ${chainId}`,
                ],
            });
        if (!(domainRegex.test(domain) ||
            ipRegex.test(domain) ||
            localhostRegex.test(domain)))
            throw new siwe_js_1.SiweInvalidMessageFieldError({
                field: 'domain',
                metaMessages: [
                    '- Domain must be an RFC 3986 authority.',
                    '- See https://www.rfc-editor.org/rfc/rfc3986',
                    '',
                    `Provided value: ${domain}`,
                ],
            });
        if (!nonceRegex.test(nonce))
            throw new siwe_js_1.SiweInvalidMessageFieldError({
                field: 'nonce',
                metaMessages: [
                    '- Nonce must be at least 8 characters.',
                    '- Nonce must be alphanumeric.',
                    '',
                    `Provided value: ${nonce}`,
                ],
            });
        if (!(0, utils_js_1.isUri)(uri))
            throw new siwe_js_1.SiweInvalidMessageFieldError({
                field: 'uri',
                metaMessages: [
                    '- URI must be a RFC 3986 URI referring to the resource that is the subject of the signing.',
                    '- See https://www.rfc-editor.org/rfc/rfc3986',
                    '',
                    `Provided value: ${uri}`,
                ],
            });
        if (version !== '1')
            throw new siwe_js_1.SiweInvalidMessageFieldError({
                field: 'version',
                metaMessages: [
                    "- Version must be '1'.",
                    '',
                    `Provided value: ${version}`,
                ],
            });
        if (scheme && !schemeRegex.test(scheme))
            throw new siwe_js_1.SiweInvalidMessageFieldError({
                field: 'scheme',
                metaMessages: [
                    '- Scheme must be an RFC 3986 URI scheme.',
                    '- See https://www.rfc-editor.org/rfc/rfc3986#section-3.1',
                    '',
                    `Provided value: ${scheme}`,
                ],
            });
        const statement = parameters.statement;
        if (statement?.includes('\n'))
            throw new siwe_js_1.SiweInvalidMessageFieldError({
                field: 'statement',
                metaMessages: [
                    "- Statement must not include '\\n'.",
                    '',
                    `Provided value: ${statement}`,
                ],
            });
    }
    const address = (0, getAddress_js_1.getAddress)(parameters.address);
    const origin = (() => {
        if (scheme)
            return `${scheme}://${domain}`;
        return domain;
    })();
    const statement = (() => {
        if (!parameters.statement)
            return '';
        return `${parameters.statement}\n`;
    })();
    const prefix = `${origin} wants you to sign in with your Ethereum account:\n${address}\n\n${statement}`;
    let suffix = `URI: ${uri}\nVersion: ${version}\nChain ID: ${chainId}\nNonce: ${nonce}\nIssued At: ${issuedAt.toISOString()}`;
    if (expirationTime)
        suffix += `\nExpiration Time: ${expirationTime.toISOString()}`;
    if (notBefore)
        suffix += `\nNot Before: ${notBefore.toISOString()}`;
    if (requestId)
        suffix += `\nRequest ID: ${requestId}`;
    if (resources) {
        let content = '\nResources:';
        for (const resource of resources) {
            if (!(0, utils_js_1.isUri)(resource))
                throw new siwe_js_1.SiweInvalidMessageFieldError({
                    field: 'resources',
                    metaMessages: [
                        '- Every resource must be a RFC 3986 URI.',
                        '- See https://www.rfc-editor.org/rfc/rfc3986',
                        '',
                        `Provided value: ${resource}`,
                    ],
                });
            content += `\n- ${resource}`;
        }
        suffix += content;
    }
    return `${prefix}\n${suffix}`;
}
const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?$/;
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]{1,5})?$/;
const localhostRegex = /^localhost(:[0-9]{1,5})?$/;
const nonceRegex = /^[a-zA-Z0-9]{8,}$/;
const schemeRegex = /^([a-zA-Z][a-zA-Z0-9+-.]*)$/;
//# sourceMappingURL=createSiweMessage.js.map