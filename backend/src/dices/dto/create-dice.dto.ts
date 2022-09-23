import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { LobbyUserIdDto } from '../../lobby-user/dto/lobby-user-id.dto';

export class CreateDiceDto {
  @ApiProperty({ required: true })
  lobbyUser: LobbyUserIdDto;

  @ApiProperty({ required: true, default: 0 })
  diceId: number;

  @ApiProperty({ required: true, default: 0 })
  value: number;

  @ApiProperty({ required: true, default: false })
  isLocked: boolean;
}
