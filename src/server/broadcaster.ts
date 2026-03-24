import type { WebSocket } from 'ws';
import { connectionRegistry } from './connectionRegistry';
import type * as T from '../types/index';

export function sendToWs(ws: WebSocket, message: T.OutgoingMessage) {
    ws.send(JSON.stringify(message));
}

export function sendToPlayer(playerId: string, message: T.OutgoingMessage) {
    const ws = connectionRegistry.getConnection(playerId);
    if (ws) ws.send(JSON.stringify(message));
}

export function broadcastToGame(game: T.Game, message: T.OutgoingMessage) {
    for (const player of game.players) {
        const ws = connectionRegistry.getConnection(player.index.toString());
        if (ws) ws.send(JSON.stringify(message));
    }
}

export function sendToHost(game: T.Game, message: T.OutgoingMessage) {
    const ws = connectionRegistry.getConnection(game.hostId.toString());
    if (ws) ws.send(JSON.stringify(message));
}