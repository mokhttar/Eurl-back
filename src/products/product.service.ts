import { Injectable, NotFoundException } from '@nestjs/common';
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
  // images of  the product has been removed to theire own table in the data base
  addProduct(name: string, description: string, user: UsersEntity) {
    const product = this.productrepo.create({
      name: name,
      description: description,
      user,
    });
    return this.productrepo.save(product);
  }
  //find product by id
  async findById(id: number): Promise<ProductsEntity> {
    const product = await this.productrepo.findOneBy({ id });
    if (!product) {
      console.log(`product of id:${id}  not  found .`);
      throw new NotFoundException(`product of id:${id}  not  found .`);
    }
    return product;
  }
  //GET ALL Peoducts
  getAll() {
    return this.productrepo.find();
  }
  //Delete item by id
  async deleteProduct(id: number) {
    const product = await this.findById(id);
    return this.productrepo.delete(product);
  }
  //Edit Product
  async editProduct(
    id: number,
    name: string,
    description: string,
  ): Promise<ProductsEntity> {
    const product = await this.findById(id);
    product.name = name;
    product.description = description;
    await this.productrepo.save(product);
    return product;
  }
}
