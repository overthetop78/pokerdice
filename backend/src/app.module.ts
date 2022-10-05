import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LobbyModule } from './lobby/lobby.module';
import { LobbyUserModule } from './lobby-user/lobby-user.module';
import { CoreModule } from './core/core.module';
import { DicesModule } from './dices/dices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'locahost',
      port: parseInt(process.env.MYSQL_PORT_IN) || 3306,
      username: process.env.MYSQL_USER || 'pokerdice',
      password: process.env.MYSQL_PASSWORD || 'pokerdice',
      database: process.env.MYSQL_DATABASE || 'pokerdice',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    LobbyModule,
    LobbyUserModule,
    CoreModule,
    DicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
