import type { WebSocket } from 'ws';

import * as C from '../constants/index';
import * as F from '../handlers/index';
import type * as T from '../types/index';
const { REG, CREATE_GAME, JOIN_GAME } = C.COMMANDS;

type MessageCallbackType<T> = (ws: WebSocket, data: T, id: number) => void;
type HandlerMap = {
    [REG]: MessageCallbackType<T.RegData>,
    [CREATE_GAME]: MessageCallbackType<T.CreateGameData>,
    [JOIN_GAME]: MessageCallbackType<T.JoinGameData>,
};

const handlers: HandlerMap = {
    [REG]: F.regHandler,
    [CREATE_GAME]: F.createGameHandler,
    [JOIN_GAME]: F.joinGameHandler,
};

export function routeMessage(ws: WebSocket, raw: string) {
    let msg: T.MessageDataType;

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

    if (type === REG) {
        handlers[type](ws, data, id);
        return;
    }

    if (type === CREATE_GAME) {
        handlers[type](ws, data, id);
        return;
    }

     if (type === JOIN_GAME) {
        handlers[type](ws, data, id);
        return;
    }
    
}