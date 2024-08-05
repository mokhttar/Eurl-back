import { Controller, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/findOrder/:id')
  async findOrderById(@Param('id') id: number) {
    //TODO check if the user loged in and he is an admin  implements a guard auth
    return await this.findOrderById(id);
  }



  
}
