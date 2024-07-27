import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './product.entity';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productrepo: Repository<ProductsEntity>,
  ) {}

  //Create Product
  addProduct(
    name: string,
    description: string,
    // images: { name: string; image: string }[],
    user: UsersEntity,
  ) {
    const product = this.productrepo.create({
      name: name,
      description: description,
      //   image: images,
      user,
    });
    if (!product) {
      console.log('the product has not been created');
    } else {
      console.log('the product  has been created succesfuly');
      return this.productrepo.save(product);
    }
  }
  //GET ALL Peoducts
  getAll() {
    return this.productrepo.find();
  }
}
