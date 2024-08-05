import { IsString, IsJSON, IsNumber } from 'class-validator';
import { IsDate } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  InStock: number;
  @IsNumber()
  price: number;
  @IsDate()
  date: Date;
  @IsNumber()
  userID: number;
}
