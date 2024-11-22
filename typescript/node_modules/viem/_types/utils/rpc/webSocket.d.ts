import { type GetSocketRpcClientParameters, type SocketRpcClient } from './socket.js';
export type GetWebSocketRpcClientOptions = Pick<GetSocketRpcClientParameters, 'keepAlive' | 'reconnect'>;
export declare function getWebSocketRpcClient(url: string, options?: GetWebSocketRpcClientOptions | undefined): Promise<SocketRpcClient<WebSocket>>;
//# sourceMappingURL=webSocket.d.ts.map