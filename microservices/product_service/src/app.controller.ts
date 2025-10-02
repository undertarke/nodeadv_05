import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private prismaService: PrismaService,
    @Inject("SHIPPING_NAME") private shippingService: ClientProxy,
  ) { }


  @MessagePattern("dat_hang")
  async order(@Payload() data) {
    // console.log("goi tới product_serivce để đặt hàng", data);

    let { customer_id, product_id, quantity } = data

    let resOrder = await this.prismaService.orders.create({
      data: {
        customer_id,
        product_id,
        quantity,
        order_date: new Date()
      }
    })

    let dataShipping = { ...data, order_id: resOrder.order_id }

    let resShipping = await lastValueFrom(this.shippingService.send("luu_ship", dataShipping));

    return { resOrder, resShipping };
  }



  @MessagePattern("demo_key")
  getDemo(@Payload() data) {
    console.log(data)
    return `Get list products !!! => ${data}`;
  }


}
