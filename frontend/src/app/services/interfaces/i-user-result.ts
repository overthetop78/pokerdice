import { ValueName } from "./value-name.enum";

export interface IUserResult {
    idLobbyUser?: number;
    dices?: number[];
    result?: ValueName;
    paire1?: number;
    paire2?: number;
    brelan?: number;
    carre?: number;
    petiteSuite?: number;
    grandeSuite?: number;
    quinte?: number;
}