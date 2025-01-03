import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DeliveryType } from 'src/enums';

class LocalityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the locality (e.g., city or town)' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Type of locality (e.g., urban, rural)' })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Country of the locality' })
  country: string;
}

class CDEKAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Postal code of the address' })
  postcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'City name of the address' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Street name of the address' })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'House number of the address' })
  house: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Apartment or flat number (optional)' })
  apartment?: string;

  @ValidateNested()
  @Type(() => LocalityDto)
  @ApiProperty({ type: LocalityDto, description: 'Details about the locality' })
  locality: LocalityDto;
}

class CDEKDetailsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CDEKAddressDto)
  @ApiPropertyOptional({
    type: CDEKAddressDto,
    description: 'Delivery address details',
  })
  address?: CDEKAddressDto;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'CDEK pickup point ID (PVZ)' })
  pvzId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Optional comment for CDEK delivery' })
  comment?: string;
}

export class DeliveryInfoDto {
  @IsEnum(DeliveryType)
  @ApiProperty({
    enum: DeliveryType,
    description: 'Type of delivery: CDEK_PVZ or TO_DOOR',
  })
  type: DeliveryType;

  @IsNumber()
  @ApiProperty({ description: 'Price of the delivery' })
  deliveryPrice: number;

  @ValidateNested()
  @Type(() => CDEKDetailsDto)
  @ApiPropertyOptional({
    type: CDEKDetailsDto,
    description: 'Details for CDEK delivery',
  })
  cdekDetails?: CDEKDetailsDto;
}
