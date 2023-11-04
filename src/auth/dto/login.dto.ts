import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { Allow, IsNotEmpty, Length } from 'class-validator';
import { IsExists } from 'src/validate/is-exists/is-exists';

export class LoginDto extends PartialType(RegisterDto) {
  // 重写name的校验 不如会继承RegisterDto的校验
  @IsNotEmpty({ message: '用户名不为空' })
  @Length(2, 20, { message: '用户名长度为2~20个字符' })
  @IsExists('user', ['name', 'email', 'mobile'], { message: '用户不存在' })
  name: string;

  @IsNotEmpty({ message: '密码不为空' })
  @Length(5, 20, { message: '密码不能小于5个字符' })
  password: string;

  // 不需要验证 只为了类型识别
  @Allow()
  captcha: object;
}
