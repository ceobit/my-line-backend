import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create.order.dto';
import { UpdateOrderDto } from './dtos/update.order.dto';

interface PostgresError extends Error {
  code: string;
  detail?: string;
  constraint?: string;
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.orderRepository.create({
        ...createOrderDto,
        consentDate: createOrderDto.consentGiven ? new Date() : null,
      });
      const savedOrder = await this.orderRepository.save(order);
      this.logger.log(`Order created: ${savedOrder.internalId}`);
      return savedOrder;
    } catch (error) {
      this.logger.error(
        `Failed to create order: ${error.message}`,
        error.stack,
      );

      if (error instanceof QueryFailedError) {
        this.handleDatabaseError(error, createOrderDto.internalId);
      }

      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['items', 'deliveryInfo', 'paymentInfo'],
      });

      if (orders.length === 0) {
        this.logger.warn('No orders found in database');
      }

      return orders;
    } catch (error) {
      this.logger.error('Failed to retrieve orders', error.stack);
      throw new InternalServerErrorException('Failed to retrieve orders');
    }
  }

  async getOrderByInternalId(internalId: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { internalId },
        relations: ['items', 'deliveryInfo', 'paymentInfo'],
      });

      if (!order) {
        this.logger.warn(`Order not found: ${internalId}`);
        throw new NotFoundException(`Order ${internalId} not found`);
      }

      return order;
    } catch (error) {
      this.logger.error(`Failed to retrieve order ${internalId}`, error.stack);

      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve order');
    }
  }

  async updateOrderByInternalId(
    internalId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      const existingOrder = await this.getOrderByInternalId(internalId);
      const mergedOrder = this.orderRepository.merge(
        existingOrder,
        updateOrderDto,
      );
      const updatedOrder = await this.orderRepository.save(mergedOrder);

      this.logger.log(`Order updated: ${internalId}`);
      return updatedOrder;
    } catch (error) {
      this.logger.error(`Failed to update order ${internalId}`, error.stack);

      if (error instanceof NotFoundException) throw error;
      if (error instanceof QueryFailedError) {
        this.handleDatabaseError(error, internalId);
      }

      throw new InternalServerErrorException('Failed to update order');
    }
  }

  private handleDatabaseError(
    error: QueryFailedError,
    internalId: string,
  ): void {
    const driverError = error.driverError as PostgresError;

    // Handle common PostgreSQL error codes
    if (driverError.code) {
      switch (driverError.code) {
        case '23505': // Unique violation
          throw new ConflictException(`Order ${internalId} already exists`);
        case '23503': // Foreign key violation
          throw new ConflictException('Invalid reference in order data');
        case '22P02': // Invalid data type
          throw new ConflictException('Invalid data format in request');
        default:
          this.logger.error(
            `Unhandled database error code: ${driverError.code}`,
          );
      }
    } else {
      this.logger.error('Non-PostgreSQL database error', driverError);
      throw new InternalServerErrorException('Database operation failed');
    }
  }
}
