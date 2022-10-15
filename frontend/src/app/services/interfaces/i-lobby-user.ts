export interface ILobbyUser {
    position: number;
    tour: number;
    points: number;
    win: number;
    lose: number;
    draw: number;
    validPlay: string;
    lobby: {
        id: number;
    };
    user: {
        id: number;
    };
}