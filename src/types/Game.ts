import * as C from '../constants';

import type { Player } from './Player';
import type { Question } from './Question';

export interface Game {
    id: string;
    code: string;            // 6-character alphanumeric code
    hostId: number | string;
    questions: Question[];
    players: Player[];
    /** index of current question (-1 before start) */
    currentQuestion: number;
    status: typeof C.WAITING | typeof C.IN_PROGRESS | typeof C.FINISHED;
}