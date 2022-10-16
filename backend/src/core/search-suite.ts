import { UserResult } from "./user-result.interface";
import { ValueName } from "./value-name.enum";


export function SearchSuite(userResult: UserResult,
    dice1Count: number, dice2Count: number, dice3Count: number,
    dice4Count: number, dice5Count: number, dice6Count: number): UserResult {
    // recherche des suites
    if (dice1Count === 1 && dice2Count === 1 && dice3Count === 1 && dice4Count === 1 && dice5Count === 1) {
        userResult.grandeSuite = 5;
        userResult.result = ValueName.GRANDE_SUITE;
    }
    else if (dice2Count === 1 && dice3Count === 1 && dice4Count === 1 && dice5Count === 1 && dice6Count === 1) {
        userResult.grandeSuite = 6;
        userResult.result = ValueName.GRANDE_SUITE;
    }
    else if (dice1Count > 0 && dice2Count > 0 && dice3Count > 0 && dice4Count > 0) {
        userResult.petiteSuite = 4;
        userResult.result = ValueName.PETITE_SUITE;
    }
    else if (dice2Count > 0 && dice3Count > 0 && dice4Count > 0 && dice5Count > 0) {
        userResult.petiteSuite = 5;
        userResult.result = ValueName.PETITE_SUITE;
    }
    else if (dice3Count > 0 && dice4Count > 0 && dice5Count > 0 && dice6Count > 0) {
        userResult.petiteSuite = 6;
        userResult.result = ValueName.PETITE_SUITE;
    }
    return userResult;
}