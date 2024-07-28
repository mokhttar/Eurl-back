import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('/images')
export class ImagesController {
  @Post('/new')
  @UseInterceptors(FileInterceptor('file'))
  addImage(@UploadedFile() file: Express.Multer.File, id_product?: number) {







    
  }
}
