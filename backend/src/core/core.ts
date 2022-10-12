import { ValidPlay } from "../lobby-user/dto/lobby-user.dto";
import { DicesService } from "../dices/dices.service";
import { LobbyUserService } from "../lobby-user/lobby-user.service";
import { CoreResultDto } from "./dto/core-result.dto";


export enum ValueName {
    PAIRE = "paire",
    DOUBLE_PAIRE = "double paire",
    BRELAN = "brelan",
    CARRE = "carre",
    FULL = "full",
    PETITE_SUITE = "petite suite",
    GRANDE_SUITE = "grande suite",
    QUINTE = "quinte",
    NULL = "null",
}

export interface UserResult {
    idLobbyUser: number;
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

export class Core {

    constructor(
        private lobbyUserService: LobbyUserService,
        private dicesService: DicesService,
    ) { }

    async CheckRunGame(lobbyId: number): Promise<boolean | number[]> {
        const lobbyUsersId: number[] = [];
        const lobbyUsers = await this.lobbyUserService.findAllByLobby(lobbyId);
        lobbyUsers.forEach((lobbyUser) => {
            if (lobbyUser.validPlay === 'ACCEPTED') {
                lobbyUsersId.push(lobbyUser.id);
            }
        });
        if (lobbyUsersId.length === lobbyUsers.length) {
            return lobbyUsersId;
        } else {
            return false;
        }
    }

    async FinishGame(lobbyId: number): Promise<Boolean> {
        const lobbyUsers = await this.lobbyUserService.findAllByLobby(lobbyId);
        lobbyUsers.forEach((lobbyUser) => {
            if (lobbyUser.validPlay !== ValidPlay.FINISHED) {
                return false;
            }
        });
        return true;
    }

    CalculateScore(lobby: CoreResultDto): UserResult | UserResult[] {

        let usersResult: UserResult[] = [{
            idLobbyUser: 0,
            dices: [],
            result: ValueName.NULL,
            paire1: 0,
            paire2: 0,
            brelan: 0,
            carre: 0,
            petiteSuite: 0,
            grandeSuite: 0,
            quinte: 0
        }];

        lobby.users.forEach((user: { id: number; dices: { value: number; }[] }) => {

            let userLobbyId: number = user.id;
            let dices: number[] = [];
            user.dices.forEach((dice: { value: number; }) => {
                dices.push(dice.value);
            });

            // recherche des valeurs 
            let dicesSorted: number[] = dices.sort((a: number, b: number): number => b - a);

            // recherche des doublons
            let dice1Count: number = 0;
            let dice2Count: number = 0;
            let dice3Count: number = 0;
            let dice4Count: number = 0;
            let dice5Count: number = 0;
            let dice6Count: number = 0;

            dicesSorted.forEach((dice: number) => {
                switch (dice) {
                    case 1:
                        dice1Count++;
                        break;
                    case 2:
                        dice2Count++;
                        break;
                    case 3:
                        dice3Count++;
                        break;
                    case 4:
                        dice4Count++;
                        break;
                    case 5:
                        dice5Count++;
                        break;
                    case 6:
                        dice6Count++;
                        break;
                }
            });

            usersResult.push({
                idLobbyUser: userLobbyId,
                dices: dicesSorted,
                result: ValueName.NULL,
                paire1: 0,
                paire2: 0,
                brelan: 0,
                carre: 0,
                petiteSuite: 0,
                grandeSuite: 0,
                quinte: 0
            });

            usersResult[userLobbyId] = SearchQuinte(usersResult[userLobbyId],
                dice1Count, dice2Count, dice3Count,
                dice4Count, dice5Count, dice6Count);

            usersResult[userLobbyId] = SearchCarre(usersResult[userLobbyId],
                dice1Count, dice2Count, dice3Count,
                dice4Count, dice5Count, dice6Count);

            usersResult[userLobbyId] = SearchSuite(usersResult[userLobbyId],
                dice1Count, dice2Count, dice3Count,
                dice4Count, dice5Count, dice6Count);

            usersResult[userLobbyId] = SearchBrelan(usersResult[userLobbyId],
                dice1Count, dice2Count, dice3Count,
                dice4Count, dice5Count, dice6Count);

            usersResult[userLobbyId] = SearchPaire(usersResult[userLobbyId],
                dice1Count, dice2Count, dice3Count,
                dice4Count, dice5Count, dice6Count);
        });
        return this.SearchWinner(usersResult);
    }

    SearchWinner(usersResult: UserResult[]): UserResult | UserResult[] {
        let winner: UserResult = usersResult[0];
        let draw: UserResult[] = [];

        // recherche du gagnant (boucle sur les joueurs)
        usersResult.forEach((userResult: UserResult) => {
            // Si joueur a une Quinte 
            if (userResult.result === ValueName.QUINTE) {
                // Si le gagnant a une quinte
                if (winner.result === ValueName.QUINTE) {
                    if (userResult.quinte > winner.quinte) {
                        winner = userResult;
                    }
                    else if (userResult.quinte === winner.quinte) {
                        if (draw.length === 0) {
                            draw.push(winner);
                        }
                        draw.push(userResult);
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
            // Si joueur a une Grande Suite
            else if (userResult.result === ValueName.GRANDE_SUITE) {
                // Si le gagnant a une Quinte
                if (winner.result === ValueName.QUINTE) {
                    winner = winner;
                }
                // Si le gagnant a une Grande Suite
                else if (winner.result === ValueName.GRANDE_SUITE) {
                    if (userResult.grandeSuite > winner.grandeSuite) {
                        winner = userResult;
                    }
                    else if (userResult.grandeSuite === winner.grandeSuite) {
                        if (draw.length === 0) {
                            draw.push(winner);
                        }
                        draw.push(userResult);
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
            // Si joueur a une Petite Suite
            else if (userResult.result === ValueName.PETITE_SUITE) {
                // Si le gagnant a une Quinte
                if (winner.result === ValueName.QUINTE) {
                    winner = winner;
                }
                // Si le gagnant a une Grande Suite
                else if (winner.result === ValueName.GRANDE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a une Petite Suite
                else if (winner.result === ValueName.PETITE_SUITE) {
                    if (userResult.petiteSuite > winner.petiteSuite) {
                        winner = userResult;
                    }
                    else if (userResult.petiteSuite === winner.petiteSuite) {
                        if (this.SearchHighestDice(userResult, winner, []) === null) {
                            if (draw.length === 0) {
                                draw.push(winner);
                            }
                            draw.push(userResult);
                        }
                        else {
                            winner = this.SearchHighestDice(userResult, winner, []);
                        }
                    }
                    // sinon le joueur est le gagnant
                    else {
                        winner = userResult;
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
            // Si joueur a un Full
            else if (userResult.result === ValueName.FULL) {
                // Si le gagnant a une Quinte
                if (winner.result === ValueName.QUINTE) {
                    winner = winner;
                }
                // Si le gagnant a une Grande Suite
                else if (winner.result === ValueName.GRANDE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a une Petite Suite
                else if (winner.result === ValueName.PETITE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a un Full
                else if (winner.result === ValueName.FULL) {
                    if (userResult.brelan > winner.brelan) {
                        winner = userResult;
                    }
                    else if (userResult.brelan === winner.brelan) {
                        if (userResult.paire1 > winner.paire1) {
                            winner = userResult;
                        }
                        else if (userResult.paire1 === winner.paire1) {
                            if (draw.length === 0) {
                                draw.push(winner);
                            }
                            draw.push(userResult);
                        }
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
            // Si joueur a un Carré
            else if (userResult.result === ValueName.CARRE) {
                // Si le gagnant a une Quinte
                if (winner.result === ValueName.QUINTE) {
                    winner = winner;
                }
                // Si le gagnant a une Grande Suite
                else if (winner.result === ValueName.GRANDE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a une Petite Suite
                else if (winner.result === ValueName.PETITE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a un Full
                else if (winner.result === ValueName.FULL) {
                    winner = winner;
                }
                // Si le gagnant a un Carré
                else if (winner.result === ValueName.CARRE) {
                    if (userResult.carre > winner.carre) {
                        winner = userResult;
                    }
                    else if (userResult.carre === winner.carre) {
                        if (this.SearchHighestDice(userResult, winner, []) === null) {
                            if (draw.length === 0) {
                                draw.push(winner);
                            }
                            draw.push(userResult);
                        }
                        else {
                            winner = this.SearchHighestDice(userResult, winner, []);
                        }
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
            // Si joueur a un Brelan
            else if (userResult.result === ValueName.BRELAN) {
                // Si le gagnant a une Quinte
                if (winner.result === ValueName.QUINTE) {
                    winner = winner;
                }
                // Si le gagnant a une Grande Suite
                else if (winner.result === ValueName.GRANDE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a une Petite Suite
                else if (winner.result === ValueName.PETITE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a un Full
                else if (winner.result === ValueName.FULL) {
                    winner = winner;
                }
                // Si le gagnant a un Carré
                else if (winner.result === ValueName.CARRE) {
                    winner = winner;
                }
                // Si le gagnant a un Brelan
                else if (winner.result === ValueName.BRELAN) {
                    if (userResult.brelan > winner.brelan) {
                        winner = userResult;
                    }
                    else if (userResult.brelan === winner.brelan) {
                        if (this.SearchHighestDice(userResult, winner, []) === null) {
                            if (draw.length === 0) {
                                draw.push(winner);
                            }
                            draw.push(userResult);
                        }
                        else {
                            winner = this.SearchHighestDice(userResult, winner, []);
                        }
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
            // Si joueur a une Double Paire
            else if (userResult.result === ValueName.DOUBLE_PAIRE) {
                // Si le gagnant a une Quinte
                if (winner.result === ValueName.QUINTE) {
                    winner = winner;
                }
                // Si le gagnant a une Grande Suite
                else if (winner.result === ValueName.GRANDE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a une Petite Suite
                else if (winner.result === ValueName.PETITE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a un Full
                else if (winner.result === ValueName.FULL) {
                    winner = winner;
                }
                // Si le gagnant a un Carré
                else if (winner.result === ValueName.CARRE) {
                    winner = winner;
                }
                // Si le gagnant a un Brelan
                else if (winner.result === ValueName.BRELAN) {
                    winner = winner;
                }
                // Si le gagnant a une Double Paire
                else if (winner.result === ValueName.DOUBLE_PAIRE) {
                    if (userResult.paire1 > winner.paire1) {
                        winner = userResult;
                    }
                    else if (userResult.paire1 === winner.paire1) {
                        if (userResult.paire2 > winner.paire2) {
                            winner = userResult;
                        }
                        else if (userResult.paire2 === winner.paire2) {
                            if (this.SearchHighestDice(userResult, winner, []) === null) {
                                if (draw.length === 0) {
                                    draw.push(winner);
                                }
                                draw.push(userResult);
                            }
                            else {
                                winner = this.SearchHighestDice(userResult, winner, []);
                            }
                        }
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
            // Si joueur a une Paire
            else if (userResult.result === ValueName.PAIRE) {
                // Si le gagnant a une Quinte
                if (winner.result === ValueName.QUINTE) {
                    winner = winner;
                }
                // Si le gagnant a une Grande Suite
                else if (winner.result === ValueName.GRANDE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a une Petite Suite
                else if (winner.result === ValueName.PETITE_SUITE) {
                    winner = winner;
                }
                // Si le gagnant a un Full
                else if (winner.result === ValueName.FULL) {
                    winner = winner;
                }
                // Si le gagnant a un Carré
                else if (winner.result === ValueName.CARRE) {
                    winner = winner;
                }
                // Si le gagnant a un Brelan
                else if (winner.result === ValueName.BRELAN) {
                    winner = winner;
                }
                // Si le gagnant a une Double Paire
                else if (winner.result === ValueName.DOUBLE_PAIRE) {
                    winner = winner;
                }
                // Si le gagnant a une Paire
                else if (winner.result === ValueName.PAIRE) {
                    if (userResult.paire1 > winner.paire1) {
                        winner = userResult;
                    }
                    else if (userResult.paire1 === winner.paire1) {
                        if (this.SearchHighestDice(userResult, winner, []) === null) {
                            if (draw.length === 0) {
                                draw.push(winner);
                            }
                            draw.push(userResult);
                        }
                        else {
                            winner = this.SearchHighestDice(userResult, winner, []);
                        }
                    }
                }
                // sinon le joueur est le gagnant
                else {
                    winner = userResult;
                }
            }
        });
        if (draw.length > 0) {
            return draw;
        }
        else {
            return winner;
        }
    }

    SearchHighestDice(userResult: UserResult, winner: UserResult, dices: number[]): UserResult | null {
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

}

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