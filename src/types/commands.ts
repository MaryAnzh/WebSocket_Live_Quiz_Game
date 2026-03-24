import * as C from '../constants/index';
import { Question } from './Question';

export type RegData = {
    name: string;
    password: string;
}

export type CreateGameData = {
    questions: Question[];
};

export type CommandsKeysType = typeof C.COMMANDS.REG | typeof C.COMMANDS.CREATE_GAME

export type IncomingMessage =
    | {
        type: typeof C.COMMANDS.REG;
        data: RegData;
        id: number;
    }
    | {
        type: typeof C.COMMANDS.CREATE_GAME;
        data: CreateGameData;
        id: number;
    };

export type OutgoingMessage = {
    type: CommandsKeysType;
    data: RegData | CreateGameData;
    id: number;
}