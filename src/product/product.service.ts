import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create.product.dto';
import { UpdateProductDto } from './dtos/update.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAllProducts() {
    return this.productRepository.find();
  }

  async getProductById(productId: string) {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['variants', 'variants.images'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found.`);
    }
    return product;
  }

  async getProductByName(name: string) {
    const product = await this.productRepository.findOne({
      where: { name },
      relations: ['variants', 'variants.images'],
    });

    if (!product) {
      throw new NotFoundException(`Product with name ${name} not found.`);
    }
    return product;
  }

  async getProductBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['variants', 'variants.images'],
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found.`);
    }
    return product;
  }

  async getProductsByIds(productIds: string[]): Promise<Product[]> {
    return this.productRepository.findBy({ productId: In(productIds) });
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      productId,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found.`);
    }
    return this.productRepository.save(product);
  }

  async deleteProduct(productId: string) {
    const product = await this.getProductById(productId);
    return this.productRepository.remove(product);
  }
}
