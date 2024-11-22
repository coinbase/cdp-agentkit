import type { Address } from 'abitype';
import { type ReadContractErrorType } from '../../../actions/public/readContract.js';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import { type EnsAvatarInvalidMetadataErrorType, type EnsAvatarInvalidNftUriErrorType, type EnsAvatarUnsupportedNamespaceErrorType, type EnsAvatarUriResolutionErrorType } from '../../../errors/ens.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Chain } from '../../../types/chain.js';
import type { AssetGatewayUrls } from '../../../types/ens.js';
type UriItem = {
    uri: string;
    isOnChain: boolean;
    isEncoded: boolean;
};
type IsImageUriErrorType = ErrorType;
/** @internal */
export declare function isImageUri(uri: string): Promise<unknown>;
type GetGatewayErrorType = ErrorType;
/** @internal */
export declare function getGateway(custom: string | undefined, defaultGateway: string): string;
export type ResolveAvatarUriErrorType = GetGatewayErrorType | EnsAvatarUriResolutionErrorType | ErrorType;
export declare function resolveAvatarUri({ uri, gatewayUrls, }: {
    uri: string;
    gatewayUrls?: AssetGatewayUrls | undefined;
}): UriItem;
export type GetJsonImageErrorType = EnsAvatarInvalidMetadataErrorType | ErrorType;
export declare function getJsonImage(data: any): any;
export type GetMetadataAvatarUriErrorType = EnsAvatarUriResolutionErrorType | ParseAvatarUriErrorType | GetJsonImageErrorType | ErrorType;
export declare function getMetadataAvatarUri({ gatewayUrls, uri, }: {
    gatewayUrls?: AssetGatewayUrls | undefined;
    uri: string;
}): Promise<string>;
export type ParseAvatarUriErrorType = ResolveAvatarUriErrorType | IsImageUriErrorType | EnsAvatarUriResolutionErrorType | ErrorType;
export declare function parseAvatarUri({ gatewayUrls, uri, }: {
    gatewayUrls?: AssetGatewayUrls | undefined;
    uri: string;
}): Promise<string>;
type ParsedNft = {
    chainID: number;
    namespace: string;
    contractAddress: Address;
    tokenID: string;
};
export type ParseNftUriErrorType = EnsAvatarInvalidNftUriErrorType | ErrorType;
export declare function parseNftUri(uri_: string): ParsedNft;
export type GetNftTokenUriErrorType = ReadContractErrorType | EnsAvatarUnsupportedNamespaceErrorType | ErrorType;
export declare function getNftTokenUri<chain extends Chain | undefined>(client: Client<Transport, chain>, { nft }: {
    nft: ParsedNft;
}): Promise<string>;
export {};
//# sourceMappingURL=utils.d.ts.map