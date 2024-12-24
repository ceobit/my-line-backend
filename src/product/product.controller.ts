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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'productId', type: String })
  async findOne(@Param('productId') productId: string) {
    return await this.productService.findOne(productId);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a product by name' })
  @ApiParam({ name: 'name', type: String })
  async findByName(@Param('name') name: string) {
    return await this.productService.findByName(name);
  }

  @Post('find-many')
  @ApiOperation({ summary: 'Get multiple products by IDs' })
  @ApiBody({ type: [String] })
  async findManyByIds(@Body() productIds: Array<string>) {
    return await this.productService.findManyByIds(productIds);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Patch(':productId')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'productId', type: String })
  async update(
    @Param('productId') productId: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return await this.productService.update(productId, updateProductDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'productId', type: String })
  async remove(@Param('productId') productId: string) {
    return await this.productService.remove(productId);
  }
}
