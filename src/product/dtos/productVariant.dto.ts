import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductImageDto } from './productImage.dto';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  @ApiProperty({
    type: [ProductImageDto],
    description: 'Images associated with the product',
    required: false,
  })
  images?: ProductImageDto[];
}
