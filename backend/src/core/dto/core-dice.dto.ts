import { ApiProperty } from "@nestjs/swagger";

export class CoreDiceDto {
    @ApiProperty({ required: true, example: 0 })
    diceId: number;

    @ApiProperty({ required: true, example: 4 })
    value: number;

    @ApiProperty({ required: true, example: false })
    isLocked: boolean;
}