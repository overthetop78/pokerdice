import { ApiProperty } from '@nestjs/swagger';
import { LobbyUserDto } from '../../lobby-user/dto/lobby-user.dto';
import { UserDto } from '../../user/dto/user.dto';

export class CreateLobbyDto {
  @ApiProperty({
    example: 'Lobby name',
    description: 'Lobby name',
    required: true,
  })
  name: string;

  @ApiProperty({ required: false, default: null })
  password: string;

  @ApiProperty({ required: true })
  owner: UserDto;

  @ApiProperty({ required: true })
  users: LobbyUserDto[];
}
