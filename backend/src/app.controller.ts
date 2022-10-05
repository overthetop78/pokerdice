import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { checkPasswordDto, LoginDto } from './auth/dto/login.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
@ApiTags('Auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) { }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    const result = this.authService.login(loginDto);
    console.log(result);

    return result;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('auth/checkPassword/')
  @ApiBody({ type: checkPasswordDto })
  async checkPassword(
    @Body()
    { password, oldPassword }: { password: string; oldPassword: string },
  ) {
    return this.authService.checkPassword(password, oldPassword);
  }
}
