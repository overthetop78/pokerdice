import { ApiTags } from "@nestjs/swagger";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Lobby } from "src/lobby/entities/lobby.entity";
import { LobbyUser } from "src/lobby-user/entities/lobby-user.entity";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80, unique: true, nullable: false })
    username: string;

    @Column({ length: 255, unique: true, nullable: false })
    email: string;

    @Column({ length: 80, nullable: false })
    password: string;

    @Column({ nullable: false, type: 'date' })
    birthday: Date;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToOne(() => Lobby, lobby => lobby.owner)
    lobby: Lobby;

    @OneToOne(() => LobbyUser, lobbyUser => lobbyUser.user)
    lobbyUser: LobbyUser;

}
