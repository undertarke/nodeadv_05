import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
  ) { }

  // @: decorator
  @Get("/demo")
  getHello(): string {
    return this.appService.getHello();
  }


  @Post("token")
  createToken() {

    return this.jwtService.sign({ id: 1, userName: "demo" }, { expiresIn: "5m", secret: "KHOA_BI_MAT" });
  }

}
