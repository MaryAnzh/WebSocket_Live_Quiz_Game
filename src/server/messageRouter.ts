import type { WebSocket } from 'ws';

import * as C from '../constants/index';
import * as F from '../handlers/index';
import type * as T from '../types/index';

type HandlerMap = {
    [C.COMMANDS.REG]: (ws: WebSocket, data: T.RegData) => void;
};

const handlers: HandlerMap = {
    [C.COMMANDS.REG]: F.regHandler
};

export function routeMessage(ws: WebSocket, raw: string) {
    let msg: T.IncomingMessage;

    try {
        msg = JSON.parse(raw);
    } catch {
        ws.send(JSON.stringify({
            type: 'error',
            data: { error: true, errorText: C.INVALID_JSON },
            id: 0
        }));
        return;
    }

    const handler = handlers[msg.type];

    if (!handler) {
        ws.send(JSON.stringify({
            type: 'error',
            data: { error: true, errorText: `${C.UNKNOWN_COMMAND}: ${msg.type}` },
            id: 0
        }));
        return;
    }

    handler(ws, msg.data);
}