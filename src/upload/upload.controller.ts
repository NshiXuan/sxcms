import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Uploader } from './decorators/upload/upload.decorator';
import { UploadService } from './upload.service';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  // 第一个参数是文件类型 第二个参数是需要前端传递的参数名称(默认为file)
  @Uploader('image')
  @Auth()
  image(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/` + file.path,
    };
  }
}
