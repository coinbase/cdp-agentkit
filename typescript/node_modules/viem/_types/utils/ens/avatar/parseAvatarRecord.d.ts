import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Chain } from '../../../types/chain.js';
import type { AssetGatewayUrls } from '../../../types/ens.js';
import { type GetJsonImageErrorType, type GetMetadataAvatarUriErrorType, type GetNftTokenUriErrorType, type ParseAvatarUriErrorType, type ParseNftUriErrorType, type ResolveAvatarUriErrorType } from './utils.js';
export type ParseAvatarRecordErrorType = ParseNftAvatarUriErrorType | ParseAvatarUriErrorType | ErrorType;
export declare function parseAvatarRecord<chain extends Chain | undefined>(client: Client<Transport, chain>, { gatewayUrls, record, }: {
    gatewayUrls?: AssetGatewayUrls | undefined;
    record: string;
}): Promise<string>;
type ParseNftAvatarUriErrorType = ParseNftUriErrorType | GetNftTokenUriErrorType | ResolveAvatarUriErrorType | ParseAvatarUriErrorType | GetJsonImageErrorType | GetMetadataAvatarUriErrorType | ErrorType;
export {};
//# sourceMappingURL=parseAvatarRecord.d.ts.map