import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { ImagesEntity } from 'src/images/images.entity';
@Entity()
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  //jsonb (text in base64)
  //CRETE A TABLE FOR ONLY STORYIN IMAGES
  // @Column('jsonb')
  // image: { name: string; image: string }[];
  //TODO ID OF THE ADMIN WHO DID ADD THE IMAGE OF THE PRODUCT (for.. key)
  //DONE
  @ManyToOne(() => UsersEntity, (user) => user.product)
  user: UsersEntity;
  @OneToMany(() => ImagesEntity, (image) => image.product)
  image: ImagesEntity[];
}
