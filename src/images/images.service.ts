import { Injectable } from '@nestjs/common';
import { ImagesEntity } from './images.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/product.entity';

//Create image for products
@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesEntity)
    private readonly imagesRepo: Repository<ImagesEntity>,
  ) {}
  addImage(
    image: Express.Multer.File,
    id_product: number,
    product: ProductsEntity,
  ) {
    const newImage = this.imagesRepo.create({
      fieldname: image.fieldname,
      originalname: image.originalname,
      mimetype: image.mimetype,
      image: image.buffer,
      size: image.size,
      product,
    });
    return this.imagesRepo.save(newImage);
  }
}
