import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      secretOrPrivateKey: `${jwtConstants.secretOrPrivateKey}`,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
