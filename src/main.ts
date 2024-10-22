import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Session, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    cookieSession({
      keys: ['ENCRYPT-KEY'],
      maxAge: 1000 * 60 * 10, // 10 minutes
    }),
  );
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
