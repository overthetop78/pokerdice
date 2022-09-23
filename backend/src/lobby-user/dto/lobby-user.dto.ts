import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export enum ValidPlay {
  ACCEPTED = 'ACCEPTED',
  WAITING_TOUR = 'WAITING_TOUR',
  WAITING_PLAYING = 'WAITING_PLAYING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

export class LobbyUserDto {
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
  user: UserDto;
}
