import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle('Poker Dice')
    .setDescription('The Poker Dice API description')
    .setVersion('1.0')
    .addTag('poker-dice')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
        description: 'JWT Authorization header using the Bearer scheme.',
      },
      'access-token',
    )
    .addServer('http://localhost:3000')
    .addServer('http://192.168.0.3:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
