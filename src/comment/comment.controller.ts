import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/common/prisma.service';
import { Policy } from 'src/policy/policy.decorator';
import { CommentPolicy } from './common.policy';
import { PolicyGuard } from 'src/policy/policy.guard';
import { CommentResponse } from './comment.response';
import { Throttle } from '@nestjs/throttler';

@Controller('comment/:sid')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private prisma: PrismaService
  ) {}

  @Post()
  @Auth()
  @Throttle(1, 5) // 5s只能请求一次
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: User,
    @Param('sid') sid: number
  ) {
    const comment = await this.commentService.create(
      createCommentDto,
      user,
      sid
    );
    return new CommentResponse(comment).make();
  }

  @Get()
  async findAll(@Param('sid') sid: number) {
    const commentList = await this.commentService.findAll(+sid);
    return commentList.map((comment) => new CommentResponse(comment).make());
  }

  @Delete(':id')
  // 守卫执行验证
  @UseGuards(PolicyGuard)
  // 设置元数据，提高给守卫
  // 第二个参数为守卫执行的方法名称（默认与调用Poclicy装饰器的方法名称一致）
  @Policy(CommentPolicy, 'test')
  // 获取身份 依次往上执行
  @Auth()
  async remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
