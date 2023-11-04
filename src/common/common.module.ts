import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as BaseModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import config from '../config';

// 全局
@Global()
@Module({
  imports: [
    BaseModule.forRoot({
      load: [config],
    }),
  ],
  providers: [ConfigService, PrismaService],
  exports: [ConfigService, PrismaService], // 把服务暴露出去 让别的模块也可以使用
})
export class CommonModule {}
