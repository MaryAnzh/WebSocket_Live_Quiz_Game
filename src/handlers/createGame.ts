import type { WebSocket } from 'ws';

import { connectionRegistry } from '../server/index';
import { gamesStore } from '../storage/gamesStore';
import { validateQuestions } from '../core/validateQuestions';
import { generateId, generateRoomCode } from '../utils/index';
import * as C from '../constants/index';
import type * as T from '../types/index';

export function createGameHandler(ws: WebSocket, data: T.CreateGameData, id: number) {
    const hostId = connectionRegistry.getPlayerId(ws);

    if (!hostId) {
        ws.send(JSON.stringify({
            type: 'game_created',
            data: {
                gameId: '',
                code: '',
                error: true,
                errorText: 'Not registered'
            },
            id
        }));
        return;
    }

    const validationError = validateQuestions(data.questions);
    if (validationError) {
        ws.send(JSON.stringify({
            type: 'game_created',
            data: {
                gameId: '',
                code: '',
                error: true,
                errorText: validationError
            },
            id
        }));
        return;
    }

    const gameId = generateId();
    const code = generateRoomCode();

    const game: T.Game = {
        id: gameId,
        code,
        hostId,
        questions: data.questions,
        players: [],
        currentQuestion: -1,
        status: C.WAITING
    };

    gamesStore.add(game);

    ws.send(JSON.stringify({
        type: 'game_created',
        data: {
            gameId,
            code,
            error: false,
            errorText: ''
        },
        id
    }));
}