import { ApiProperty } from "@nestjs/swagger";
import { ValidPlay } from "../../lobby-user/dto/lobby-user.dto";
import { CoreDiceDto } from "./core-dice.dto";
import { CoreUserDto } from "./core-user.dto";

export class CoreUserLobbyDto {
    @ApiProperty({ required: true, example: 1 })
    id: number;

    @ApiProperty({ required: true, example: 1 })
    position: number;

    @ApiProperty({ required: true, example: 10 })
    tour: number;

    @ApiProperty({ required: true, example: 0 })
    points: number;

    @ApiProperty({ required: true, example: 0 })
    win: number;

    @ApiProperty({ required: true, example: 0 })
    lose: number;

    @ApiProperty({ required: true, example: 0 })
    draw: number;

    @ApiProperty({ required: true, example: "FINISHED" })
    validPlay: ValidPlay;

    @ApiProperty({ required: true })
    user: CoreUserDto;

    @ApiProperty({ required: true })
    dices: CoreDiceDto[];
}
