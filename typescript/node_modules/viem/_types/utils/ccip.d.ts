import type { Address } from 'abitype';
import { type CallParameters } from '../actions/public/call.js';
import type { Transport } from '../clients/transports/createTransport.js';
import { type OffchainLookupErrorType as OffchainLookupErrorType_, type OffchainLookupResponseMalformedErrorType } from '../errors/ccip.js';
import { type HttpRequestErrorType } from '../errors/request.js';
import type { Chain } from '../types/chain.js';
import type { Hex } from '../types/misc.js';
import type { Client } from '../clients/createClient.js';
import type { ErrorType } from '../errors/utils.js';
export declare const offchainLookupSignature = "0x556f1830";
export declare const offchainLookupAbiItem: {
    readonly name: "OffchainLookup";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly name: "urls";
        readonly type: "string[]";
    }, {
        readonly name: "callData";
        readonly type: "bytes";
    }, {
        readonly name: "callbackFunction";
        readonly type: "bytes4";
    }, {
        readonly name: "extraData";
        readonly type: "bytes";
    }];
};
export type OffchainLookupErrorType = OffchainLookupErrorType_ | ErrorType;
export declare function offchainLookup<chain extends Chain | undefined>(client: Client<Transport, chain>, { blockNumber, blockTag, data, to, }: Pick<CallParameters, 'blockNumber' | 'blockTag'> & {
    data: Hex;
    to: Address;
}): Promise<Hex>;
export type CcipRequestParameters = {
    data: Hex;
    sender: Address;
    urls: readonly string[];
};
export type CcipRequestReturnType = Hex;
export type CcipRequestErrorType = HttpRequestErrorType | OffchainLookupResponseMalformedErrorType | ErrorType;
export declare function ccipRequest({ data, sender, urls, }: CcipRequestParameters): Promise<CcipRequestReturnType>;
//# sourceMappingURL=ccip.d.ts.map