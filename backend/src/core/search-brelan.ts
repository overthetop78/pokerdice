import { UserResult } from "./user-result.interface";

export function SearchBrelan(userResult: UserResult,
    dice1Count: number, dice2Count: number, dice3Count: number,
    dice4Count: number, dice5Count: number, dice6Count: number): UserResult {
    // recherche des brelans
    if (dice1Count === 3) {
        userResult.brelan = 1;
    }
    if (dice2Count === 3) {
        userResult.brelan = 2;
    }
    if (dice3Count === 3) {
        userResult.brelan = 3;
    }
    if (dice4Count === 3) {
        userResult.brelan = 4;
    }
    if (dice5Count === 3) {
        userResult.brelan = 5;
    }
    if (dice6Count === 3) {
        userResult.brelan = 6;
    }
    return userResult;
}