import { IsNotEmpty } from 'class-validator';

export class CreateSoftDto {
  @IsNotEmpty({ message: '软件名称不能为空' })
  title: string;

  @IsNotEmpty({ message: '软件内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '软件预览图片不为空' })
  preview: string;

  @IsNotEmpty({ message: '软件简介不为空' })
  description: string;
}
