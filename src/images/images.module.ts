import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesEntity } from './images.entity';
import { ImagesController } from './images.contreoller';
@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity])],
})
export class ImagesModule {}
