import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../../user/entities/user.entity";

export class CoreUserDto {
    @ApiProperty({ required: true, example: 1 })
    id: number;

    @ApiProperty({ required: true, example: "user1" })
    username: string;

    @ApiProperty({ required: true, example: UserRole.USER })
    role: UserRole;
}