import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// 使用函数中间件 不用类中间件
export const SiteMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  // 非以/api开头的接口才渲染
  if (!req.path.startsWith('/api')) {
    // content为buffer
    const content = readFileSync(
      resolve(__dirname, '../../../vue_dist/index.html')
    );
    res.send(content.toString());
  }
  next();
};
