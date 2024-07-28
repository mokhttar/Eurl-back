import { ProductsEntity } from 'src/products/product.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity()
export class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fieldname: string;
  @Column()
  originalname: string;
//   @Column()
//   encoding?: string;
  @Column()
  mimetype: string;
  //TODO add a default image for the product without images
  @Column({ type: 'bytea', nullable: true })
  image: Buffer;
  @Column()
  size: number;
  //add forgein keys of the product,marque
  @ManyToOne(() => ProductsEntity, (product) => product.image)
  product: ProductsEntity;
}
