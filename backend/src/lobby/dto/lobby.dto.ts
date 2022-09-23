import { ApiProperty } from '@nestjs/swagger';

export class LobbyDto {
  @ApiProperty({ example: '1', description: 'Lobby Id', required: true })
  id: number;
}
