import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ length: 50 })
  vendorCode: string;

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  composition: string;

  @Column()
  careInstructions: string;

  @Column()
  measurements: string;

  @Column()
  modelParams: string;

  @Column('jsonb')
  package: {
    height: number;
    length: number;
    width: number;
    weight: number;
  };

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: ProductImage[];

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants: ProductVariant[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
