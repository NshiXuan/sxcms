import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import svgCaptcha from 'svg-captcha';
import md5 from 'md5';
import { now } from 'lodash';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CaptchaService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async create(ip: string) {
    // 1.定义key ip是为了防止key重复
    const key = md5('captcha' + now() + ip);

    // 2.生成验证码
    // 2.1图像验证码
    // const captcha = svgCaptcha.create();

    // 2.2数学表达式
    // color为彩色
    const captcha = svgCaptcha.createMathExpr({
      mathMin: 0,
      mathMax: 10,
      color: true,
      height: 30,
      width: 120,
      noise: 3, // 干扰线
    });

    // 3.缓存验证码结果
    await this.cache.set(key, captcha.text);

    return {
      key,
      svg: captcha.data,
    };
  }

  // 校验验证码
  async verify({ key, value }) {
    const cache = await this.cache.get(key);
    if (cache != value) {
      throw new BadRequestException('验证码输入错误');
    }
  }
}
