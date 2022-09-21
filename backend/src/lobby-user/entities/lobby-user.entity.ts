import { Lobby } from "src/lobby/entities/lobby.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ValidPlay } from "../dto/lobby-user.dto";

@Entity()
export class LobbyUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tour: number;

    @Column()
    points: number;

    @Column()
    win: number;

    @Column()
    lose: number;

    @Column()
    draw: number;

    @Column({ nullable: true, type: "enum", enum: ValidPlay, default: ValidPlay.WAITING_PLAYING })
    validPlay: ValidPlay;

    @OneToOne(() => User, user => user.lobbyUser, { cascade: true, eager: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Lobby, lobby => lobby.users, { orphanedRowAction: "delete", onDelete: "CASCADE", onUpdate: "CASCADE" })
    lobby: Lobby;

}
