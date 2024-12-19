import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductVariantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'size of the variant' })
  size: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'color of the variant' })
  color: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'quantity of the variant' })
  quantity: number;
}