import { ApiProperty } from "@nestjs/swagger";
import { LobbyUserDto } from "../../lobby-user/dto/lobby-user.dto";

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