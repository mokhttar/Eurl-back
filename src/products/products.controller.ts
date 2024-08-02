import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './ProductDto/create-product-dto';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
// THE IMAGES ARE MOVED TO THEIRE SEPERATED TABLE IN THE DATA BASE
@Controller('/products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly userService: UsersService,
  ) {}
  //get all product
  @Get('/getUsers')
  getUsers() {
    return this.productService.getAll();
  }
  //Create product
  @Post('/newProduct')
  @UseInterceptors(FileInterceptor('files'))
  async addProduct(@Body() product: CreateProductDto, @Request() req: any) {
    const userID: number = req?.session.userID;
    //TODO ccreate a guard to check if the user is loged in
    //search fo the  user entity
    const user = await this.userService.findbyId(userID);
    return this.productService.addProduct(
      product.name,
      product.description,
      user,
    );
  }
  @Post('/eidtProduct')
  editProduct() {
    
 


  }
}
