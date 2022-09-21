import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ example: '1', description: 'Unique identifier', required: true })
    id: number;

}
