import { ApiProperty } from '@nestjs/swagger';

export class LobbyUserIdDto {
  @ApiProperty({ required: true, default: 0 })
  id: number;
}
