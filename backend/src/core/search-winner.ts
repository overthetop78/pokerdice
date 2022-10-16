import { SearchHighestDice } from "./search-highest-dice";
import { UserResult } from "./user-result.interface";
import { ValueName } from "./value-name.enum";

export function SearchWinner(usersResult: UserResult[]): UserResult | UserResult[] {
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
                    if (SearchHighestDice(userResult, winner, []) === null) {
                        if (draw.length === 0) {
                            draw.push(winner);
                        }
                        draw.push(userResult);
                    }
                    else {
                        winner = SearchHighestDice(userResult, winner, []);
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
                    if (SearchHighestDice(userResult, winner, []) === null) {
                        if (draw.length === 0) {
                            draw.push(winner);
                        }
                        draw.push(userResult);
                    }
                    else {
                        winner = SearchHighestDice(userResult, winner, []);
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
                    if (SearchHighestDice(userResult, winner, []) === null) {
                        if (draw.length === 0) {
                            draw.push(winner);
                        }
                        draw.push(userResult);
                    }
                    else {
                        winner = SearchHighestDice(userResult, winner, []);
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
                        if (SearchHighestDice(userResult, winner, []) === null) {
                            if (draw.length === 0) {
                                draw.push(winner);
                            }
                            draw.push(userResult);
                        }
                        else {
                            winner = SearchHighestDice(userResult, winner, []);
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
                    if (SearchHighestDice(userResult, winner, []) === null) {
                        if (draw.length === 0) {
                            draw.push(winner);
                        }
                        draw.push(userResult);
                    }
                    else {
                        winner = SearchHighestDice(userResult, winner, []);
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