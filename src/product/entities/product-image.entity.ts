import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  url: string;

  @Column()
  alt: string;

  @Column({ default: false })
  isPrimary: boolean;

  @ManyToOne(() => ProductVariant, (variant) => variant.images, {
    onDelete: 'CASCADE',
  })
  variant: ProductVariant;
}
