import { PartialType } from '@nestjs/swagger';
import { LobbyUserDto } from './lobby-user.dto';

export class UpdateLobbyUserDto extends PartialType(LobbyUserDto) {}
