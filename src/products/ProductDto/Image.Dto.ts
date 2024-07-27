import { IsJSON } from 'class-validator';
//the images are json on base 64
export class ImageDto {
  @IsJSON()
  images: { name: string; image: string }[];
}
