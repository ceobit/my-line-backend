import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(productId: number) {
    const product = await this.productRepository.findOneBy({ productId });

    if (!product) {
      throw new NotFoundException(`There is no product under id ${productId}`);
    }
    return product;
  }

  async findByName(name: string) {
    const product = await this.productRepository.findOneBy({ name });

    if (!product) {
      throw new NotFoundException(`There is no product under name ${name}`);
    }
    return product;
  }

  async findManyByIds(arrayOfIds: Array<number>): Promise<Product[]> {
    return this.productRepository.findBy({ productId: In(arrayOfIds) });
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(productId: number, updateProductDto: CreateProductDto) {
    const product = await this.productRepository.preload({
      productId,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`There is no product under id ${productId}`);
    }
    return this.productRepository.save(product);
  }

  async remove(productId: number) {
    const product = await this.findOne(productId);
    return this.productRepository.remove(product);
  }
}
