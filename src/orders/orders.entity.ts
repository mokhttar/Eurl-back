import { UsersEntity } from 'src/users/users.entity';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ManyToOne } from 'typeorm';
@Entity()
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: false })
  isConfirmed: boolean;
  @ManyToOne(() => UsersEntity, (user) => user.order)
  user: UsersEntity;
}
