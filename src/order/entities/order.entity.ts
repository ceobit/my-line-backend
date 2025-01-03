import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { DeliveryInfo } from './delivery-info.entity';
import { PaymentInfo } from './payment-info.entity';
import { OrderStatus } from '../../enums';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
  })
  status: OrderStatus;

  @Column({ unique: true })
  internalId: string;

  @Column()
  customerName: string;

  @Column()
  customerSurname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @ManyToOne(() => DeliveryInfo, { cascade: true })
  @JoinColumn()
  deliveryInfo: DeliveryInfo;

  @ManyToOne(() => PaymentInfo, { cascade: true })
  @JoinColumn()
  paymentInfo: PaymentInfo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
