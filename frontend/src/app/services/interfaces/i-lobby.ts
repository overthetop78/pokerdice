import { IOwner } from "./i-owner";
import { IPlayer } from "./i-player";

export interface ILobby {
    id: number;
    name: string;
    password: string;
    owner: IOwner;
    users: IPlayer[];

}