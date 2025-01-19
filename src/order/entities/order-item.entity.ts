import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Column()
  variantId: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 8, scale: 2 })
  price: number;
}
