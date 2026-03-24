import crypto from 'crypto';

import { playersStore } from '../storage/index';
import { generateId } from '../utils/index';
import * as C from '../constants/index';

export function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function registerOrLogin(name: string, password: string) {
    const existing = playersStore.getByName(name);
    const passwordHash = hashPassword(password);

    if (!existing) {
        const newPlayer = {
            name,
            index: generateId(),
            score: 0,
            passwordHash
        };

        playersStore.add(newPlayer);
        return { player: newPlayer, error: null };
    }

    if (existing.passwordHash !== passwordHash) {
        return { player: null, error: C.WRONG_PASSWORD };
    }

    return { player: existing, error: null };
}