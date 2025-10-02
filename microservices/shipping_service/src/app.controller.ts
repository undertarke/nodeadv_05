import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private prismaService: PrismaService,
    @Inject("NOTIFY_NAME") private notifyService: ClientProxy,
  ) { }

  @MessagePattern("luu_ship")
  async luuShip(@Payload() data) {

    let { email, first_name, last_name, phone, address, order_id } = data;
    let resShip = await this.prismaService.shipping.create({
      data: {
        email, first_name, last_name, phone, address, order_id
      }
    });

    this.notifyService.emit("dat_hang_thanh_cong", data);

    return resShip
  }

}
