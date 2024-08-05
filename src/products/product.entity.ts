import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { ImagesEntity } from 'src/images/images.entity';
@Entity()
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  InStock: number;
  @Column({ nullable: false })
  price: number;
  @Column()
  date: Date;
  //TODO add date ,Qte_availabel,price
  @ManyToOne(() => UsersEntity, (user) => user.product)
  user: UsersEntity;
  @OneToMany(() => ImagesEntity, (image) => image.product)
  image: ImagesEntity[];
}
