import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
@ApiTags('Auth')
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @ApiBody({ type: LoginDto })
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('auth/checkPassword/')
  async checkPassword(@Body() { password, oldPassword }: { password: string, oldPassword: string }) {
    return this.authService.checkPassword(password, oldPassword);
  }
}
