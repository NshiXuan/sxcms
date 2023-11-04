import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './common/config.service';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  getHello(): any {
    console.log(
      "🚀 ~ file: app.controller.ts:11 ~ AppController ~ getHello ~ this.config.get('city'):"
    );
    return 'Hello';
  }
}
