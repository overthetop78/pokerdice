import { Dice } from '../../dices/entities/dice.entity';
import { Lobby } from '../../lobby/entities/lobby.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidPlay } from '../dto/lobby-user.dto';

@Entity()
export class LobbyUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

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

  @Column({
    nullable: true,
    type: 'enum',
    enum: ValidPlay,
    default: ValidPlay.WAITING_PLAYING,
  })
  validPlay: ValidPlay;

  @OneToOne(() => User, (user) => user.lobbyUser, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Lobby, (lobby) => lobby.users, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lobby: Lobby;

  @OneToMany(() => Dice, (dice) => dice.lobbyUser, {
    cascade: true,
    eager: true,
  })
  dices: Dice[];
}
