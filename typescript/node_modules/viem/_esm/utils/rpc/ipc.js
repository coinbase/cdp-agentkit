import { connect } from 'node:net';
import { WebSocketRequestError } from '../../index.js';
import { getSocketRpcClient, } from './socket.js';
const openingBrace = '{'.charCodeAt(0);
const closingBrace = '}'.charCodeAt(0);
/** @internal */
export function extractMessages(buffer) {
    const messages = [];
    let cursor = 0;
    let level = 0;
    for (let i = 0; i < buffer.length; i++) {
        if (buffer[i] === openingBrace)
            level++;
        if (buffer[i] === closingBrace)
            level--;
        if (level === 0) {
            const message = buffer.subarray(cursor, i + 1);
            if (message[0] === openingBrace &&
                message[message.length - 1] === closingBrace)
                messages.push(message);
            cursor = i + 1;
        }
    }
    return [messages, buffer.subarray(cursor)];
}
export async function getIpcRpcClient(path, options = {}) {
    const { reconnect } = options;
    return getSocketRpcClient({
        async getSocket({ onError, onOpen, onResponse }) {
            const socket = connect(path);
            function onClose() {
                socket.off('close', onClose);
                socket.off('message', onData);
                socket.off('error', onError);
                socket.off('connect', onOpen);
            }
            let lastRemaining = Buffer.alloc(0);
            function onData(buffer) {
                const [messages, remaining] = extractMessages(Buffer.concat([
                    Uint8Array.from(lastRemaining),
                    Uint8Array.from(buffer),
                ]));
                for (const message of messages) {
                    const response = JSON.parse(Buffer.from(message).toString());
                    onResponse(response);
                }
                lastRemaining = remaining;
            }
            socket.on('close', onClose);
            socket.on('data', onData);
            socket.on('error', onError);
            socket.on('connect', onOpen);
            // Wait for the socket to open.
            await new Promise((resolve, reject) => {
                socket.on('ready', () => {
                    resolve();
                    socket.off('error', reject);
                });
                socket.on('error', reject);
            });
            return Object.assign(socket, {
                close() {
                    socket.destroy();
                    socket.end();
                },
                request({ body }) {
                    if (socket.readyState !== 'open')
                        throw new WebSocketRequestError({
                            body,
                            url: path,
                            details: 'Socket is closed.',
                        });
                    return socket.write(JSON.stringify(body));
                },
            });
        },
        reconnect,
        url: path,
    });
}
//# sourceMappingURL=ipc.js.map