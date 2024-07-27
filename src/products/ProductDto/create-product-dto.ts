
import { IsString, IsJSON, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  // The image is an array of objects in base64
//   @IsJSON()
//   image: { name: string; image: string }[];
  @IsNumber()
  userID :number
}
