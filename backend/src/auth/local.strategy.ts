import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        },
            async (email: string, password: string, done: (arg0: UnauthorizedException, arg1: boolean) => any) => {
                try {
                    const user = await this.authService.validateUser(email, password);
                    if (!user) {
                        return done(new UnauthorizedException(), false);
                    }
                    return done(null, user);
                }
                catch (err) {
                    return done(err, false);
                }
            });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}