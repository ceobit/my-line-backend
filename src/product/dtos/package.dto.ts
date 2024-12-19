import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PackageDto {
  @IsNumber()
  @ApiProperty({ description: 'Height of the package', required: false })
  height: number;

  @IsNumber()
  @ApiProperty({ description: 'Length of the package', required: false })
  length: number;

  @IsNumber()
  @ApiProperty({ description: 'Width of the package', required: false })
  width: number;

  @IsNumber()
  @ApiProperty({ description: 'Weight of the package', required: false })
  weight: number;
}