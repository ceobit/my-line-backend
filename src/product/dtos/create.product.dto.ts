import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductVariantDto } from './productVariant.dto';
import { PackageDto } from './package.dto';
import { ProductImageDto } from './productImage.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the product' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The price of the product' })
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  @IsNotEmpty()
  @ApiProperty({
    type: [ProductVariantDto],
    description: 'The variants (size, color) of the product',
  })
  variants: ProductVariantDto[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The vendor code of the product',
    required: false,
  })
  vendorCode?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The composition of the product',
    required: false,
  })
  composition?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The care instructions for the product',
    required: false,
  })
  careInstructions?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Measurements of the product', required: false })
  measurements?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Model parameters for the product',
    required: false,
  })
  modelParams?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => PackageDto)
  @ApiProperty({
    description: 'The delivery package dimensions and weight',
    required: false,
    type: PackageDto,
  })
  package?: PackageDto;

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
