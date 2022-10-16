import { ValidPlay } from "../lobby-user/dto/lobby-user.dto";
import { DicesService } from "../dices/dices.service";
import { LobbyUserService } from "../lobby-user/lobby-user.service";
import { CoreResultDto } from "./dto/core-result.dto";
import { Dice } from "../dices/entities/dice.entity";
import { SearchQuinte } from "./search-quinte";
import { SearchBrelan } from "./search-brelan";
import { SearchCarre } from "./search-carre";
import { SearchPaire } from "./search-paire";
import { SearchSuite } from "./search-suite";
import { SearchWinner } from "./search-winner";
import { UserResult } from "./user-result.interface";
import { ValueName } from "./value-name.enum";
import { CoreDiceDto } from "./dto/core-dice.dto";

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

    CalculateDices(lobbyUserId: number, dices: CoreDiceDto[]): UserResult {
        let dicesSorted: number[] = [];
        dices.forEach((dice: { value: number; }) => {
            dicesSorted.push(dice.value);
        });
        dicesSorted = dicesSorted.sort((a: number, b: number): number => b - a);

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

        let userResult: UserResult = {
            idLobbyUser: lobbyUserId,
            dices: dicesSorted,
            result: ValueName.NULL,
            paire1: 0,
            paire2: 0,
            brelan: 0,
            carre: 0,
            petiteSuite: 0,
            grandeSuite: 0,
            quinte: 0
        };

        userResult = SearchQuinte(userResult,
            dice1Count, dice2Count, dice3Count,
            dice4Count, dice5Count, dice6Count);

        userResult = SearchCarre(userResult,
            dice1Count, dice2Count, dice3Count,
            dice4Count, dice5Count, dice6Count);

        userResult = SearchSuite(userResult,
            dice1Count, dice2Count, dice3Count,
            dice4Count, dice5Count, dice6Count);

        userResult = SearchBrelan(userResult,
            dice1Count, dice2Count, dice3Count,
            dice4Count, dice5Count, dice6Count);

        userResult = SearchPaire(userResult,
            dice1Count, dice2Count, dice3Count,
            dice4Count, dice5Count, dice6Count);

        return userResult;
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

        lobby.users.forEach((user) => {
            if (user.validPlay === ValidPlay.FINISHED) {
                if (user.dices !== undefined) {

                    let userResult = this.CalculateDices(user.id, user.dices);
                    usersResult.push(userResult);
                }
            }
        });
        return SearchWinner(usersResult);
    }
}