import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesEntity } from './images.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity])],
})
export class ImagesModule {}
