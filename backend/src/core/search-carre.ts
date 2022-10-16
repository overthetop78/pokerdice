import { UserResult } from "./user-result.interface";
import { ValueName } from "./value-name.enum";


export function SearchCarre(userResult: UserResult,
    dice1Count: number, dice2Count: number, dice3Count: number,
    dice4Count: number, dice5Count: number, dice6Count: number): UserResult {
    // recherche des carrés
    if (dice1Count === 4) {
        userResult.carre = 1;
        userResult.result = ValueName.CARRE;
    }
    if (dice2Count === 4) {
        userResult.carre = 2;
        userResult.result = ValueName.CARRE;
    }
    if (dice3Count === 4) {
        userResult.carre = 3;
        userResult.result = ValueName.CARRE;
    }
    if (dice4Count === 4) {
        userResult.carre = 4;
        userResult.result = ValueName.CARRE;
    }
    if (dice5Count === 4) {
        userResult.carre = 5;
        userResult.result = ValueName.CARRE;
    }
    if (dice6Count === 4) {
        userResult.carre = 6;
        userResult.result = ValueName.CARRE;
    }
    return userResult;
}