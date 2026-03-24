import type { WebSocket } from 'ws';

import * as C from '../constants/index';
import * as F from '../handlers/index';
import type * as T from '../types/index';

type HandlerMap = {
    [C.COMMANDS.REG]: (ws: WebSocket, data: T.RegData, id: number) => void;
    [C.COMMANDS.CREATE_GAME]: (ws: WebSocket, data: T.CreateGameData, id: number) => void;
};

const handlers: HandlerMap = {
    [C.COMMANDS.REG]: F.regHandler,
    [C.COMMANDS.CREATE_GAME]: F.createGameHandler
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
    const { type, data, id } = msg;

    const handler = handlers[type];

    if (!handler) {
        ws.send(JSON.stringify({
            type: 'error',
            data: { error: true, errorText: `${C.UNKNOWN_COMMAND}: ${msg.type}` },
            id
        }));
        return;
    }

    if (type === C.COMMANDS.REG) {
        handlers[type](ws, data, id);
        return;
    }

    if (type === C.COMMANDS.CREATE_GAME) {
        handlers[type](ws, data, id);
        return;
    }


}