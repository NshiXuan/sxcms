import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export default async () => {
  for (let id = 0; id < 30; id++) {
    await prisma.user.create({
      data: {
        name: Random.cname(),
        password: Random.string(),
        nickname: Random.cname(),
      },
    });
  }

  // 把1号用户改为admin
  await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      name: 'admin',
      password: await hash('123123'),
    },
  });
};
