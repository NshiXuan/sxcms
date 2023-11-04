import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatePipeCustom } from './pipe/validate-pipe-custom';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpStatus } from '@nestjs/common';
import { SiteMiddleware } from './site/site.middleware';

async function bootstrap() {
  // 加上NestExpressApplication是为了app有类型提示
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 参数验证管道
  app.useGlobalPipes(
    new ValidatePipeCustom({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    })
  );

  // 路径前缀
  app.setGlobalPrefix('api');

  // 上传文件的静态资源部署 当访问到/uploads路径时访问uploads目录
  app.useStaticAssets('public', { prefix: '/public' });
  app.useStaticAssets('vue_dist', { prefix: '/vue_dist' });

  // 中间件 放在静态资源部署的下面
  app.use(SiteMiddleware);

  await app.listen(3000);
}
bootstrap();
