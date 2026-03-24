import * as C from '../constants/index';

export type RegData = {
    name: string;
    password: string;
}

export type IncomingMessage =
    | {
        type: typeof C.COMMANDS.REG;
        data: RegData;
        id: number;
    };

export type OutgoingMessage<T = unknown> = {
    type: string;
    data: T;
    id: number;
}