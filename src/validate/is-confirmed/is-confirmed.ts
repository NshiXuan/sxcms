import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// table为装饰器的第一个参数 表的名称
export function IsConfirmed(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    // 注册装饰器
    registerDecorator({
      name: 'IsConfirmed', // 装饰器名称
      target: object.constructor,
      propertyName: propertyName,
      constraints: [], // 表名称
      options: validationOptions,
      validator: {
        // value为使用该装饰器字段的值 args为dto的值
        async validate(value: string, args: ValidationArguments) {
          // propertyName为当前字段的名称
          return value == args.object[`${propertyName}_confirmation`];
        },
      },
    });
  };
}
