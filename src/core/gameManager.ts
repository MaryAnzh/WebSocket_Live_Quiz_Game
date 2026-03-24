import { gamesStore } from '../storage/index';
import type { Player, JoinGameResult } from '../types/index';
import * as C from '../constants/index';

export function joinGameByCode(code: string, player: Player): JoinGameResult {
    const game = gamesStore.getByCode(code);

    if (!game) {
        return { ok: false, error: C.GAME_NOT_FOUND };
    }

    if (game.status === C.FINISHED) {
        return { ok: false, error: C.GAME_ALREADY_FINISHED };
    }

    if (game.status === C.IN_PROGRESS) {
        return { ok: false, error: C.GAME_ALREADY_STARTED };
    }

    const exists = game.players.some(p => p.index === player.index);
    if (!exists) {
        game.players.push(player);
    }

    return { ok: true, game };
}