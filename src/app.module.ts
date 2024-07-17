import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'Eurl-Hatta',
      username: 'postgres',
      password: '2130047503',
      host: 'localhost',
      port: 5432,
      synchronize: true, //TODO  make it true only in the devolepment phase .
      entities: [UsersEntity],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
