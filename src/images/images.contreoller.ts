import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
@Controller('/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/new')
  @UseInterceptors(FileInterceptor('file'))
  //idk about the id_product
  addImage(@UploadedFile() file: Express.Multer.File, id_product?: number) {
    return this.imagesService.addImage(file);
  }
}
