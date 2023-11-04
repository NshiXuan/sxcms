import { Controller, Get, Inject, Ip, Query } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('captcha')
export class CaptchaController {
  constructor(
    private readonly captchaService: CaptchaService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  @Get()
  // ip装饰器 获取ip地址
  async create(@Ip() ip: any) {
    return this.captchaService.create(ip);
  }

  @Get('get')
  async get(@Query('key') key: string) {
    const value = await this.cache.get(key);
    return value;
  }
}
