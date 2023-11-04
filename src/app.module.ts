import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { SoftModule } from './soft/soft.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { CaptchaModule } from './captcha/captcha.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentModule } from './comment/comment.module';
import { PolicyModule } from './policy/policy.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    SoftModule,
    UploadModule,
    UserModule,
    CaptchaModule,
    CacheModule.register({
      ttl: 0, // 单位ms
      isGlobal: true, // 全局使用
    }),
    CommentModule,
    PolicyModule,
    ThrottlerModule.forRoot({
      ttl: 60, // 60s
      limit: 10, // 全局限制
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
