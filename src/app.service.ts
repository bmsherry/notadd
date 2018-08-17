import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async root(): Promise<any> {
    return {
      message: "这是一个node微服务框架，使用typescript.",
      title: "node微服务架构"
    };
  }
}
