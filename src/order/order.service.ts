import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create.order.dto';
import { UpdateOrderDto } from './dtos/update.order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, deliveryInfo, paymentInfo, ...orderData } = createOrderDto;

    const order = this.orderRepository.create({
      ...orderData,
      items,
      deliveryInfo,
      paymentInfo,
    });

    return this.orderRepository.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    const order = this.orderRepository.find({
      relations: ['items', 'deliveryInfo', 'paymentInfo'],
    });

    if (!order) {
      throw new NotFoundException(`Orders are not found.`);
    }

    return order;
  }

  async getOrderByInternalId(internalId: string): Promise<Order> {
    const order = this.orderRepository.findOne({
      where: { internalId },
      relations: ['items', 'deliveryInfo', 'paymentInfo'],
    });

    if (!order) {
      throw new NotFoundException(
        `Order with internalId ${internalId} not found.`,
      );
    }

    return order;
  }

  async updateOrderByInternalId(
    internalId: string,
    updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.orderRepository.preload({
      internalId,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(
        `Order with internal id ${internalId} not found.`,
      );
    }
    return this.orderRepository.save(order);
  }
}
