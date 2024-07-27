import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, MinLength, minLength } from 'class-validator';
import { MATCHES } from 'class-validator';
import { OneToMany } from 'typeorm';
import { ProductsEntity } from 'src/products/product.entity';
@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  firstName: string;
  @Column({ nullable: false })
  lastName: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: false })
  wilaya: string;
  @Column({ nullable: false })
  @IsEmail({})
  email: string;
  @Column({ nullable: false, unique: true })
  @MinLength(6)
  password: string;
  @Column({ default: false }) //TODO
  isAdmin: boolean;
  @OneToMany(() => ProductsEntity, (product) => product.user)
  product: ProductsEntity[];
}
