import { ApiProperty } from '@nestjs/swagger';
import { LobbyDto } from '../../lobby/dto/lobby.dto';
import { UserDto } from '../../user/dto/user.dto';
import { ValidPlay } from './lobby-user.dto';

export class CreateLobbyUserDto {

  @ApiProperty({ example: 1, description: 'Position of the user in the lobby' })
  position: number;

  @ApiProperty({ required: true, default: 0 })
  tour: number;

  @ApiProperty({ required: true, default: 0 })
  points: number;

  @ApiProperty({ required: true, default: 0 })
  win: number;

  @ApiProperty({ required: true, default: 0 })
  lose: number;

  @ApiProperty({ required: true, default: 0 })
  draw: number;

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: ValidPlay,
    default: ValidPlay.WAITING_PLAYING,
  })
  validPlay: ValidPlay;

  @ApiProperty({ required: true })
  lobby: LobbyDto;

  @ApiProperty({ required: true })
  user: UserDto;
}
