import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';
@Module({ imports: [TypeOrmModule.forFeature([OrdersEntity])] })
export class OrdersModule {}
