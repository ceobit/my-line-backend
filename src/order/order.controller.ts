import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create.order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dtos/update.order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description:
      'This endpoint creates a new order with order items, customer details, delivery info, and payment info.',
  })
  @ApiBody({
    type: CreateOrderDto,
    description: 'The data required to create a new order',
  })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description:
      'Validation error. Ensure all required fields are filled correctly.',
  })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all orders',
    description:
      'Fetch a list of all orders. Each order includes order items, customer details, delivery info, and payment info.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of orders.',
    type: [Order],
  })
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':internalId')
  @ApiOperation({
    summary: 'Retrieve a single order by ID',
    description:
      'Fetch the details of a single order by its unique identifier.',
  })
  @ApiParam({
    name: 'internalId',
    type: String,
    description: 'The unique internalId of the order to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the order.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found. Ensure the provided internalId is correct.',
  })
  getOrderByInternalId(@Param('internalId') internalId: string) {
    return this.orderService.getOrderByInternalId(internalId);
  }

  @Patch(':internalId')
  @ApiOperation({
    summary: 'Update an order by internal ID',
    description: 'Update the details of an order by its internal identifier.',
  })
  @ApiParam({
    name: 'internalId',
    type: String,
    description: 'The internal ID of the order to update',
  })
  @ApiBody({
    type: UpdateOrderDto,
    description: 'The data to update the order',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the order.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found. Ensure the provided internal ID is correct.',
  })
  updateOrderByInternalId(
    @Param('internalId') internalId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderByInternalId(
      internalId,
      updateOrderDto,
    );
  }
}
