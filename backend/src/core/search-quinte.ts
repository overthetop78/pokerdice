import { UserResult } from "./user-result.interface";
import { ValueName } from "./value-name.enum";


export function SearchQuinte(userResult: UserResult,
    dice1Count: number, dice2Count: number, dice3Count: number,
    dice4Count: number, dice5Count: number, dice6Count: number): UserResult {
    // recherche des quintes
    if (dice1Count === 5) {
        userResult.quinte = 1;
        userResult.result = ValueName.QUINTE;
    } else if (dice2Count === 5) {
        userResult.quinte = 2;
        userResult.result = ValueName.QUINTE;
    } else if (dice3Count === 5) {
        userResult.quinte = 3;
        userResult.result = ValueName.QUINTE;
    } else if (dice4Count === 5) {
        userResult.quinte = 4;
        userResult.result = ValueName.QUINTE;
    } else if (dice5Count === 5) {
        userResult.quinte = 5;
        userResult.result = ValueName.QUINTE;
    } else if (dice6Count === 5) {
        userResult.quinte = 6;
        userResult.result = ValueName.QUINTE;
    }
    return userResult;
}