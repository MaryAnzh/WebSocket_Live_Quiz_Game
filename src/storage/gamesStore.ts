import type { Game } from '../types/index';

class GamesStore {
    private games = new Map<string, Game>();

    add(game: Game) {
        this.games.set(game.id, game);
    }

    getById(id: string): Game | undefined {
        return this.games.get(id);
    }

    getByCode(code: string): Game | undefined {
        for (const g of this.games.values()) {
            if (g.code === code) return g;
        }
        return undefined;
    }

    remove(id: string) {
        this.games.delete(id);
    }
}

export const gamesStore = new GamesStore();