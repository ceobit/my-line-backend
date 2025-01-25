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
import { UpdateProductDto } from './dtos/update.product.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'productId', type: String })
  async getProductById(@Param('productId') productId: string) {
    return this.productService.getProductById(productId);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a product by name' })
  @ApiParam({ name: 'name', type: String })
  async getProductByName(@Param('name') name: string) {
    return this.productService.getProductByName(name);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a product by slug' })
  @ApiParam({ name: 'slug', type: String })
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getProductBySlug(slug);
  }

  @Get('variant/:variantId')
  @ApiOperation({ summary: 'Get a product by variant ID' })
  @ApiParam({ name: 'variantId', type: String })
  async getProductByVariantId(@Param('variantId') variantId: string) {
    return this.productService.getProductByVariantId(variantId);
  }

  @Post('find-many')
  @ApiOperation({ summary: 'Get multiple products by IDs' })
  @ApiBody({ schema: { type: 'array', items: { type: 'string' } } })
  async getProductsByIds(@Body() productIds: string[]) {
    return this.productService.getProductsByIds(productIds);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':productId')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'productId', type: String })
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'productId', type: String })
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
