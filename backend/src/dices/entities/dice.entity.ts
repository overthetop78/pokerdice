import { LobbyUser } from "src/lobby-user/entities/lobby-user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Dice {

    @ManyToOne(() => LobbyUser , lobbyUser => lobbyUser.dices)
    lobbyUser: LobbyUser;

    @PrimaryColumn()
    diceId: number;

    @Column()
    value: number;

    @Column({ type: "boolean", default: false })
    isLocked: boolean;

}
