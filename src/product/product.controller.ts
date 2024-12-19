import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':productId')
  async findOne(@Param() productId: number) {
    return await this.productService.findOne(productId);
  }

  @Get('find-many')
  async findManyByIds(@Body() productIds: Array<number>) {
    return await this.productService.findManyByIds(productIds);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Patch(':productId')
  async update(
    @Param('productId') productId: number,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return await this.productService.update(productId, updateProductDto);
  }

  @Delete()
  async remove(@Param('productId') productId: number) {
    return await this.productService.remove(productId);
  }
}
