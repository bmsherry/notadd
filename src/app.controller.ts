import { Controller, Get, Inject, Render } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  @Get()
  @Render("index.hbs")
  async root(): Promise<any> {
    return await this.appService.root();
  }
}
