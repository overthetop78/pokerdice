import { UserResult } from "./user-result.interface";
import { ValueName } from "./value-name.enum";


export function SearchPaire(userResult: UserResult,
    dice1Count: number, dice2Count: number, dice3Count: number,
    dice4Count: number, dice5Count: number, dice6Count: number): UserResult {
    let paire1: number = 0;
    let paire2: number = 0;

    if (userResult.petiteSuite === 0) {
        // recherche des doubles
        if (dice1Count === 2) {
            if (paire1 === 0) {
                paire1 = 1;
            } else {
                paire2 = 1;
            }
        }
        if (dice2Count === 2) {
            if (paire1 === 0) {
                paire1 = 2;
            } else {
                paire2 = 2;
            }
        }
        if (dice3Count === 2) {
            if (paire1 === 0) {
                paire1 = 3;
            } else {
                paire2 = 3;
            }
        }
        if (dice4Count === 2) {
            if (paire1 === 0) {
                paire1 = 4;
            } else {
                paire2 = 4;
            }
        }
        if (dice5Count === 2) {
            if (paire1 === 0) {
                paire1 = 5;
            } else {
                paire2 = 5;
            }
        }
        if (dice6Count === 2) {
            if (paire1 === 0) {
                paire1 = 6;
            } else {
                paire2 = 6;
            }
        }
        if (paire1 !== 0 && paire2 !== 0) {
            if (paire1 > paire2) {
                userResult.paire1 = paire1;
                userResult.paire2 = paire2;
                userResult.result = ValueName.DOUBLE_PAIRE;
            }
            if (paire2 > paire1) {
                userResult.paire1 = paire2;
                userResult.paire2 = paire1;
                userResult.result = ValueName.DOUBLE_PAIRE;
            }
        }
        else if (paire1 !== 0 && paire2 === 0) {
            userResult.paire1 = paire1;
            if (userResult.brelan !== 0) {
                userResult.result = ValueName.FULL;
            }
            else {
                userResult.result = ValueName.PAIRE;
            }
        }
        else if (paire1 === 0 && userResult.brelan !== 0) {
            userResult.result = ValueName.BRELAN;
        }
    }
    return userResult;
}