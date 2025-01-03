import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DeliveryInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['CDEK_PVZ', 'TO_DOOR'],
  })
  type: 'CDEK_PVZ' | 'TO_DOOR';

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  deliveryPrice: number;

  @Column({ nullable: true })
  pvzId?: string;

  @Column('jsonb', { nullable: true })
  cdekAddress?: {
    postcode: string;
    city: string;
    street: string;
    house: string;
    apartment?: string;
    locality: {
      name: string;
      type: string;
      country: string;
    };
  };

  @Column({ nullable: true })
  comment?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
