import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// table为装饰器的第一个参数 表的名称
export function IsNotExists(
  table: string,
  fields: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    // 注册装饰器
    registerDecorator({
      name: 'IsNotExists', // 装饰器名称
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table], // 表名称
      options: validationOptions,
      validator: {
        // value为dto配置了装饰器的字段的值 如下的name
        async validate(value: string, args: ValidationArguments) {
          // 通过prisma查看是否存在 比如用户
          // console.log(propertyName, args)
          // 打印查询语句
          const prisma = new PrismaClient({ log: ['query'] });
          const res = await prisma[table].findFirst({
            where: {
              OR: fields.map((field) => ({ [field]: value })),
            },
          });

          // 如果为真 存在 不通过
          return !Boolean(res);
        },
      },
    });
  };
}
