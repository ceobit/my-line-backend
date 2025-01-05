import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DeliveryInfoDto } from './delivery-info.dto';
import { OrderStatus } from 'src/enums';

class OrderItemDto {
  @IsString()
  @ApiProperty({ description: 'The ID of the product being ordered' })
  productId: string;

  @IsNumber()
  @ApiProperty({ description: 'The quantity of the product in the order' })
  quantity: number;

  @IsNumber()
  @ApiProperty({ description: 'The price of a single product unit' })
  price: number;
}

class PaymentInfoDto {
  @IsString()
  @ApiProperty({ description: 'The payment method, e.g., "credit_card"' })
  method: string;

  @IsNumber()
  @ApiProperty({ description: 'The total amount paid for the order' })
  amount: number;
}

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ApiProperty({
    type: [OrderItemDto],
    description: 'List of items in the order',
  })
  items: OrderItemDto[];

  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({
    description: 'The status of the order',
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
  })
  status?: OrderStatus;

  @IsString()
  @ApiProperty({
    description: 'The internal ID of the order',
  })
  internalId: string;

  @IsString()
  @ApiProperty({
    description: 'The first name of the customer placing the order',
  })
  customerName: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of the customer placing the order',
  })
  customerSurname: string;

  @IsString()
  @ApiProperty({ description: 'The phone number of the customer' })
  phone: string;

  @IsEmail()
  @ApiProperty({ description: 'The email address of the customer' })
  email: string;

  @ValidateNested()
  @Type(() => DeliveryInfoDto)
  @ApiProperty({
    description: 'Details of the delivery method and address',
    type: DeliveryInfoDto,
  })
  deliveryInfo: DeliveryInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentInfoDto)
  @ApiPropertyOptional({
    description: 'Payment information for the order',
    type: PaymentInfoDto,
  })
  paymentInfo?: PaymentInfoDto;
}
