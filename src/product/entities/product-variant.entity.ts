import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @OneToMany(() => ProductImage, (image) => image.variant, {
    cascade: true,
  })
  images: ProductImage[];
}
