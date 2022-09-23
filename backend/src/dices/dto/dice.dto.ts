import { ApiProperty } from "@nestjs/swagger";
import { LobbyUserDto } from "src/lobby-user/dto/lobby-user.dto";
import { LobbyUserIdDto } from "../../lobby-user/dto/lobby-user-id.dto";

export class DiceDto {
    @ApiProperty({ required: true, default: 0 })
    diceId: number;

    @ApiProperty({ required: true, default: 0 })
    value: number;

    @ApiProperty({ required: true, type: "boolean", default: false })
    isLocked: boolean;

    @ApiProperty({ required: true, default: 0 })
    lobbyUser: LobbyUserDto;
}