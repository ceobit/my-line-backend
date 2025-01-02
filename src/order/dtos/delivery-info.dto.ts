import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum DeliveryType {
  CDEK_PVZ = 'CDEK_PVZ',
  TO_DOOR = 'TO_DOOR',
}

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
  @ValidateNested()
  @Type(() => CDEKAddressDto)
  @ApiProperty({
    type: CDEKAddressDto,
    description: 'CDEK delivery address details',
  })
  address: CDEKAddressDto;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'CDEK pickup point ID (PVZ)' })
  pvzId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Optional comment for CDEK delivery' })
  comment?: string;
}

class DoorDeliveryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Full address for door delivery' })
  address: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Optional comment for door delivery' })
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

  @ValidateIf((o) => o.type === DeliveryType.CDEK_PVZ)
  @ValidateNested()
  @Type(() => CDEKDetailsDto)
  @ApiPropertyOptional({
    type: CDEKDetailsDto,
    description: 'Details for CDEK delivery (if applicable)',
  })
  cdekDetails?: CDEKDetailsDto;

  @ValidateIf((o) => o.type === DeliveryType.TO_DOOR)
  @ValidateNested()
  @Type(() => DoorDeliveryDto)
  @ApiPropertyOptional({
    type: DoorDeliveryDto,
    description: 'Details for door delivery (if applicable)',
  })
  doorDelivery?: DoorDeliveryDto;
}
