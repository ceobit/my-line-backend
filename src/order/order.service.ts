import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const { items, deliveryInfo, paymentInfo, ...orderData } = createOrderDto;

      const order = this.orderRepository.create({
        ...orderData,
        items,
        deliveryInfo,
        paymentInfo,
      });

      return await this.orderRepository.save(order);
    } catch (error) {
      console.error('Error creating order:', error.message, error.stack);
      throw new InternalServerErrorException('Failed to create order');
    }
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
  ): Promise<Order> {
    try {
      // Find the existing order by internalId
      const existingOrder = await this.orderRepository.findOne({
        where: { internalId },
      });

      if (!existingOrder) {
        throw new NotFoundException(
          `Order with internal ID ${internalId} not found.`,
        );
      }

      // Merge the existing order with the new data
      const updatedOrder = this.orderRepository.merge(
        existingOrder,
        updateOrderDto,
      );

      // Save the updated order to the database
      return await this.orderRepository.save(updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error.message, error.stack);
      throw new InternalServerErrorException('Failed to update order');
    }
  }
}
