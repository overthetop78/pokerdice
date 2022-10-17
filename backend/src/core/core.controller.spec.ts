import { Test, TestingModule } from '@nestjs/testing';
import { DicesService } from '../dices/dices.service';
import { LobbyUserService } from '../lobby-user/lobby-user.service';
import { DicesController } from '../dices/dices.controller';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { LobbyUser } from '../lobby-user/entities/lobby-user.entity';
import { LobbyUserController } from '../lobby-user/lobby-user.controller';
import { Dice } from '../dices/entities/dice.entity';
import { User, UserRole } from '../user/entities/user.entity';
import { ValidPlay } from '../lobby-user/dto/lobby-user.dto';
import { CoreResultDto } from './dto/core-result.dto';
import { Lobby } from '../lobby/entities/lobby.entity';
import { LobbyService } from '../lobby/lobby.service';
import { UserService } from '../user/user.service';
import { Core } from './core';
import { SearchBrelan } from './search-brelan';
import { SearchCarre } from './search-carre';
import { SearchPaire } from './search-paire';
import { SearchQuinte } from './search-quinte';
import { SearchSuite } from './search-suite';
import { UserResult } from './user-result.interface';
import { ValueName } from './value-name.enum';
import { AppModule } from '../app.module';

describe('CoreController', () => {
  let controller: CoreController;
  let service: CoreService;
  let core: Core;
  let dicesService: DicesService;
  let lobbyUserService: LobbyUserService;
  let lobbyService: LobbyService;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Core, Dice, LobbyUser, Lobby, User, AppModule],
    }).compile();

    controller = module.get<CoreController>(CoreController);
    service = module.get<CoreService>(CoreService);
    core = module.get<Core>(Core);
  });

  // Test de la fonction SearchQuinte
  it('User a une quinte', async () => {
    let userResult: UserResult = {
      idLobbyUser: 0,
      dices: [4, 4, 4, 4, 4],
      result: ValueName.NULL,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    };
    jest.setTimeout(10000);
    // recherche d'une quinte (utilisateur, nombre de dé avec face 1 à 6)
    const result = SearchQuinte(userResult, 0, 0, 0, 5, 0, 0);
    console.log(result);

    expect(result).toStrictEqual({
      idLobbyUser: 0,
      dices: [4, 4, 4, 4, 4],
      result: ValueName.QUINTE,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 4
    });
  });

  // Test de la fonction SearchCarre
  it('User a un carré', async () => {
    let userResult: UserResult = {
      idLobbyUser: 0,
      dices: [4, 4, 4, 4, 2],
      result: ValueName.NULL,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    };
    jest.setTimeout(10000);
    // recherche d'un carré (utilisateur, nombre de dé avec face 1 à 6)
    const result = SearchCarre(userResult, 0, 1, 0, 4, 0, 0);
    console.log(result);

    expect(result).toStrictEqual({
      idLobbyUser: 0,
      dices: [4, 4, 4, 4, 2],
      result: ValueName.CARRE,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 4,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    });
  });

  // Test de la fonction SearchBrelan
  it('User a un brelan ou un Full', async () => {
    let userResult: UserResult = {
      idLobbyUser: 0,
      dices: [4, 4, 4, 3, 3],
      result: ValueName.NULL,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    };
    jest.setTimeout(10000);
    // recherche d'un brelan ou un Full (utilisateur, nombre de dé avec face 1 à 6)
    const result = SearchBrelan(userResult, 0, 0, 2, 3, 0, 0);
    console.log(result);

    expect(result).toStrictEqual({
      idLobbyUser: 0,
      dices: [4, 4, 4, 3, 3],
      result: ValueName.NULL,
      paire1: 0,
      paire2: 0,
      brelan: 4,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    });
  });

  // Test de la fonction SearchPaire
  it('User a un Full (Brelan + Paire)', async () => {
    let userResult: UserResult = {
      idLobbyUser: 0,
      dices: [4, 4, 4, 3, 3],
      result: ValueName.NULL,
      paire1: 0,
      paire2: 0,
      brelan: 4,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    };
    jest.setTimeout(10000);
    // recherche d'une quinte (utilisateur, nombre de dé avec face 1 à 6)
    const result = SearchPaire(userResult, 0, 0, 2, 3, 0, 0);
    console.log(result);

    expect(result).toStrictEqual({
      idLobbyUser: 0,
      dices: [4, 4, 4, 3, 3],
      result: ValueName.FULL,
      paire1: 3,
      paire2: 0,
      brelan: 4,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    });
  });

  // Test de la fonction SearchPetiteSuite
  it('User a une petite suite', async () => {
    let userResult: UserResult = {
      idLobbyUser: 0,
      dices: [2, 2, 3, 4, 5],
      result: ValueName.NULL,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    };
    jest.setTimeout(10000);
    // recherche d'une petite suite (utilisateur, nombre de dé avec face 1 à 6)
    const result = SearchSuite(userResult, 0, 2, 1, 1, 1, 0);
    console.log(result);

    expect(result).toStrictEqual({
      idLobbyUser: 0,
      dices: [2, 2, 3, 4, 5],
      result: ValueName.PETITE_SUITE,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 5,
      grandeSuite: 0,
      quinte: 0
    });
  });

  // Test de la fonction SearchGrandeSuite
  it('User a une grande suite', async () => {
    let userResult: UserResult = {
      idLobbyUser: 0,
      dices: [2, 3, 4, 5, 6],
      result: ValueName.NULL,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 0,
      quinte: 0
    };
    jest.setTimeout(10000);
    // recherche d'une grande suite (utilisateur, nombre de dé avec face 1 à 6)
    const result = SearchSuite(userResult, 0, 1, 1, 1, 1, 1);
    console.log(result);

    expect(result).toStrictEqual({
      idLobbyUser: 0,
      dices: [2, 3, 4, 5, 6],
      result: ValueName.GRANDE_SUITE,
      paire1: 0,
      paire2: 0,
      brelan: 0,
      carre: 0,
      petiteSuite: 0,
      grandeSuite: 6,
      quinte: 0
    });
  });


  it('Should find the winner with a Quinte', async () => {
    const lobbyTest: CoreResultDto = {
      id: 0,
      name: 'Lobby Test',
      password: null,
      owner: {
        id: 1,
        username: 'user1',
        role: UserRole.USER,
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
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 1,
            username: 'user1',
            role: UserRole.USER,
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
              value: 4,
              isLocked: false
            },
            {
              diceId: 3,
              value: 4,
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
          id: 2,
          position: 2,
          tour: 10,
          points: 0,
          win: 0,
          lose: 0,
          draw: 0,
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 2,
            username: 'user2',
            role: UserRole.USER,
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
              value: 1,
              isLocked: false
            },
            {
              diceId: 3,
              value: 6,
              isLocked: false
            },
            {
              diceId: 4,
              value: 5,
              isLocked: false
            }
          ]
        }
      ],
      //createdAt: new Date('2021-05-01T00:00:00.000Z'),
      //updatedAt: new Date('2021-05-01T00:00:00.000Z'),
    };

    const result = core.CalculateScore(lobbyTest);
    jest.setTimeout(10000);
    expect(result).toStrictEqual({
      brelan: 0,
      carre: 0,
      dices: [4, 4, 4, 4, 4],
      grandeSuite: 0,
      idLobbyUser: 1,
      paire1: 0,
      paire2: 0,
      petiteSuite: 0,
      quinte: 4,
      result: "quinte"
    });
  });

  it('Should find the winner with a Carre', async () => {
    const lobbyTest: CoreResultDto = {
      id: 0,
      name: 'Lobby Test',
      password: null,
      owner: {
        id: 1,
        username: 'user1',
        role: UserRole.USER,
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
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 1,
            username: 'user1',
            role: UserRole.USER,
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
              value: 4,
              isLocked: false
            },
            {
              diceId: 3,
              value: 4,
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
          id: 2,
          position: 2,
          tour: 10,
          points: 0,
          win: 0,
          lose: 0,
          draw: 0,
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 2,
            username: 'user2',
            role: UserRole.USER,
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
              value: 1,
              isLocked: false
            },
            {
              diceId: 3,
              value: 6,
              isLocked: false
            },
            {
              diceId: 4,
              value: 5,
              isLocked: false
            }
          ]
        }
      ],
      //createdAt: new Date('2021-05-01T00:00:00.000Z'),
      //updatedAt: new Date('2021-05-01T00:00:00.000Z'),
    };

    const result = core.CalculateScore(lobbyTest);
    jest.setTimeout(10000);
    expect(result).toStrictEqual({
      brelan: 0,
      carre: 4,
      dices: [5, 4, 4, 4, 4],
      grandeSuite: 0,
      idLobbyUser: 1,
      paire1: 0,
      paire2: 0,
      petiteSuite: 0,
      quinte: 0,
      result: "carre"
    });
  });

  it('Should find the winner with a Grande Suite', async () => {
    const lobbyTest: CoreResultDto = {
      id: 0,
      name: 'Lobby Test',
      password: null,
      owner: {
        id: 1,
        username: 'user1',
        role: UserRole.USER,
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
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 1,
            username: 'user1',
            role: UserRole.USER,
          },
          dices: [
            {
              diceId: 0,
              value: 4,
              isLocked: false
            },
            {
              diceId: 1,
              value: 5,
              isLocked: false
            },
            {
              diceId: 2,
              value: 2,
              isLocked: false
            },
            {
              diceId: 3,
              value: 4,
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
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 2,
            username: 'user2',
            role: UserRole.USER,
          },
          dices: [
            {
              diceId: 0,
              value: 4,
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
              value: 6,
              isLocked: false
            },
            {
              diceId: 4,
              value: 2,
              isLocked: false
            }
          ]
        }
      ],
      //createdAt: new Date('2021-05-01T00:00:00.000Z'),
      //updatedAt: new Date('2021-05-01T00:00:00.000Z'),
    };

    const result = core.CalculateScore(lobbyTest);
    jest.setTimeout(10000);
    expect(result).toStrictEqual({
      brelan: 0,
      carre: 0,
      dices: [6, 5, 4, 3, 2],
      grandeSuite: 6,
      idLobbyUser: 2,
      paire1: 0,
      paire2: 0,
      petiteSuite: 0,
      quinte: 0,
      result: "grande suite"
    });
  });

  it('Should find the draw with a Petite Suite', async () => {
    const lobbyTest: CoreResultDto = {
      id: 0,
      name: 'Lobby Test',
      password: null,
      owner: {
        id: 1,
        username: 'user1',
        role: UserRole.USER,
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
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 1,
            username: 'user1',
            role: UserRole.USER,
          },
          dices: [
            {
              diceId: 0,
              value: 3,
              isLocked: false
            },
            {
              diceId: 1,
              value: 4,
              isLocked: false
            },
            {
              diceId: 2,
              value: 5,
              isLocked: false
            },
            {
              diceId: 3,
              value: 2,
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
          id: 2,
          position: 2,
          tour: 10,
          points: 0,
          win: 0,
          lose: 0,
          draw: 0,
          validPlay: ValidPlay.FINISHED,
          user: {
            id: 2,
            username: 'user2',
            role: UserRole.USER,
          },
          dices: [
            {
              diceId: 0,
              value: 4,
              isLocked: false
            },
            {
              diceId: 1,
              value: 3,
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
              value: 2,
              isLocked: false
            }
          ]
        }
      ],
      //createdAt: new Date('2021-05-01T00:00:00.000Z'),
      //updatedAt: new Date('2021-05-01T00:00:00.000Z'),
    };

    const result = core.CalculateScore(lobbyTest);
    jest.setTimeout(10000);

    expect(result).toStrictEqual([{
      brelan: 0,
      carre: 0,
      dices: [5, 5, 4, 3, 2],
      grandeSuite: 0,
      idLobbyUser: 1,
      paire1: 0,
      paire2: 0,
      petiteSuite: 5,
      quinte: 0,
      result: "petite suite"
    }, {
      brelan: 0,
      carre: 0,
      dices: [5, 5, 4, 3, 2],
      grandeSuite: 0,
      idLobbyUser: 2,
      paire1: 0,
      paire2: 0,
      petiteSuite: 5,
      quinte: 0,
      result: "petite suite"
    }]);
  });


});
