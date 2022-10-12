import { ApiProperty } from "@nestjs/swagger";
import { CoreUserLobbyDto } from "./core-user-lobby.dto";
import { CoreUserDto } from "./core-user.dto";

export class CoreResultDto {

  @ApiProperty({ required: true, example: 1 })
  id: number;

  @ApiProperty({ required: true, example: "Lobby Test" })
  name: string;

  @ApiProperty({ required: false, default: null })
  password: string;

  @ApiProperty({ required: true })
  owner: CoreUserDto;

  @ApiProperty({ required: true })
  users: CoreUserLobbyDto[];

  @ApiProperty({ required: false, default: Date.now() })
  createdAt: Date;

  @ApiProperty({ required: false, default: Date.now() })
  updatedAt: Date;
}