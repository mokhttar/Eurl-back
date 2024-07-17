// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Ensure UsersController is imported

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController], // Make sure UsersController is included here
})
export class UsersModule {}
