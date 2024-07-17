import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { isEmail, IsEmail, MinLength, minLength } from 'class-validator';
import { MATCHES } from 'class-validator';
@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  firstName: string;
  @Column({ nullable: false })
  lastName: string;
  @Column({ nullable: true })
  phoneNumber: string; //tempo
  @Column({ nullable: false })
  wilaya: string;
  @Column({ nullable: false })
  @IsEmail({})
  email: string; //tempo
  @Column({ nullable: false, unique: true })
  @MinLength(6)
  password: string; //tempo
}
