import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty({ required: true, minLength: 3, maxLength: 80 })
    username: string;

    @ApiProperty({ required: true, minLength: 3, maxLength: 255 })
    email: string;

    @ApiProperty({ required: true, minLength: 3, maxLength: 80 })
    password: string;

    @ApiProperty({ required: true, type: 'string', format: 'date' })
    birthday: Date;

    @ApiProperty({ required: false, enum: UserRole, default: UserRole.USER })
    role: UserRole;
}
