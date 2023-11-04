import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CaptchaService } from 'src/captcha/captcha.service';
import { AuthService } from './auth.service';
import { Admin } from './decorators/admin/admin.decorator';
import { CurrentUser } from './decorators/current-user/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly captchaService: CaptchaService
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    await this.captchaService.verify(dto.captcha as any);
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    await this.captchaService.verify(dto.captcha as any);
    return this.authService.login(dto);
  }

  @Get('test')
  @Admin()
  test(@CurrentUser() user: User) {
    return user;
  }
}
