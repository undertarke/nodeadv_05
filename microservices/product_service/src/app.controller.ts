import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern("demo_key")
  getDemo(@Payload() data) {
    console.log(data)
    return `Get list products !!! => ${data}`;
  }


}
