import {
  applyDecorators,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// 复用装饰器
// 第一个参数是文件类型 第二个参数是需要前端传递的参数名称
export function Uploader(mime: string, field = 'file') {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(field, {
        // 限制大小2M 单位为字节
        limits: { fileSize: Math.pow(1024, 2) * 2 },
        // 控制文件类型
        // callback的参数代表有错就抛出Error 如果没错eroor为空且后面的参数acceptFile调用布尔值
        fileFilter(
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, acceptFile: boolean) => void
        ) {
          console.log(
            '🚀 ~ file: upload.decorator.ts:24 ~ Uploader ~ file.mimetype:',
            file.mimetype
          );
          if (!file.mimetype.includes(mime)) {
            callback(new UnsupportedMediaTypeException('文件类型错误'), false);
          } else {
            callback(null, true);
          }
        },
      })
    )
  );
}
