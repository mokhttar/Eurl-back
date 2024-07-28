import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ProductsEntity } from './products/product.entity';
import { ImagesModule } from './images/images.module';
import { ImagesEntity } from './images/images.entity';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: 5432,
      synchronize: true, //TODO  make it true only in the devolepment phase .
      entities: [UsersEntity, ProductsEntity, ImagesEntity],
    }),
    ProductsModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
