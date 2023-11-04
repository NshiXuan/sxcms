import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateSoftDto } from './dto/create-soft.dto';
import { UpdateSoftDto } from './dto/update-soft.dto';

@Injectable()
export class SoftService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSoftDto) {
    return this.prisma.soft.create({
      data: {
        ...dto,
      },
    });
  }

  async findAll(page: number, row = 10) {
    const data = await this.prisma.soft.findMany({
      skip: (page - 1) * row,
      take: row,
      orderBy: {
        id: 'desc',
      },
    });

    return {
      meta: { page, row, total: await this.prisma.soft.count() },
      data,
    };
  }

  findOne(id: number) {
    return this.prisma.soft.findFirst({ where: { id } });
  }

  update(id: number, dto: UpdateSoftDto) {
    return this.prisma.soft.update({ where: { id }, data: { ...dto } });
  }

  remove(id: number) {
    // delete不存在时会抛出异常 返回删除的对象
    // deleteMany不会抛出异常 返回count 不存在时返回count:0
    return this.prisma.soft.deleteMany({ where: { id } });
  }
}
