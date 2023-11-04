import { Allow, IsNotEmpty, Length } from 'class-validator';
import { IsConfirmed } from 'src/validate/is-confirmed/is-confirmed';
import { IsNotExists } from 'src/validate/is-not-exists/is-not-exists';

// 为什么不使用邮箱、短信注册？防止批量注册、短信轰炸
export class RegisterDto {
  @IsNotEmpty({ message: '用户名不为空' })
  @Length(2, 20, { message: '用户名长度为2~20个字符' })
  @IsNotExists('user', ['name', 'email', 'mobile'], { message: '账号已存在' })
  name: string;

  @IsNotEmpty({ message: '密码不为空' })
  @Length(5, 20, { message: '密码不能小于5个字符' })
  @IsConfirmed({ message: '两次密码不一致' })
  password: string;

  // 不需要验证 只为了类型识别
  @Allow()
  captcha: object;
}
