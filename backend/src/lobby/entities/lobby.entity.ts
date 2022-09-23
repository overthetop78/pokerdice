import { LobbyUser } from '../../lobby-user/entities/lobby-user.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => User, (user) => user.lobby, { cascade: true, eager: true })
  @JoinColumn()
  owner: User;

  @OneToMany(() => LobbyUser, (lobbyUser) => lobbyUser.lobby, {
    cascade: true,
    eager: true,
  })
  users: LobbyUser[];
}
