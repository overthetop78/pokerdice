import { UserResult } from "./user-result.interface";


export function SearchHighestDice(userResult: UserResult, winner: UserResult, dices: number[]): UserResult | null {
    let userResultDice = userResult.dices;
    let winnerDice = winner.dices;
    let userResultHighestDice = 0;
    let winnerHighestDice = 0;

    userResultDice.forEach((dice: number) => {
        if (dice !== userResult.carre && dice !== userResult.brelan && dice !== userResult.paire1 && dice !== userResult.paire2) {
            if (dices.length === 0) {
                userResultHighestDice = dice;
            }
            else {
                dices.forEach((dice2: number) => {
                    if (dice !== dice2) {
                        userResultHighestDice = dice;
                    }
                });
            }
        }
    });

    winnerDice.forEach((dice: number) => {
        if (dice !== winner.carre && dice !== winner.brelan && dice !== winner.paire1 && dice !== winner.paire2) {
            if (dices.length === 0) {
                winnerHighestDice = dice;
            }
            else {
                dices.forEach((dice2: number) => {
                    if (dice !== dice2) {
                        winnerHighestDice = dice;
                    }
                    else if (dice === dice2) {
                        dices.push(dice);
                    }
                });
            }
        }
    });

    if (userResultHighestDice > winnerHighestDice) {
        winner = userResult;
        return winner;
    }
    else if (userResultHighestDice < winnerHighestDice) {
        return winner;
    }
    else if (userResultHighestDice === winnerHighestDice && dices.length < 4) {
        for (let i = 0; i < 4; i++) {
            if (userResult.dices[i] > winner.dices[i]) {
                winner = userResult;
                return winner;
            }
            else if (userResult.dices[i] < winner.dices[i]) {
                return winner;
            }
            else {
                return null;
            }
        }
    }
    else if (userResultHighestDice === winnerHighestDice && dices.length === 4) {
        return null;
    }
}
