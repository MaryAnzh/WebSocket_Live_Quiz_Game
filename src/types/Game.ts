import * as C from '../constants';

import type { Player } from './Player';
import type { Question } from './Question';

export type Game = {
    id: string;
    /** 6  charts */
    code: string;
    hostId: number | string;
    questions: Question[];
    players: Player[];
    /** index of current question (-1 before start) */
    currentQuestion: number;
    status: typeof C.WAITING | typeof C.IN_PROGRESS | typeof C.FINISHED;
}

