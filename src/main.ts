import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Session, ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['ENCRYPT-KEY'],
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
    }),
  ); 

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
