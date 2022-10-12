import { IDice } from "./i-dice";
import { IOwner } from "./i-owner";

export enum ValidPlay {
    ACCEPTED = 'ACCEPTED',
    WAITING_TOUR = 'WAITING_TOUR',
    WAITING_PLAYING = 'WAITING_PLAYING',
    PLAYING = 'PLAYING',
    FINISHED = 'FINISHED',
}

export interface IPlayer {
    id: number;
    position: number;
    tour: number;
    points: number;
    win: number;
    lose: number;
    draw: number;
    validPlay: ValidPlay;
    user: IOwner;
    dices: IDice[];
}