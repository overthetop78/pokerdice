import { DicesService } from "src/dices/dices.service";
import { LobbyUserService } from "src/lobby-user/lobby-user.service";


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
    dices: number[];
    result: ValueName;
    paire1: number;
    paire2: number;
    brelan: number;
    carre: number;
    petiteSuite: number;
    grandeSuite: number;
    quinte: number;
}

export class Core {

    constructor(
        private lobbyUserService: LobbyUserService,
        private dicesService: DicesService,
    ) { }

    async CheckRunGame(lobbyId: number) {
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

    lobbyTest = {
        id: 0,
        name: 'Lobby Test',
        password: null,
        owner: {
            id: 1,
            username: 'user1',
            role: 'USER',
        },
        users: [
            {
                id: 1,
                position: 1,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 1,
                    username: 'user1',
                    role: 'USER',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 2,
                        value: 2,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 2,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 3,
                        isLocked: false
                    }
                ]
            },
            {
                id: 2,
                position: 2,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 2,
                    username: 'user2',
                    role: 'USER',
                },
                lobby: {
                    id: 1,
                    name: 'Lobby 1',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 5,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 5,
                        isLocked: false
                    },
                    {
                        diceId: 2,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 3,
                        isLocked: false
                    }
                ]
            },
            {
                id: 3,
                position: 3,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 3,
                    username: 'user3',
                    role: 'USER',
                },
                lobby: {
                    id: 1,
                    name: 'Lobby 1',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 5,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 4,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 4,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 6,
                        isLocked: false
                    }
                ]
            },
            {
                id: 4,
                position: 4,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 4,
                    username: 'user4',
                    role: 'USER',
                },
                lobby: {
                    id: 1,
                    name: 'Lobby 1',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 2,
                        value: 5,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 5,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 3,
                        isLocked: false
                    }
                ]
            },
            {
                id: 5,
                position: 5,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 5,
                    username: 'user5',
                    role: 'USER',
                },
                lobby: {
                    id: 1,
                    name: 'Lobby 1',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 1,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 1,
                        isLocked: false
                    },
                    {
                        diceId: 2,
                        value: 1,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 3,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 6,
                        isLocked: false
                    }
                ]
            },
            {
                id: 6,
                position: 6,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 6,
                    username: 'user6',
                    role: 'USER',
                },
                lobby: {
                    id: 1,
                    name: 'Lobby 1',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 2,
                        value: 1,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 3,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 5,
                        isLocked: false
                    }
                ]
            },
            {
                id: 7,
                position: 7,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 7,
                    username: 'user7',
                    role: 'USER',
                },
                lobby: {
                    id: 1,
                    name: 'Lobby 1',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 4,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 4,
                        isLocked: false
                    },
                    {
                        diceId: 2,
                        value: 6,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 2,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 4,
                        isLocked: false
                    }
                ]
            },
            {
                id: 8,
                position: 8,
                tour: 10,
                points: 0,
                win: 0,
                lose: 0,
                draw: 0,
                validPlay: 'FINISHED',
                user: {
                    id: 8,
                    username: 'user8',
                    role: 'USER',
                },
                lobby: {
                    id: 1,
                    name: 'Lobby 1',
                },
                dices: [
                    {
                        diceId: 0,
                        value: 5,
                        isLocked: false
                    },
                    {
                        diceId: 1,
                        value: 5,
                        isLocked: false
                    },
                    {
                        diceId: 2,
                        value: 3,
                        isLocked: false
                    },
                    {
                        diceId: 3,
                        value: 3,
                        isLocked: false
                    },
                    {
                        diceId: 4,
                        value: 6,
                        isLocked: false
                    }
                ]
            }
        ],
        createdAt: '2021-05-01T00:00:00.000Z',
        updatedAt: '2021-05-01T00:00:00.000Z',
    };



    CalculateScore(lobby: any) {
        if (lobby.length === 0) {
            lobby = this.lobbyTest; // utilisation de lobbyTest pour les tests
        }

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

            // recherche des quintes
            if (dice1Count === 5) {
                usersResult[userLobbyId].quinte = 1;
                usersResult[userLobbyId].result = ValueName.QUINTE;
            } else if (dice2Count === 5) {
                usersResult[userLobbyId].quinte = 2;
                usersResult[userLobbyId].result = ValueName.QUINTE;
            } else if (dice3Count === 5) {
                usersResult[userLobbyId].quinte = 3;
                usersResult[userLobbyId].result = ValueName.QUINTE;
            } else if (dice4Count === 5) {
                usersResult[userLobbyId].quinte = 4;
                usersResult[userLobbyId].result = ValueName.QUINTE;
            } else if (dice5Count === 5) {
                usersResult[userLobbyId].quinte = 5;
                usersResult[userLobbyId].result = ValueName.QUINTE;
            } else if (dice6Count === 5) {
                usersResult[userLobbyId].quinte = 6;
                usersResult[userLobbyId].result = ValueName.QUINTE;
            }

            // recherche des carrés
            if (dice1Count === 4) {
                usersResult[userLobbyId].carre = 1;
                usersResult[userLobbyId].result = ValueName.CARRE;
            }
            if (dice2Count === 4) {
                usersResult[userLobbyId].carre = 2;
                usersResult[userLobbyId].result = ValueName.CARRE;
            }
            if (dice3Count === 4) {
                usersResult[userLobbyId].carre = 3;
                usersResult[userLobbyId].result = ValueName.CARRE;
            }
            if (dice4Count === 4) {
                usersResult[userLobbyId].carre = 4;
                usersResult[userLobbyId].result = ValueName.CARRE;
            }
            if (dice5Count === 4) {
                usersResult[userLobbyId].carre = 5;
                usersResult[userLobbyId].result = ValueName.CARRE;
            }
            if (dice6Count === 4) {
                usersResult[userLobbyId].carre = 6;
                usersResult[userLobbyId].result = ValueName.CARRE;
            }

            // recherche des suites
            if (dice1Count === 1 && dice2Count === 1 && dice3Count === 1 && dice4Count === 1 && dice5Count === 1) {
                usersResult[userLobbyId].grandeSuite = 5;
                usersResult[userLobbyId].result = ValueName.GRANDE_SUITE;
            }
            else if (dice2Count === 1 && dice3Count === 1 && dice4Count === 1 && dice5Count === 1 && dice6Count === 1) {
                usersResult[userLobbyId].grandeSuite = 6;
                usersResult[userLobbyId].result = ValueName.GRANDE_SUITE;
            }
            else if (dice1Count > 0 && dice2Count > 0 && dice3Count > 0 && dice4Count > 0) {
                usersResult[userLobbyId].petiteSuite = 4;
                usersResult[userLobbyId].result = ValueName.PETITE_SUITE;
            }
            else if (dice2Count > 0 && dice3Count > 0 && dice4Count > 0 && dice5Count > 0) {
                usersResult[userLobbyId].petiteSuite = 5;
                usersResult[userLobbyId].result = ValueName.PETITE_SUITE;
            }
            else if (dice3Count > 0 && dice4Count > 0 && dice5Count > 0 && dice6Count > 0) {
                usersResult[userLobbyId].petiteSuite = 6;
                usersResult[userLobbyId].result = ValueName.PETITE_SUITE;
            }

            // recherche des brelans
            if (dice1Count === 3) {
                usersResult[userLobbyId].brelan = 1;
            }
            if (dice2Count === 3) {
                usersResult[userLobbyId].brelan = 2;
            }
            if (dice3Count === 3) {
                usersResult[userLobbyId].brelan = 3;
            }
            if (dice4Count === 3) {
                usersResult[userLobbyId].brelan = 4;
            }
            if (dice5Count === 3) {
                usersResult[userLobbyId].brelan = 5;
            }
            if (dice6Count === 3) {
                usersResult[userLobbyId].brelan = 6;
            }

            let paire1: number = 0;
            let paire2: number = 0;

            if (usersResult[userLobbyId].petiteSuite === 0) {
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
                        usersResult[userLobbyId].paire1 = paire1;
                        usersResult[userLobbyId].paire2 = paire2;
                        usersResult[userLobbyId].result = ValueName.DOUBLE_PAIRE;
                    }
                    if (paire2 > paire1) {
                        usersResult[userLobbyId].paire1 = paire2;
                        usersResult[userLobbyId].paire2 = paire1;
                        usersResult[userLobbyId].result = ValueName.DOUBLE_PAIRE;
                    }
                }
                else if (paire1 !== 0 && paire2 === 0) {
                    usersResult[userLobbyId].paire1 = paire1;
                    if (usersResult[userLobbyId].brelan !== 0) {
                        usersResult[userLobbyId].result = ValueName.FULL;
                    }
                    else {
                        usersResult[userLobbyId].result = ValueName.PAIRE;
                    }
                }
                else if (paire1 === 0 && usersResult[userLobbyId].brelan !== 0) {
                    usersResult[userLobbyId].result = ValueName.BRELAN;
                }
            }
        });
        console.log(usersResult);

        this.SearchWinner(usersResult);
    }

    SearchWinner(usersResult: UserResult[]) {
        let winner: UserResult = usersResult[0];
        let draw: UserResult[] = [];

        // recherche du gagnant (boucle sur les joueurs)
        usersResult.forEach((userResult: UserResult) => {
            // si le joueur a une quinte et que le gagnant n'en a pas
            if (userResult.quinte !== 0 && winner.quinte === 0) {
                // le joueur devient le gagnant
                winner = userResult;
            }
            // si le joueur a une quinte et que le gagnant en a une
            else if (userResult.quinte !== 0 && winner.quinte !== 0) {
                // si la quinte du joueur est plus grande que celle du gagnant
                if (userResult.quinte > winner.quinte) {
                    winner = userResult;
                }
                // si la quinte du joueur est égale à celle du gagnant
                else if (userResult.quinte === winner.quinte) {
                    if (draw.length === 0) {
                        draw.push(winner);
                    }
                    draw.push(userResult);
                }
            }
            // si le joueur et le gagnant n'ont pas de quinte
            else if (userResult.quinte === 0 && winner.quinte === 0) {
                // si le joueur a une grande suite et que le gagnant n'en a pas
                if (userResult.grandeSuite !== 0 && winner.grandeSuite === 0) {
                    // le joueur devient le gagnant
                    winner = userResult;
                }
                // si le joueur a une grande suite et que le gagnant en a une
                else if (userResult.grandeSuite !== 0 && winner.grandeSuite !== 0) {
                    // si la grande suite du joueur est plus grande que celle du gagnant
                    if (userResult.grandeSuite > winner.grandeSuite) {
                        winner = userResult;
                    }
                    // si la grande suite du joueur est égale à celle du gagnant
                    else if (userResult.grandeSuite === winner.grandeSuite) {
                        if (draw.length === 0) {
                            draw.push(winner);
                        }
                        draw.push(userResult);
                    }
                }
                // si le joueur et le gagnant n'ont pas de grande suite
                else if (userResult.grandeSuite === 0 && winner.grandeSuite === 0) {
                    // si le joueur a une petite suite et que le gagnant n'en a pas
                    if (userResult.petiteSuite !== 0 && winner.petiteSuite === 0) {
                        // le joueur devient le gagnant
                        winner = userResult;
                    }
                    // si le joueur a une petite suite et que le gagnant en a une
                    else if (userResult.petiteSuite !== 0 && winner.petiteSuite !== 0) {
                        // si la petite suite du joueur est plus grande que celle du gagnant
                        if (userResult.petiteSuite > winner.petiteSuite) {
                            winner = userResult;
                        }
                        else if (userResult.petiteSuite === winner.petiteSuite) {
                            // si le joueur et le gagnant ont le même dé
                            if (this.SearchHighestDice(userResult, winner, []) === null) {
                                if (draw.length === 0) {
                                    draw.push(winner);
                                }
                                draw.push(userResult);
                                winner = userResult;
                            }
                            else {
                                winner = this.SearchHighestDice(userResult, winner, []);
                            }
                        }
                    }
                    // si le joueur et le gagnant n'ont pas de petite suite
                    else if (userResult.petiteSuite === 0 && winner.petiteSuite === 0) {
                        // si le joueur a un carre et que le gagnant n'en a pas
                        if (userResult.carre !== 0 && winner.carre === 0) {
                            winner = userResult;
                        }
                        // si le joueur a un carre et que le gagnant en a un
                        else if (userResult.carre !== 0 && winner.carre !== 0) {
                            // si le carre du joueur est plus grand que celui du gagnant
                            if (userResult.carre > winner.carre) {
                                // le joueur devient le gagnant
                                winner = userResult;
                            }
                            // si le carre du joueur est égal à celui du gagnant
                            else if (userResult.carre === winner.carre) {
                                // si le joueur et le gagnant ont le même dé
                                if (this.SearchHighestDice(userResult, winner, []) === null) {
                                    if (draw.length === 0) {
                                        draw.push(winner);
                                    }
                                    draw.push(userResult);
                                    winner = userResult;
                                }
                                else {
                                    winner = this.SearchHighestDice(userResult, winner, []);
                                }
                            }
                        }
                        // si le joueur et le gagnant n'ont pas de carre
                        else if (userResult.carre === 0 && winner.carre === 0) {
                            // si le joueur a un full et que le gagnant n'en a pas
                            if (userResult.brelan !== 0 && userResult.paire1 !== 0 && winner.brelan === 0) {
                                winner = userResult;
                            }
                            // si le joueur a un full et que le gagnant a un brelan
                            else if (userResult.brelan !== 0 && userResult.paire1 !== 0 && winner.brelan !== 0 && winner.paire1 === 0) {
                                winner = userResult;
                            }
                            // si le joueur a un full et que le gagnant a un full
                            else if (userResult.brelan !== 0 && userResult.paire1 !== 0 && winner.brelan !== 0 && winner.paire1 !== 0) {
                                // si le brelan du joueur est plus grand que celui du gagnant
                                if (userResult.brelan > winner.brelan) {
                                    winner = userResult;
                                }
                                // si le brelan du joueur est égal à celui du gagnant
                                else if (userResult.brelan === winner.brelan) {
                                    // si la paire du joueur est plus grande que celle du gagnant
                                    if (userResult.paire1 > winner.paire1) {
                                        winner = userResult;
                                    }
                                    // si la paire du joueur est égale à celle du gagnant
                                    else if (userResult.paire1 === winner.paire1) {
                                        if (draw.length === 0) {
                                            draw.push(winner);
                                        }
                                        draw.push(userResult);
                                    }
                                }
                            }
                            else if (userResult.brelan !== 0 && userResult.paire1 === 0 && winner.brelan === 0 && winner.paire1 === 0) {
                                console.log("brelan");

                                // si le joueur a un brelan et que le gagnant n'en a pas
                                if (userResult.brelan !== 0 && winner.brelan === 0) {
                                    winner = userResult;
                                }
                                // si le joueur a un brelan et que le gagnant en a un
                                else if (userResult.brelan !== 0 && winner.brelan !== 0) {
                                    // si le brelan du joueur est plus grand que celui du gagnant
                                    if (userResult.brelan > winner.brelan) {
                                        winner = userResult;
                                    }
                                    // si le brelan du joueur est égal à celui du gagnant
                                    else if (userResult.brelan === winner.brelan) {
                                        // si le joueur et le gagnant ont le même dé
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
                            // si le joueur et le gagnant n'ont pas de brelan
                            else if (userResult.brelan === 0 && winner.brelan === 0) {
                                // si le joueur a une double paire et que le gagnant n'en a pas
                                if (userResult.paire1 !== 0 && userResult.paire2 !== 0 && winner.paire1 === 0 && winner.paire2 === 0) {
                                    winner = userResult;
                                }
                                // si le joueur a une double paire et que le gagnant une paire
                                else if (userResult.paire1 !== 0 && userResult.paire2 !== 0 && winner.paire1 === 0 && winner.paire2 !== 0) {
                                    winner = userResult;
                                }
                                // si le joueur a une double paire et que le gagnant a une double paire
                                else if (userResult.paire1 !== 0 && userResult.paire2 !== 0 && winner.paire1 !== 0 && winner.paire2 !== 0) {
                                    // si la paire 1 du joueur est plus grande que celle du gagnant
                                    if (userResult.paire1 > winner.paire1) {
                                        winner = userResult;
                                    }
                                    // si la paire 1 du joueur est égale à celle du gagnant
                                    else if (userResult.paire1 === winner.paire1) {
                                        // si la paire 2 du joueur est plus grande que celle du gagnant 
                                        if (userResult.paire2 > winner.paire2) {
                                            winner = userResult;
                                        }
                                        // si la paire 2 du joueur est égale à celle du gagnant
                                        else if (userResult.paire2 === winner.paire2) {
                                            // si le joueur et le gagnant ont le même dé
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
                                // si le joueur a une pairer et que le gagnant n'en a pas
                                else if (userResult.paire1 !== 0 && userResult.paire2 === 0 && winner.paire1 === 0 && winner.paire2 === 0) {
                                    winner = userResult;
                                }
                                // si le joueur a une paire et que le gagnant a une paire
                                else if (userResult.paire1 !== 0 && userResult.paire2 === 0 && winner.paire1 !== 0 && winner.paire2 === 0) {
                                    // si la paire du joueur est plus grande que celle du gagnant
                                    if (userResult.paire1 > winner.paire1) {
                                        winner = userResult;
                                    }
                                    // si la paire du joueur est égale à celle du gagnant
                                    else if (userResult.paire1 === winner.paire1) {
                                        // si le joueur et le gagnant ont le même dé
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
                        }
                    }
                }
            }
        });
        if (draw.length > 0) {
            console.log("draw", draw);
        }
        else {
            console.log("Winner => ", winner);
        }
    }

    SearchHighestDice(userResult: UserResult, winner: UserResult, dices: number[]): UserResult | null {
        let userResultDice = userResult.dices;
        let winnerDice = winner.dices;
        let userResultHighestDice = 0;
        let winnerHighestDice = 0;
        console.log("userResultDice", userResultDice);
        console.log("winnerDice", winnerDice);

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
