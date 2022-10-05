import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: 'string', required: true })
  email: string;

  @ApiProperty({ type: 'string', required: true })
  password: string;
}

export class checkPasswordDto {
  @ApiProperty({ type: 'string', required: true })
  password: string;

  @ApiProperty({ type: 'string', required: true })
  oldPassword: string;
}
