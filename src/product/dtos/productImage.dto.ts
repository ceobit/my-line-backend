import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'URL of the image' })
  url: string;

  @IsString()
  @ApiProperty({
    description: 'Alt text for the image',
    required: false,
  })
  alt: string;

  @IsOptional()
  @ApiProperty({
    description: 'Indicates if this is the primary image',
    required: false,
    default: false,
  })
  isPrimary?: boolean;
}