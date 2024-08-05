import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersEntity } from './orders.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepo: Repository<OrdersEntity>,
  ) {}
  async findOrderByID(id: number): Promise<OrdersEntity> {
    try {
      const foundOrder = await this.ordersRepo.findOne({ where: { id } });
      if (!foundOrder) {
        console.log('order not found');
        throw new NotFoundException(`No order with this id: ${id}`);
      }
      return foundOrder;
    } catch (error: any) {
      console.error(error);
      throw new InternalServerErrorException('Order not found');
    }
  }
  //TODO implement a guard auth in the controller to check if the user is loged in and he is an admin to proceed tthis method
  async ConfirmOrder(id_Order: number): Promise<OrdersEntity> {
    const order = await this.findOrderByID(id_Order);
    if (!order) {
      throw new InternalServerErrorException('Problem finding the order');
    } else {
      order.isConfirmed = true;
      return order;
    }
  }
}
